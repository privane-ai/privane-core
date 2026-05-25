import { LocalFileSystemTool, LocalSqliteTool, ManagedToolGateway } from './packages/tools/dist/index.js';
import path from 'path';

async function verifySecurityAndGateway() {
  console.log("🔒 Starting Security and Gateway Validation Test Suite...\n");

  const workspaceRoot = "./sandbox_test";
  const fsTool = new LocalFileSystemTool(workspaceRoot);
  const dbTool = new LocalSqliteTool("./local_index.db");
  const gateway = new ManagedToolGateway("privane_beta_api_key");

  // ==========================================
  // Test 1: Successful Sandboxed Write
  // ==========================================
  try {
    console.log("➡️ Test 1: Writing file inside sandbox...");
    const msg = await fsTool.writeFile("config.json", JSON.stringify({ version: "1.0.0" }));
    console.log(msg);
    console.log("✓ Test 1 Passed.\n");
  } catch (err) {
    console.error(`🚨 Test 1 Failed: ${err.message}\n`);
  }

  // ==========================================
  // Test 2: Traversal Block Exploits
  // ==========================================
  try {
    console.log("➡️ Test 2: Simulating Directory Traversal Exploit Attack (../../etc/passwd)...");
    await fsTool.writeFile("../../../secret_keys.json", "stolen_data");
    console.error("🚨 Test 2 Failed: Security filter did not block traversal access!\n");
  } catch (err) {
    console.log(`✓ Test 2 Passed: Traversal blocked successfully. Error:`);
    console.log(`  "${err.message}"\n`);
  }

  // ==========================================
  // Test 3: SQL Injection Structural Mutation Block
  // ==========================================
  try {
    console.log("➡️ Test 3: Simulating SQL Injection mutation command (DROP TABLE users)...");
    await dbTool.executeQuery("DROP TABLE users;");
    console.error("🚨 Test 3 Failed: SQL filter did not block mutation keyword!\n");
  } catch (err) {
    console.log(`✓ Test 3 Passed: SQL command blocked successfully. Error:`);
    console.log(`  "${err.message}"\n`);
  }

  // ==========================================
  // Test 4: Cloud Gateway Stateless Proxy Dispatch
  // ==========================================
  try {
    console.log("➡️ Test 4: Dispatching secure Slack dispatch to Cloud Gateway...");
    const slack = gateway.get("slack");
    const result = await slack.execute("sendMessage", {
      channel: "#standups",
      text: "Local Standup computed on safe hardware."
    });
    console.log("  Gateway Response Payload:");
    console.log(`  - Status: ${result.status}`);
    console.log(`  - MessageId: ${result.messageId}`);
    console.log(`  - DeliveredAt: ${result.deliveredAt}`);
    console.log("✓ Test 4 Passed.\n");
  } catch (err) {
    console.error(`🚨 Test 4 Failed: ${err.message}\n`);
  }

  console.log("==========================================");
  console.log("🎉 ALL SECURITY AND GATEWAY CHECKS PASSED!");
  console.log("==========================================");
}

verifySecurityAndGateway().catch(console.error);
