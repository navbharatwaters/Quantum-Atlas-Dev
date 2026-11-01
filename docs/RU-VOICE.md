# Russian voice assistant

How the Russian voice works and how it is deployed (set up 2026-11-01).

## Behaviour
- The website names LiveKit rooms `qa-visitor-<ts>` (English) or `qa-ru-visitor-<ts>` (Russian pages).
- `infra/livekit-agent/agent.py` checks the room name prefix `qa-ru-`:
  - Russian: Deepgram STT `nova-3` with `language="ru"`, Deepgram **Flux** TTS (`deepgram.TTSv2`, default `flux-natalia-ru`), Russian instructions (`RU_ADDENDUM`), Russian greeting.
  - English: unchanged (Deepgram `nova-3`, Aura `aura-asteria-en`).
- LLM for both: OpenRouter, model `QA_LLM_MODEL` (default `google/gemini-2.5-flash`), key `QA_OPENROUTER_API_KEY`.
- Russian contact given by the agent: Mariia Nabira, +7 922 744-60-60 (never the Indian numbers).

## Settings (server `/opt/apps/livekit-agent/.env`, shared file; only these names are Quantum Atlas specific)
- `QA_OPENROUTER_API_KEY`, `QA_LLM_MODEL` (optional)
- `QA_RU_TTS_MODEL` (optional): any Flux Russian voice, e.g. `flux-olga-ru`, `flux-andrei-ru`, `flux-mikhail-ru`; female: natalia, olga, polina; male: andrei, kirill, maxim, mikhail, nikolai, vladimir.
- `DEEPGRAM_API_KEY` (shared). Flux TTS is billed at about $0.045 per 1,000 characters; check whether the signup credit covers TTS.

## Why a separate Python environment
The shared venv (`/opt/apps/livekit-agent/venv`, livekit-agents 1.3.5) has no `TTSv2`. Upgrading it would affect the iKargos, NWPL and RAG voice agents. The Quantum Atlas agent therefore runs from its own venv:
- `/opt/apps/livekit-agent-qa/venv` (livekit-agents 1.8.x, livekit-plugins-deepgram/openai/silero)
- `/opt/apps/livekit-agent/start.sh` (used only by PM2 process `quantum-atlas-voice`) execs that venv's python.

## Deploy / rollback
1. Copy `agent.py` to `/opt/apps/livekit-agent/agent.py` (back up the old file first), `pm2 restart quantum-atlas-voice`.
2. Rollback: restore `agent.py.bak-ru2-<ts>` and `start.sh.bak-ru2-<ts>` in `/opt/apps/livekit-agent/`, then restart the process (this returns it to the old shared venv).
3. Smoke test without a microphone: join a room as a real WebRTC client with `livekit.rtc` (see the e2e script idea: token from `/api/livekit-token`, publish silence, measure audible audio received). Expect first speech in about 3 s.

## Privacy
Voice sessions stream audio to Deepgram; the agent writes transcripts to its operational logs (see `/privacy`). A Russian-language privacy policy and counsel review (152-FZ, consent for recording) are still open.
