import fs from 'fs';
import path from 'path';
import readline from 'readline';

export type JSONSchema = Record<string, any>;

export type ToolDefinition = {
  name: string;
  description: string;
  permissions: string[];
  inputSchema: JSONSchema;
  outputSchema: JSONSchema;
  execution: "local" | "managed";
};

// Helper utility for terminal Human-in-the-Loop confirmations
async function requestUserApproval(actionSummary: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(`\n⚠️  [PRIVANE HITL GUARD] Security Checkpoint:\n   Requesting approval for action: [${actionSummary}]\n   Approve execution? (y/n): `, (answer) => {
      rl.close();
      const cleanAnswer = answer.trim().toLowerCase();
      resolve(cleanAnswer === 'y' || cleanAnswer === 'yes');
    });
  });
}

// ==========================================
// 1. Local Sandboxed FileSystem Tool
// ==========================================
export class LocalFileSystemTool {
  public readonly name = "filesystem";
  public readonly execution = "local";
  private sandboxRoot: string;

  constructor(sandboxRoot: string) {
    this.sandboxRoot = path.resolve(sandboxRoot);
  }

  public async writeFile(relativePath: string, content: string): Promise<string> {
    const targetPath = path.resolve(this.sandboxRoot, relativePath);

    if (!targetPath.startsWith(this.sandboxRoot)) {
      throw new Error(`🚨 Security Breach: Access Denied. The target path "${relativePath}" falls outside the locked sandbox folder: ${this.sandboxRoot}`);
    }

    await fs.promises.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.promises.writeFile(targetPath, content, 'utf-8');
    return `✓ Secure FileSystem: File successfully written to workspace relative path: ${relativePath}`;
  }

  public async readFile(relativePath: string): Promise<string> {
    const targetPath = path.resolve(this.sandboxRoot, relativePath);

    if (!targetPath.startsWith(this.sandboxRoot)) {
      throw new Error(`🚨 Security Breach: Access Denied. The target path "${relativePath}" falls outside the locked sandbox folder.`);
    }

    if (!fs.existsSync(targetPath)) {
      throw new Error(`Local FileSystem Error: File not found: ${relativePath}`);
    }

    return await fs.promises.readFile(targetPath, 'utf-8');
  }
}

// ==========================================
// 2. Local Secure SQLite Tool Stub
// ==========================================
export class LocalSqliteTool {
  public readonly name = "sqlite";
  public readonly execution = "local";
  private dbPath: string;

  constructor(dbPath: string) {
    this.dbPath = dbPath;
  }

  public async executeQuery(sqlQuery: string): Promise<any> {
    console.log(`🗄️ Local SQLite: Executing SQL query against database [${this.dbPath}]...`);

    const disallowedKeywords = ['drop', 'alter', 'delete', 'truncate'];
    const lowerQuery = sqlQuery.toLowerCase();
    for (const keyword of disallowedKeywords) {
      if (lowerQuery.includes(keyword)) {
        throw new Error(`🚨 Security Breach: Query aborted. The SQL statement contain structural mutation keys: [${keyword.toUpperCase()}]`);
      }
    }

    if (lowerQuery.includes("users")) {
      return [
        { id: 1, name: "Malik", email: "malik@privane.dev", tier: "beta" },
        { id: 2, name: "Gemma", email: "gemma@ai.local", tier: "sovereign" }
      ];
    }

    return { status: "success", rowsModified: 0, rows: [] };
  }
}

// ==========================================
// 3. Hosted Cloud Browser Node SDK
// ==========================================
export class HostedBrowserNode {
  public readonly name = "browser";
  public readonly execution = "managed";
  private apiKey: string;
  private apiGatewayUrl: string = "http://localhost:5000/v1/browser"; // Route locally for verification

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Navigate headless Chromium session
  public async goto(url: string): Promise<string> {
    console.log(`☁️ Cloud Browser: Navigating to ${url}...`);
    const response = await fetch(`${this.apiGatewayUrl}/goto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({ url })
    });

    if (!response.ok) {
      throw new Error(`Hosted Browser Error: Failed to load ${url}`);
    }

    const data = await response.json();
    return data.pageTitle;
  }

  // Simulate Keyboard Type
  public async type(selector: string, text: string): Promise<string> {
    console.log(`☁️ Cloud Browser: Typing text into selector "${selector}"...`);
    const response = await fetch(`${this.apiGatewayUrl}/type`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({ selector, text })
    });

    const data = await response.json();
    return data.status;
  }

  // Simulate Mouse Click with Built-in Human-in-the-Loop Guards
  public async click(selector: string): Promise<string> {
    const riskKeywords = ['checkout', 'buy', 'submit', 'pay', 'purchase', 'delete', 'confirm'];
    const isHighRisk = riskKeywords.some((word) => selector.toLowerCase().includes(word));

    if (isHighRisk) {
      const approved = await requestUserApproval(`click(${selector}) on active browser session`);
      if (!approved) {
        throw new Error(`🚨 Security Violation: Action click(${selector}) rejected by the operator.`);
      }
      console.log(`✓ HITL Approved: Executing click(${selector})`);
    } else {
      console.log(`☁️ Cloud Browser: Clicking selector "${selector}"...`);
    }

    const response = await fetch(`${this.apiGatewayUrl}/click`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({ selector })
    });

    const data = await response.json();
    return data.status;
  }

  // Structured extraction with cloud accessibility tree DOM pruning
  public async extract(schema: Record<string, any>): Promise<any> {
    console.log(`☁️ Cloud Browser: Initiating high-signal Accessibility Tree extraction...`);
    const response = await fetch(`${this.apiGatewayUrl}/extract`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({ schema })
    });

    const data = await response.json();
    return data.data;
  }
}

// ==========================================
// 4. Managed Tool Gateway Cloud Proxy
// ==========================================
export class ManagedToolGateway {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public get(toolName: string): any {
    if (toolName === "browser") {
      return new HostedBrowserNode(this.apiKey);
    }

    return {
      name: toolName,
      execution: "managed",
      execute: async (action: string, parameters: Record<string, any>): Promise<any> => {
        console.log(`☁️ Cloud Gateway Dispatch: [${toolName}] -> dispatching action "${action}"...`);
        await new Promise((resolve) => setTimeout(resolve, 400));

        if (toolName === "slack") {
          return {
            status: "success",
            messageId: `msg_${Math.random().toString(36).substring(2, 11)}`,
            channel: parameters.channel || "#general",
            deliveredAt: new Date().toISOString()
          };
        }

        if (toolName === "github") {
          if (action === "getUnreadNotifications") {
            return [
              { id: "notif_101", subject: { title: "Refactor active GGUF loader models", type: "PullRequest", url: "https://github.com/privane/engine/pull/12" } }
            ];
          }
          return {
            status: "success",
            actionPerformed: action,
            triggeredAt: new Date().toISOString()
          };
        }

        return {
          status: "success",
          tool: toolName,
          action,
          payload: parameters
        };
      }
    };
  }
}
