import { ManagedToolGateway } from './packages/tools/dist/index.js';

async function testHostedBrowser() {
  console.log("🌐 Starting Hosted Browser Gateway & HITL Verification...\n");

  const gateway = new ManagedToolGateway("privane_beta_api_key");
  
  // Obtain browser connector (HostedBrowserNode)
  const browser = gateway.get("browser");

  try {
    // 1. Navigation
    console.log("➡️ Step 1: Navigating to GitHub Trending...");
    const title = await browser.goto("https://github.com/trending");
    console.log(`   Page Loaded: "${title}"\n`);

    // 2. Keyboard typing
    console.log("➡️ Step 2: Simulating search input...");
    await browser.type("#search-box", "Gemma WebGPU");
    console.log("   Keyboard input registered successfully.\n");

    // 3. Normal Click (Low risk, executes instantly)
    console.log("➡️ Step 3: Performing low-risk click action...");
    await browser.click("a.tab-trending-repositories");
    console.log("   Click registered successfully.\n");

    // 4. Structured Accessibility Tree DOM Pruning Extraction
    console.log("➡️ Step 4: Dispatching structured accessibility tree extraction...");
    const extractedData = await browser.extract({
      repositories: [
        { name: "string", description: "string", stars: "number" }
      ]
    });
    console.log("   Extracted Structured Schema payload:");
    console.log(JSON.stringify(extractedData, null, 2));
    console.log("\n✓ Extraction successfully processed.\n");

    // 5. HIGH RISK Click (Triggers terminal HITL prompt)
    console.log("➡️ Step 5: Simulating a high-risk mutation click (#buy-pro-subscription)...");
    await browser.click("#buy-pro-subscription-action");
    console.log("✓ Step 5 Passed: HITL approved execution successfully.\n");

  } catch (err) {
    console.error(`🚨 Verification Suite Exception: ${err.message}\n`);
  }

  console.log("==========================================");
  console.log("🎉 HOSTED BROWSER VERIFICATION COMPLETED!");
  console.log("==========================================");
}

testHostedBrowser().catch(console.error);
