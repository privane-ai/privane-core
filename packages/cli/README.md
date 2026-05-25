# privane-cli

> CLI runtime and OpenAI-compatible local AI server.

`privane-cli` is the local daemon executor and command-line companion tool for the **Privane** developer operating system. It boots an OpenAI-compatible REST server locally, enabling any LLM client, script, or editor extension to stream chat completions running 100% offline on on-device hardware.

---

## ⚡ Genuinely Useful Locally

We believe open-source toolkits should be robust and functional out of the box. `privane-cli` is **fully featured and functional locally**—spawning local REST servers, fetching model weights, and streaming Server-Sent Events (SSE) completely offline on native CPU/GPU hardware.

---

## Features

* ⚡ **OpenAI-Compatible REST Server:** Implements standard `POST /v1/chat/completions` and `GET /v1/models` routes matching OpenAI specifications.
* 🌊 **Server-Sent Events (SSE) Streaming:** Delivers token-by-token stream completions natively over standard HTTP SSE channels.
* 📦 **Lazy Weight Downloader:** Automatically manages, downloads, and caches quantized model weights in a local secure folder (`~/.privane/models/`).
* 🔒 **Interactive HITL Prompts:** Pauses automation threads and requests operator approval via terminal prompts for high-risk actions.

---

## Installation

Install globally to access the unified `privane` command:

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

## 🚀 Built with Privane

Developers use `privane-cli` to construct rich, sovereign AI workflows including:
* 💻 **Local AI Copilots:** Code completions and review loops directly in terminal interfaces.
* 🌐 **Sovereign Browser Agents:** Virtualized web scrapers that reason locally before performing state updates.
* 🏢 **Internal Enterprise Assistants:** Secure document search tools that never leak proprietary context.
* 🔌 **Offline AI Systems:** Volunteer networks and remote devices working without active network feeds.
* 🐙 **GitHub Workflow Agents:** Automated pull request scanners analyzing code blocking team tasks.

---

## License

Released under the **Apache-2.0 License**. Build sovereign CLI agents freely!
