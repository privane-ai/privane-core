# privane-cli

> Unified CLI daemon and REST server orchestration engine for sovereign AI.

`privane-cli` is the local daemon executor and command-line companion tool for the **Privane** developer operating system. It boots an OpenAI-compatible REST server locally, enabling any LLM client, script, or editor extension to stream chat completions running 100% offline on on-device hardware.

---

## Features

* ⚡ **OpenAI-Compatible REST Server:** Implements standard `POST /v1/chat/completions` and `GET /v1/models` routes matching OpenAI specifications.
* 🌊 **Server-Sent Events (SSE) Streaming:** Delivers token-by-token stream completions natively over standard HTTP SSE channels.
* 📦 **Lazy Weight Downloader:** Automatically manages, downloads, and caches quantized model weights in a local secure folder (`~/.privane/models/`).
* 🔒 **Interactive HITL Prompts:** Pauses automation threads and requests operator approval via terminal prompts for high-risk actions.

---

## Installation

Install globally to access the `privane` daemon command:

```bash
npm install -g privane-cli
```

---

## Quickstart

### 1. Launch the Server Daemon
Fire up the local completions server on port `8080`:
```bash
privane serve
```
*Exposes standard SSE stream paths matching OpenAI specifications at `http://localhost:8080/v1`.*

### 2. Stream completions via standard `curl`
```bash
curl http://localhost:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemma-2b-instruct",
    "messages": [{"role": "user", "content": "Review local edits."}],
    "stream": true
  }'
```

---

## License

Released under the **Apache-2.0 License**. Build sovereign CLI agents freely!
