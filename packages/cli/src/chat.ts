import readline from 'readline';
import { Engine } from '@privane/engine';
import { ModelManager } from './model-manager.js';

export async function bootstrapInteractiveChat(modelName: string) {
  const manager = new ModelManager();
  
  console.log(`\n======================================================`);
  console.log(`🧠 PRIVANE sovereign Interactive Local CLI Chat`);
  console.log(`   Model: ${modelName}`);
  console.log(`   Type 'exit' or press Ctrl+C to terminate session.`);
  console.log(`======================================================\n`);

  try {
    // 1. Ensure weights are cached locally
    await manager.pullModel(modelName);

    // 2. Initialize and load local weights
    console.log(`⚙️ Loading instruct weights into secure volatile RAM...`);
    const engine = new Engine({ backend: 'cpu' });
    await engine.load(modelName);
    console.log(`✓ Engine compiled successfully. Ready for local chats!\n`);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const askPrompt = () => {
      rl.question('\x1b[36muser> \x1b[0m', async (input) => {
        const query = input.trim();
        
        if (query.toLowerCase() === 'exit') {
          console.log('\n👋 Terminating interactive sovereign chat session.');
          rl.close();
          process.exit(0);
        }

        if (query.length === 0) {
          askPrompt();
          return;
        }

        process.stdout.write('\x1b[32massistant> \x1b[0m');
        
        try {
          const stream = engine.generate({
            prompt: query,
            temperature: 0.7,
            maxTokens: 300
          });

          for await (const token of stream) {
            process.stdout.write(token);
          }
          process.stdout.write('\n\n');
        } catch (err: any) {
          console.error(`\n🚨 Inference Error: ${err.message}\n`);
        }

        askPrompt();
      });
    };

    askPrompt();

  } catch (error: any) {
    console.error(`🚨 Chat Boot Failure: ${error.message}`);
    process.exit(1);
  }
}
