# @privane/engine

> Headless browser-native local AI inference runtime engine.

`@privane/engine` is the core client-side AI inference runtime module for the **Privane** developer operating system. It enables autonomous, production-grade AI agents to load quantized LLM weights and run heavy cognitive reasoning loops fully locally on native hardware, maintaining absolute context privacy.

---

## Features

* 🧠 **Volatile On-Device Inference:** Run quantized models (such as `gemma-2b-instruct` or Llama) natively on local hardware.
* 🔒 **Context Sovereignty:** Keep raw prompts, workspace paths, and system instructions 100% offline.
* 🚀 **Zero-Configuration:** Zero external API keys needed for local reasoning tasks.

---

## Installation

```bash
npm install @privane/engine
```

---

## Quickstart

Initialize the local weight engine and fetch token-by-token completion streams fully offline:

```javascript
import { Engine } from '@privane/engine';

// Initialize the local CPU/GPU backend engine
const engine = new Engine({ backend: 'cpu' });

// Lazily load local instruct weights into secure RAM
await engine.load('gemma-2b-instruct');

// Fetch sovereign completions token-by-token
const stream = engine.generate({ 
  prompt: "Synthesize team blockers and identify blocked developers." 
});

for await (const token of stream) {
  process.stdout.write(token);
}
```

---

## License

Released under the **Apache-2.0 License**. Build sovereign agents freely!
