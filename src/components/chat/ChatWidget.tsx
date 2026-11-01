'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, MessageSquare, Loader2, Mic, MicOff, PhoneOff } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import {
  Room,
  RoomEvent,
  ConnectionState,
  LocalParticipant,
  Track,
  type RemoteTrackPublication,
  type RemoteParticipant,
  type RemoteTrack,
} from 'livekit-client'

interface Message {
  role: 'user' | 'assistant'
  text: string
}

const GREETING: Message = {
  role: 'assistant',
  text: "Hi — I'm the Quantum Atlas assistant. I can answer questions about our AI services and how we've deployed systems in production. What are you working on?",
}

type ChatMode = 'text' | 'voice'
type VoiceStatus = 'idle' | 'connecting' | 'connected' | 'error'

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<ChatMode>('text')
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>('idle')
  const [agentSpeaking, setAgentSpeaking] = useState(false)
  const [micMuted, setMicMuted] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const roomRef = useRef<Room | null>(null)

  // Hero "Talk to our voice agent" button dispatches this event
  useEffect(() => {
    function handleOpenVoice() { setOpen(true) }
    window.addEventListener('qa:open-voice', handleOpenVoice)
    return () => window.removeEventListener('qa:open-voice', handleOpenVoice)
  }, [])

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  useEffect(() => {
    if (open && mode === 'text') setTimeout(() => inputRef.current?.focus(), 300)
  }, [open, mode])

  // Cleanup voice room on unmount
  useEffect(() => {
    return () => { roomRef.current?.disconnect() }
  }, [])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const nextMessages: Message[] = [...messages, { role: 'user', text }]
    setMessages(nextMessages)
    setLoading(true)
    try {
      // Build history from all messages before the one we just added (last 6)
      const history = nextMessages
        .slice(0, -1)
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .slice(-6)
        .map((m) => ({ role: m.role, text: m.text }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text:
              data.error ||
              'Something went wrong. Please try again or email contact@quantumatlas.dev.',
          },
        ])
        return
      }
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: data.reply ?? 'Sorry, something went wrong. Please try again.',
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Connection error. Please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const connectVoice = useCallback(async () => {
    setVoiceStatus('connecting')
    try {
      // Get a token from our API
      const roomName = `qa-visitor-${Date.now()}`
      const participantName = `visitor-${Math.random().toString(36).slice(2, 8)}`
      const tokenRes = await fetch('/api/livekit-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName, participantName }),
      })
      if (!tokenRes.ok) throw new Error('Token fetch failed')
      const { token, url } = await tokenRes.json()

      const room = new Room({ adaptiveStream: true, dynacast: true })
      roomRef.current = room

      room.on(RoomEvent.ConnectionStateChanged, (state: ConnectionState) => {
        if (state === ConnectionState.Connected) {
          setVoiceStatus('connected')
          // Unblock browser autoplay after connection (requires prior user gesture)
          room.startAudio()
        }
        if (state === ConnectionState.Disconnected) {
          setVoiceStatus('idle')
          setAgentSpeaking(false)
        }
      })

      // Attach remote audio tracks (agent speech)
      room.on(RoomEvent.TrackSubscribed, (track: RemoteTrack, pub: RemoteTrackPublication, _participant: RemoteParticipant) => {
        if (pub.kind === Track.Kind.Audio) {
          const el = track.attach()
          el.autoplay = true
          document.body.appendChild(el)
        }
      })

      room.on(RoomEvent.TrackUnsubscribed, (track: RemoteTrack) => {
        track.detach().forEach((el) => el.remove())
      })

      // Use ActiveSpeakersChanged for real-time speaking indicator
      room.on(RoomEvent.ActiveSpeakersChanged, (speakers) => {
        const agentIsSpeaking = speakers.some((p) => p !== room.localParticipant)
        setAgentSpeaking(agentIsSpeaking)
      })

      await room.connect(url, token)

      // Enable microphone after connection
      await room.localParticipant.setMicrophoneEnabled(true)
    } catch (e) {
      console.error('Voice connect error:', e)
      setVoiceStatus('error')
      roomRef.current?.disconnect()
      roomRef.current = null
    }
  }, [])

  function disconnectVoice() {
    roomRef.current?.disconnect()
    roomRef.current = null
    setVoiceStatus('idle')
    setAgentSpeaking(false)
    setMicMuted(false)
  }

  function toggleMute() {
    const lp = roomRef.current?.localParticipant as LocalParticipant | undefined
    if (!lp) return
    const enabled = !micMuted
    lp.setMicrophoneEnabled(enabled)
    setMicMuted(!enabled)
  }

  function switchToText() {
    disconnectVoice()
    setMode('text')
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-5 z-50 w-[360px] max-w-[calc(100vw-24px)] flex flex-col rounded-2xl border border-space-border shadow-2xl overflow-hidden"
            style={{ background: '#171411', maxHeight: '520px' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b border-space-border shrink-0"
              style={{ background: '#12100D' }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-quantum-green" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
                <span className="text-text-primary text-sm font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                  Quantum Atlas
                </span>
                <span className="text-text-secondary text-xs">· AI Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Mode toggle */}
                <button
                  onClick={() => mode === 'text' ? (setMode('voice'), connectVoice()) : switchToText()}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                  title={mode === 'text' ? 'Switch to voice' : 'Switch to text'}
                >
                  {mode === 'voice' ? <MicOff size={15} /> : <Mic size={15} />}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {mode === 'text' ? (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'text-space-black rounded-br-sm'
                            : 'text-text-primary rounded-bl-sm border border-space-border'
                        }`}
                        style={{
                          fontFamily: 'var(--font-body)',
                          background: msg.role === 'user' ? '#FFBF00' : '#0C0A08',
                        }}
                      >
                        {msg.role === 'user' ? (
                          <span className="whitespace-pre-wrap">{msg.text}</span>
                        ) : (
                          <div className="prose prose-sm prose-invert max-w-none [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:mb-2 [&_ol]:mb-2 [&_li]:mb-0.5 [&_table]:text-xs [&_th]:text-text-primary [&_td]:text-text-secondary">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm, remarkBreaks]}
                              components={{
                                a: ({ href, children }) => (
                                  <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-amber-400 underline hover:text-amber-300"
                                  >
                                    {children}
                                  </a>
                                ),
                                table: ({ children }) => (
                                  <div className="overflow-x-auto">
                                    <table>{children}</table>
                                  </div>
                                ),
                                // Disable raw HTML passthrough
                                html: () => null,
                              }}
                            >
                              {msg.text}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div
                        className="px-3.5 py-2.5 rounded-xl rounded-bl-sm border border-space-border flex items-center gap-2"
                        style={{ background: '#0C0A08' }}
                      >
                        <Loader2 size={14} className="text-text-secondary animate-spin" />
                        <span className="text-text-secondary text-xs">Thinking…</span>
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="px-3 py-3 border-t border-space-border shrink-0" style={{ background: '#12100D' }}>
                  <div className="flex items-end gap-2">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      placeholder="Ask about our services…"
                      rows={1}
                      disabled={loading}
                      className="flex-1 resize-none bg-transparent text-text-primary text-sm placeholder:text-text-secondary/50 focus:outline-none leading-relaxed py-1 max-h-24 overflow-y-auto"
                      style={{ fontFamily: 'var(--font-body)' }}
                    />
                    <button
                      onClick={() => { setMode('voice'); connectVoice() }}
                      disabled={loading}
                      className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border transition-all hover:brightness-125 disabled:opacity-40"
                      style={{ borderColor: '#FFBF00', background: 'rgba(255,191,0,0.10)' }}
                      aria-label="Talk to our voice assistant"
                      title="Talk to our voice assistant"
                    >
                      <Mic size={15} className="text-electric-blue" />
                    </button>
                    <button
                      onClick={send}
                      disabled={!input.trim() || loading}
                      className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-40 hover:brightness-110"
                      style={{ background: '#FFBF00' }}
                      aria-label="Send"
                    >
                      <Send size={14} className="text-space-black" />
                    </button>
                  </div>
                  <p className="text-text-secondary/60 text-[10px] mt-2 text-center" style={{ fontFamily: 'var(--font-mono)' }}>
                    Enter to send · Shift+Enter for new line ·{' '}
                    <button
                      onClick={() => { setMode('voice'); connectVoice() }}
                      className="underline text-electric-blue hover:brightness-125"
                    >
                      Talk to voice assistant
                    </button>
                  </p>
                </div>
              </>
            ) : (
              /* Voice mode UI */
              <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 py-8">
                {voiceStatus === 'connecting' && (
                  <>
                    <Loader2 size={32} className="text-quantum-green animate-spin" />
                    <p className="text-text-secondary text-sm text-center">Connecting to voice assistant…</p>
                  </>
                )}

                {voiceStatus === 'connected' && (
                  <>
                    {/* Animated orb */}
                    <div className="relative flex items-center justify-center">
                      <div
                        className="w-20 h-20 rounded-full"
                        style={{
                          background: 'radial-gradient(circle, #FFBF00 0%, #c8900040 60%, transparent 70%)',
                          animation: agentSpeaking ? 'pulse-dot 0.8s ease-in-out infinite' : 'pulse-dot 2s ease-in-out infinite',
                          boxShadow: agentSpeaking ? '0 0 40px #FFBF0060' : '0 0 20px #FFBF0030',
                        }}
                      />
                    </div>
                    <p className="text-text-primary text-sm font-medium">
                      {agentSpeaking ? 'Agent speaking…' : micMuted ? 'Microphone muted' : 'Speak now…'}
                    </p>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={toggleMute}
                        className="w-12 h-12 rounded-full border border-space-border flex items-center justify-center transition-all hover:brightness-110"
                        style={{ background: micMuted ? '#2E261F' : '#FFBF00' }}
                        title={micMuted ? 'Unmute' : 'Mute'}
                      >
                        {micMuted
                          ? <MicOff size={18} className="text-text-secondary" />
                          : <Mic size={18} className="text-space-black" />
                        }
                      </button>
                      <button
                        onClick={disconnectVoice}
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:brightness-110"
                        style={{ background: '#7f1d1d' }}
                        title="End call"
                      >
                        <PhoneOff size={18} className="text-red-300" />
                      </button>
                    </div>
                    <button onClick={switchToText} className="text-text-secondary/50 text-xs hover:text-text-secondary transition-colors">
                      Switch to text chat
                    </button>
                  </>
                )}

                {voiceStatus === 'error' && (
                  <>
                    <p className="text-red-400 text-sm text-center">Could not connect to voice assistant.</p>
                    <button
                      onClick={connectVoice}
                      className="px-4 py-2 rounded-lg text-sm text-space-black font-medium"
                      style={{ background: '#FFBF00' }}
                    >
                      Try again
                    </button>
                    <button onClick={switchToText} className="text-text-secondary/50 text-xs hover:text-text-secondary transition-colors">
                      Use text chat instead
                    </button>
                  </>
                )}

                {voiceStatus === 'idle' && (
                  <>
                    <p className="text-text-secondary text-sm text-center">Voice assistant ready</p>
                    <button
                      onClick={connectVoice}
                      className="px-4 py-2 rounded-lg text-sm text-space-black font-medium"
                      style={{ background: '#FFBF00' }}
                    >
                      Start voice chat
                    </button>
                  </>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:brightness-110 hover:scale-105"
        style={{ background: '#FFBF00' }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        {open
          ? <X size={22} style={{ color: '#0C0A08' }} />
          : <MessageSquare size={22} style={{ color: '#0C0A08' }} />
        }
      </motion.button>
    </>
  )
}
