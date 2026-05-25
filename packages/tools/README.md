# @privane/tools

> Unified tool execution fabric and sandboxed local adapters for sovereign AI.

`@privane/tools` is the security and execution layer for the **Privane** developer operating system. It provides traversal-proof filesystem sandboxes, database query mutation guards, and secure, stateless cloud gateway dispatchers to bridge local AI reasoning loops with global automation safely.

---

## Features

* 📁 **Traversal-Proof Filesystem Sandbox:** Lock file mutations within specified workspaces, throwing immediate errors if relative traversals are attempted.
* 🛡️ **SQLite Guard Adapter:** Intercept raw SQL execution and block destructive mutations (such as `DROP` or `DELETE`) using keyword safety filters.
* ☁️ **Stateless Cloud Gateway Client:** Dispatch outbound actions (such as sending Slack notifications or scanning GitHub PRs) over the `api.privane.dev` gateway without leaking tokens or local parameters.
* 🤖 **Hosted Headless Browser Node:** Command remote Chromium instances and compress raw DOM page structures into high-signal accessibility trees, saving over 95% in token consumption.

---

## Installation

```bash
npm install @privane/tools
```

---

## Quickstart

### 1. Sandboxed Filesystem Operations
```javascript
import { LocalFileSystemTool } from '@privane/tools';

const sandbox = new LocalFileSystemTool({ 
  allowedDirectory: './sandbox_test' 
});

// Safe write
await sandbox.write('report.txt', 'Sovereign standup generated.');

// Traversal attacks are safely caught and aborted:
try {
  await sandbox.read('../../../etc/passwd');
} catch (err) {
  console.error("Access Blocked: Traversal breach intercepted!");
}
```

### 2. Dispatches Over Stateless Cloud Gates
```javascript
import { ManagedToolGateway } from '@privane/tools';

const gateway = new ManagedToolGateway({
  apiKey: process.env.PRIVANE_API_KEY
});

// Dispatch Slack message ephemerally without leaking context indices
const result = await gateway.dispatch({
  target: 'slack',
  action: 'sendMessage',
  payload: {
    channel: '#engineering-standups',
    text: 'Sovereign PR summary ready for review.'
  }
});
```

---

## License

Released under the **Apache-2.0 License**. Build sovereign agents freely!
