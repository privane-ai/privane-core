# @privane/tools

> Unified local and cloud tool execution SDK for AI agents.

`@privane/tools` is the security, isolation, and execution layer for the **Privane** developer operating system. It provides traversal-proof filesystem sandboxes and safe database query locks for local execution, alongside secure, stateless cloud gateway dispatchers to bridge local AI reasoning loops with global automation safely.

---

## ⚡ Genuinely Useful Locally

We believe open-source tool libraries should never feel crippled or force you onto paid plans. `@privane/tools` is **fully featured and functional locally**—providing complete filesystem sandboxing and relational database guardrails with zero cloud dependencies or mandatory lock-in.

---

## Features

* 📁 **Traversal-Proof Filesystem Sandbox:** Lock file mutations strictly within specified local workspaces, throwing immediate errors if relative traversals are attempted.
* 🛡️ **SQLite Guard Adapter:** Intercept raw SQL execution and block destructive mutations (such as `DROP` or `DELETE`) fully on-device.
* ☁️ **Stateless Cloud Gateway Client:** Dispatch outbound actions (such as sending Slack notifications or scanning GitHub PRs) over the `api.privane.dev` gateway without leaking tokens or local parameters.
* 🤖 **Hosted Headless Browser Node:** Command remote Chromium instances and compress raw DOM page structures into high-signal accessibility trees, saving over 95% in token consumption.

---

## Installation

```bash
npm install @privane/tools
```

---

## Quickstart

### 1. Sandboxed Filesystem Operations (100% Local & Free)
```javascript
import { LocalFileSystemTool } from '@privane/tools';

const sandbox = new LocalFileSystemTool({ 
  allowedDirectory: './sandbox' 
});

// Safe local file operations
await sandbox.write('blockers.txt', 'Sovereign standup digest ready.');

// Traversal attacks are safely caught and aborted natively:
try {
  await sandbox.read('../../../etc/passwd');
} catch (err) {
  console.error("Access Blocked: Traversal breach intercepted!");
}
```

### 2. Dispatches Over Stateless Cloud Gates
When you are ready to enhance your workflow with outbound integrations, securely delegate commands through stateless cloud connect gates:
```javascript
import { tools } from '@privane/tools';

// Fetch standard connectors (integrated with PinchTab/Browserbase)
const github = tools.get('github');

const result = await github.execute({
  action: 'scanPullRequests',
  payload: { repo: 'privane-ai/privane-core' }
});
```

---

## 🚀 Built with Privane

Developers use `@privane/tools` to construct rich, sovereign AI workflows including:
* 💻 **Local AI Copilots:** Code completions and review loops directly in terminal interfaces.
* 🌐 **Sovereign Browser Agents:** Virtualized web scrapers that reason locally before performing state updates.
* 🏢 **Internal Enterprise Assistants:** Secure document search tools that never leak proprietary context.
* 🔌 **Offline AI Systems:** Volunteer networks and remote devices working without active network feeds.
* 🐙 **GitHub Workflow Agents:** Automated pull request scanners analyzing code blocking team tasks.

---

## License

Released under the **Apache-2.0 License**. Build sovereign agents freely!
