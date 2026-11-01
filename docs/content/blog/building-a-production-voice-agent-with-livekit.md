---
title: "Building a Production Voice Agent with Self-Hosted LiveKit, Deepgram and a Knowledge Tool"
slug: building-a-production-voice-agent-with-livekit
category: technical-deep-dive
excerpt: "How the voice assistant on our own website works: a self-hosted LiveKit server, Deepgram speech-to-text and text-to-speech, an LLM, a retrieval tool, and the small safeguards, like a 60-second inactivity disconnect, that keep it well-behaved."
metaTitle: "Voice Agent with Self-Hosted LiveKit and Deepgram"
metaDescription: "Architecture of a browser voice agent: self-hosted LiveKit, Deepgram speech services, an LLM, a knowledge tool, inactivity disconnect and safe fallbacks."
readTime: 9
tags: [voice-ai, livekit, deepgram, realtime, rag, agents, python]
schemaType: Article
author: Quantum Atlas Engineering
technicalReviewer: "[OWNER-CONFIRM: technical reviewer name + LinkedIn]"
faqs:
  - q: "What is LiveKit?"
    a: "LiveKit is an open-source real-time audio and video platform built on WebRTC. A server routes media between participants in a room, and an agents framework lets a program join the room as a participant, such as a voice assistant."
  - q: "Why self-host LiveKit instead of using the hosted service?"
    a: "Self-hosting keeps the media server inside your own infrastructure and avoids a per-minute platform charge. The trade-off is that you operate it: upgrades, TLS, ports, scaling and monitoring become your job."
  - q: "How does the agent know when a user has finished speaking?"
    a: "The speech-to-text service detects the end of an utterance after a short silence, set here to 300 milliseconds, and the agent treats that as the end of the turn. Interruptions are allowed, so the user can speak over the agent."
  - q: "How do you stop a voice agent making things up?"
    a: "We give it a retrieval tool for factual questions, instruct it to answer only from retrieved material, and tell it to hand off to the team when the knowledge base has nothing. This reduces invented answers but cannot remove them entirely."
  - q: "Is this agent used for phone calls?"
    a: "The agent described here serves visitors on a website through the browser. This article covers the browser agent only. Our phone-calling stack runs separately, on an Indian carrier with different speech components."
sources:
  - title: "LiveKit Agents documentation"
    url: "https://docs.livekit.io/agents/"
  - title: "LiveKit: Self-hosting deployment"
    url: "https://docs.livekit.io/home/self-hosting/deployment/"
  - title: "Deepgram documentation"
    url: "https://developers.deepgram.com/docs"
lastReviewed: 2026-11-01
owner_confirm:
  - "[OWNER-CONFIRM: technical reviewer name + LinkedIn]"
  - "[OWNER-CONFIRM: health-check mechanism for the voice agent in production (agent.py has startup validation and tool-level fallbacks but no dedicated health endpoint); confirm what monitors the process]"
---

# Building a Production Voice Agent with Self-Hosted LiveKit, Deepgram and a Knowledge Tool

*By Quantum Atlas Engineering. Technical reviewer: [OWNER-CONFIRM: technical reviewer name + LinkedIn]. Last reviewed 1 November 2026.*

The voice assistant on our website is a small system, and that is useful for an article like this: you can see the whole thing. A visitor clicks a button, speaks, and an AI answers in speech, drawing on a knowledge base when the question is factual. This post walks through the architecture, the settings that matter, the failure handling, and what we would change. It is about a browser voice agent on our own site. It covers the browser stack only: phone calling is a separate system, and we publish no call volumes.

## What are the parts of a voice agent?

**Short answer:** A real-time media server, a speech-to-text service, a language model, a text-to-speech service, a retrieval tool, and an orchestrating agent that joins the call as a participant. Audio flows in through the first, out through the last.

| Part | What we use | Job |
|---|---|---|
| Web front end | Chat widget in a Next.js site | Starts a voice session, plays the audio |
| Token endpoint | Server route in the website | Issues a short-lived token so the browser can join a room |
| Media server | LiveKit, self-hosted, in a container | Routes audio between the browser and the agent |
| Agent worker | Python, LiveKit Agents SDK | Joins the room, runs the conversation |
| Speech-to-text | Deepgram `nova-3` | Turns the visitor's speech into text |
| Language model | A small, fast OpenAI chat model | Decides what to say and when to look something up |
| Text-to-speech | Deepgram Aura voice | Turns the reply into audio |
| Knowledge tool | HTTP call to our RAG API | Retrieves passages for factual questions |

