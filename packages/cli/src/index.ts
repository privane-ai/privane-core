#!/usr/bin/env node

import { Command } from 'commander';
import { bootstrapServer } from './server.js';
import { ModelManager } from './model-manager.js';
import { bootstrapInteractiveChat } from './chat.js';

const program = new Command();

program
  .name('privane')
  .description('Unified CLI daemon and REST server orchestration engine for sovereign AI')
  .version('1.0.0');

// privane serve
program
  .command('serve')
  .description('Start the OpenAI-compatible Local REST API gateway daemon')
  .option('-p, --port <port>', 'Target port to serve local connections', '8080')
  .action((options) => {
    const port = parseInt(options.port, 10);
    console.log("🚀 Bootstrapping local execution boundary...");
    bootstrapServer(port);
  });

// privane run <model>
program
  .command('run <modelName>')
  .description('Pull a quantized GGUF model weights file to secure local cache and spin it')
  .action(async (modelName) => {
    console.log(`📦 Active Model Trigger: requesting [${modelName}]`);
    try {
      const manager = new ModelManager();
      await manager.pullModel(modelName);
      console.log(`✓ Success: [${modelName}] is cached and ready to serve.`);
    } catch (error: any) {
      console.error(`🚨 Run Failure: ${error.message}`);
      process.exit(1);
    }
  });

// privane chat [model]
program
  .command('chat [modelName]')
  .description('Launch an interactive sovereign terminal chat session')
  .action(async (modelName) => {
    const selectedModel = modelName || 'gemma-2b-instruct';
    await bootstrapInteractiveChat(selectedModel);
  });

program.parse(process.argv);
