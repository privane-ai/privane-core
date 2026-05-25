# @privane/engine

> Browser-native local AI runtime with WebGPU acceleration.

`@privane/engine` is the core client-side AI inference runtime module for the **Privane** developer operating system. It enables autonomous, production-grade AI agents to load quantized LLM weights and run heavy cognitive reasoning loops fully locally on native hardware, maintaining absolute context privacy.

---

## ⚡ Genuinely Useful Locally

We believe open-source AI tools should never feel crippled or act as a "bait-and-switch" for SaaS products. `@privane/engine` is **100% complete and fully featured locally**—running completely offline on native CPU/GPU silicon with zero cloud dependencies or mandatory lock-in.

---

## Features

* 🧠 **Volatile On-Device Inference:** Run quantized models (such as Gemma or Llama) natively on local hardware.
* 🔒 **Context Sovereignty:** Keep raw prompts, workspace paths, and system instructions 100% offline.
* 🚀 **Zero-Configuration:** Zero external API keys needed for local reasoning tasks.

---

## Installation

```bash
npm install @privane/engine
```

---

## Quickstart

Initialize the local weight engine and fetch token-by-token completion streams fully offline in a few lines of code:

```javascript
import { Engine } from '@privane/engine';

// Initialize the local engine
const engine = new Engine();

// Lazily load instruct weights natively into secure RAM
await engine.load('gemma-2b-instruct');

// Stream sovereign completions token-by-token
const stream = engine.generate({ 
  prompt: "Synthesize team blockers and identify blocked developers." 
});

for await (const token of stream) {
  process.stdout.write(token);
}
```

---

## 🚀 Built with Privane

Developers use `@privane/engine` to construct rich, sovereign AI workflows including:
* 💻 **Local AI Copilots:** Code completions and review loops directly in terminal interfaces.
* 🌐 **Sovereign Browser Agents:** Virtualized web scrapers that reason locally before performing state updates.
* 🏢 **Internal Enterprise Assistants:** Secure document search tools that never leak proprietary context.
* 🔌 **Offline AI Systems:** Volunteer networks and remote devices working without active network feeds.
* 🐙 **GitHub Workflow Agents:** Automated pull request scanners analyzing code blocking team tasks.

---

## License

Released under the **Apache-2.0 License**. Build sovereign agents freely!