## How does a conversation flow end to end?

**Short answer:** The browser asks the website for a token, joins a LiveKit room, and LiveKit dispatches a job to the agent worker. The agent joins the same room, listens, transcribes, thinks, speaks, and disconnects when the visitor goes quiet.

1. **Visitor starts voice.** The chat widget calls a server route that issues a signed token for a room.
2. **Browser joins the room.** It connects to the LiveKit server over a secure WebSocket, served through the site's reverse proxy.
3. **LiveKit dispatches a job.** The agent worker receives it, connects to the room and waits for the participant.
4. **Agent greets.** Once the visitor is present, the agent says a short greeting and asks how it can help.
5. **Visitor speaks.** Microphone audio flows to the agent, which streams it to Deepgram. Interim and final transcripts return.
6. **End of turn.** Deepgram's endpointing decides the visitor has finished, and the transcript goes to the language model.
7. **Optional lookup.** For factual questions, the model calls the knowledge tool, receives passages, and builds its answer from them.
8. **Agent replies.** The reply text goes to Deepgram's voice synthesis and the audio streams back through the room.
9. **Inactivity ends the session.** After 60 seconds with no visitor speech, the agent leaves the room.

## Which settings actually matter?

**Short answer:** Turn detection, endpointing delay, interruption handling and audio sample rate. They determine whether the agent feels responsive or clumsy.

- **Turn detection from the speech-to-text service.** The agent relies on Deepgram's end-of-utterance signal rather than a separate voice-activity model. Endpointing is set to 300 ms: a pause of that length marks the end of a turn.
- **Interim results on, and no-delay mode.** Partial transcripts stream as the visitor speaks, which keeps latency low.
- **Minimum endpointing delay of zero** on the agent side, so it does not add waiting on top of the speech-to-text decision.
- **Interruptions allowed.** If the visitor speaks while the agent is talking, the agent yields. In a human conversation, you can interrupt. A voice agent that cannot be interrupted is frustrating quickly.
- **16 kHz input audio.** A common sample rate for speech recognition.

Short endpointing makes the agent quick but increases the chance it cuts in on someone who pauses mid-sentence. Treat 300 ms as a setting to tune with real users, not a fixed truth.

## How does the knowledge tool work?

**Short answer:** It is a function the language model can call. It sends the question to our RAG search API in hybrid mode, takes the top four passages, and returns them as one block of context. If anything goes wrong, it returns a safe message instead of failing the call.

The tool takes a single query string. It posts to the search API with an API key header, asking for up to four results in hybrid mode with content included. Passages are joined with a separator and passed back to the model.

The failure handling is the part we would insist on in any voice agent, because silence in a live call is much worse than a polite fallback:

| Situation | What the tool returns | Why |
|---|---|---|
| No API key configured | "Knowledge base not configured." | The agent still runs and can say it is unsure |
| Non-200 response | "Could not retrieve information right now." | The error is logged, the call continues |
| No results | "No relevant information found in the knowledge base." | The model is told to hand off, not invent |
| Timeout (5 seconds) | "Knowledge base lookup timed out." | A hung request must not freeze the conversation |
| Any other exception | "Knowledge base lookup failed." | Same, with the error logged |

A five-second ceiling is a deliberate limit on how long a visitor waits in silence. Combined with short responses from the model, it keeps the conversation moving.

## Why disconnect after 60 seconds of silence?

**Short answer:** Because an open room costs resources and a visitor who walked away should not hold a session open. A watchdog checks every ten seconds and leaves the room if the visitor has been silent for 60.

The agent records the time of the latest visitor transcript. A background task wakes every ten seconds, compares, and calls disconnect when idle time reaches the limit. It is a few lines of code and removes a class of leaked sessions. One honest note: the clock resets on transcription events, so noise that the speech-to-text service transcribes as words will keep a session alive. That is acceptable for our use but worth knowing.

## What about health checks and monitoring?

