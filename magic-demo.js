import { Engine } from './packages/engine/dist/index.js';
import { ManagedToolGateway } from './packages/tools/dist/index.js';

async function runMagicDemo() {
  console.log("==================================================================");
  console.log("🚀 STARTING THE PRIVANE 'MAGIC DEMO' HYBRID LOOP...");
  console.log("   Narrative: Local reasoning, real-world execution. Actually working.");
  console.log("==================================================================\n");

  // 1. Initialize local CPU/GPU reasoning engine runtime
  const engine = new Engine({ backend: 'cpu' });
  
  // allocate RAM for Gemma model locally
  await engine.load('gemma-2b-instruct');

  // 2. Initialize the secure managed tools connector gateway
  const gateway = new ManagedToolGateway("privane_standup_agent_api_key");
  
  const github = gateway.get("github");
  const browser = gateway.get("browser");
  const slack = gateway.get("slack");

  // ==========================================
  // Step 1: Fetch Unread Pull Request Notifications
  // ==========================================
  console.log("\n➡️  Step 1: Reading unread engineering notifications via GitHub Gateway...");
  const notifications = await github.execute("getUnreadNotifications");
  console.log(`   Discovered ${notifications.length} active notification items.`);

  for (const item of notifications) {
    if (item.subject.type === "PullRequest") {
      console.log(`   Target Notification: "${item.subject.title}"`);
      console.log(`   PR Link: ${item.subject.url}`);

      // ==========================================
      // Step 2: Open and Parse PR Page in Headless Browser
      // ==========================================
      console.log("\n➡️  Step 2: Dispatching Hosted Browser to navigate and scan the PR DOM...");
      const pageTitle = await browser.goto(item.subject.url);
      console.log(`   Page Loaded: "${pageTitle}"`);

      // Perform structured extraction utilising the Cloud DOM Accessibility Tree Pruner
      const prDetails = await browser.extract({
        title: "string",
        diffChanges: "string",
        lastComment: "string"
      });

      console.log(`   Structured PR diff data retrieved safely.`);

      // ==========================================
      // Step 3: Run Local Reasoning Loop on secure hardware
      // ==========================================
      console.log("\n➡️  Step 3: Processing code analysis locally on secure silicon...");
      const localResult = await engine.run({
        task: "Verify pull request modifications and summarize team blockers.",
        context: prDetails,
        tools: [github, browser]
      });

      console.log(`\n   --- Local Analysis Output ---`);
      console.log(`   ${localResult.summary}`);
      console.log(`   -----------------------------\n`);

      // ==========================================
      // Step 4: Dispatch standup standup digest to Slack
      // ==========================================
      console.log("➡️  Step 4: Offloading standup updates to secure Slack Webhook gateway...");
      const slackResult = await slack.execute("sendMessage", {
        channel: "#engineering-standups",
        text: localResult.summary
      });

      console.log(`   Gateway Dispatched Slack notification:`);
      console.log(`   - Channel: ${slackResult.channel}`);
      console.log(`   - MessageId: ${slackResult.messageId}`);
      console.log(`   - Dispatch Time: ${slackResult.deliveredAt}`);
    }
  }

  console.log("\n==================================================================");
  console.log("🎉 SUCCESS: PRIVANE END-TO-END HYBRID ORCHESTRATION COMPLETED!");
  console.log("   Local reasoning secured. Real-world SaaS integrations dispatches executed.");
  console.log("==================================================================");
}

runMagicDemo().catch(console.error);