**Short answer:** The worker validates its configuration at start-up and degrades gracefully when the knowledge tool fails. A process manager restarts it if it exits. We have not built a dedicated health endpoint for the agent, and we say so rather than imply one exists.

Concretely, the agent refuses to start if its speech or model credentials are missing, and warns if the knowledge-base key is missing. PM2 supervises the process. The LiveKit server runs in a container. A fuller production setup would add an active check that joins a test room, a metric for time-to-first-audio, and alerting on both. [OWNER-CONFIRM: health-check mechanism for the voice agent in production]

## What are the safety guardrails on what the agent says?

**Short answer:** An instruction to be concise, a retrieval tool for facts, and a rule to suggest a discovery call for complex questions. Instructions reduce wrong or over-reaching answers but cannot guarantee against them.

Voice is a poor medium for long answers, so the instruction asks for short replies. For safety, a voice assistant that represents a company needs more than brevity: it should not quote prices, promise delivery dates, name customers, or claim certifications. It should say it is an AI. We keep those rules in a separate system prompt that is reviewed like any other customer-facing text, and in a knowledge base the agent cites from, instead of letting claims accumulate inside the agent's code.

## How would you build one? A step list

1. **Stand up LiveKit.** Run the server in a container, put it behind a reverse proxy with TLS, and open the required media ports.
2. **Build the token endpoint.** A server route that issues short-lived, room-scoped tokens, with rate limiting.
3. **Write the agent worker.** Use the LiveKit Agents SDK. Validate environment variables at start-up.
4. **Wire speech-to-text and text-to-speech.** Set endpointing and interruption behaviour; test with real accents and real microphones.
5. **Add the language model** with a short, strict system prompt.
6. **Add the knowledge tool** with a timeout and a fallback for every failure.
7. **Add the inactivity watchdog.**
8. **Log what happened.** Transcripts, state changes, tool calls and errors.
9. **Supervise the process** and alert on exit.
10. **Test with people** who did not build it.

## What would we do differently?

- **Keep claims out of the agent's code.** Our first system prompt embedded company claims directly in the source. A prompt that makes assertions needs the same review as marketing copy, so we moved the facts to a reviewed knowledge base and a reviewed prompt.
- **Build the health check first.** We started with logs. An active probe that joins a room and measures time-to-first-audio would have caught problems before a visitor did.
- **Use secure WebSocket everywhere.** Our server configuration lists a plain `ws://` address alongside the public secure one. Production traffic should use `wss://` only.
- **Record latency per stage.** Without separate timings for transcription, model and synthesis, it is hard to know where a slow reply comes from.
- **Think about consent and disclosure.** A voice session should tell the visitor they are talking to an AI and how audio is handled.
- **Write the escalation path down.** When the agent cannot answer, a person should get the question. That workflow should exist before launch.

## Frequently asked questions

**What is LiveKit?**
LiveKit is an open-source real-time audio and video platform built on WebRTC. A server routes media between participants in a room, and an agents framework lets a program join the room as a participant, such as a voice assistant.

**Why self-host LiveKit instead of using the hosted service?**
Self-hosting keeps the media server inside your own infrastructure and avoids a per-minute platform charge. The trade-off is that you operate it: upgrades, TLS, ports, scaling and monitoring become your job.

**How does the agent know when a user has finished speaking?**
The speech-to-text service detects the end of an utterance after a short silence, set here to 300 milliseconds, and the agent treats that as the end of the turn. Interruptions are allowed, so the user can speak over the agent.

**How do you stop a voice agent making things up?**
We give it a retrieval tool for factual questions, instruct it to answer only from retrieved material, and tell it to hand off to the team when the knowledge base has nothing. This reduces invented answers but cannot remove them entirely.

**Is this agent used for phone calls?**
The agent described here serves visitors on a website through the browser. This article covers the browser agent only. Our phone-calling stack runs separately, on an Indian carrier with different speech components.

## Sources and further reading

- LiveKit Agents documentation: https://docs.livekit.io/agents/
- LiveKit, self-hosting deployment: https://docs.livekit.io/home/self-hosting/deployment/
- Deepgram documentation: https://developers.deepgram.com/docs

*Thinking about a voice assistant for your own site or support line? Book a discovery call at https://quantumatlas.dev/contact.*
