import express from 'express';
import cors from 'cors';
import { Engine } from '@privane/engine';
import { ModelManager } from './model-manager.js';
import { getChatHtml } from './html.js';

export function bootstrapServer(port: number) {
  const app = express();
  app.use(express.json());
  app.use(cors());

  // Serve dynamic self-contained premium dashboard
  app.get('/', (req, res) => {
    res.send(getChatHtml(port));
  });

  app.get('/chat', (req, res) => {
    res.send(getChatHtml(port));
  });

  const manager = new ModelManager();

  // Serve GGUF weights statically to the browser for WebGPU local-inference
  app.use('/models', express.static(manager.getModelDirectory()));
  
  // Shared active local engine instance
  const engine = new Engine({ backend: 'cpu' }); // Fallback to CPU for command line verification


  // 1. GET /v1/models (List Cached Models)
  app.get('/v1/models', (req, res) => {
    const cached = manager.listCachedModels();
    
    // Add default fallbacks if cache is empty
    const modelList = cached.length > 0 ? cached : ['gemma-2b-instruct', 'llama-3-8b'];
    
    res.json({
      object: "list",
      data: modelList.map((modelId) => ({
        id: modelId,
        object: "model",
        created: Math.floor(Date.now() / 1000),
        owned_by: "privane"
      }))
    });
  });

  // 2. POST /v1/chat/completions (OpenAI Chat Completions API)
  app.post('/v1/chat/completions', async (req: any, res: any) => {
    const { model, messages, stream, temperature, max_tokens } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: { message: "Invalid payload: 'messages' array is required." }
      });
    }

    const selectedModel = model || "gemma-2b-instruct";
    const userPrompt = messages[messages.length - 1].content || "";
    
    console.log(`📡 Incoming request matching model [${selectedModel}]`);
    console.log(`Prompt: "${userPrompt.substring(0, 60)}${userPrompt.length > 60 ? '...' : ''}"`);

    try {
      // Lazy load model weights
      await engine.load(selectedModel);

      // A. Handles SERVER-SENT EVENTS (SSE) STREAMING
      if (stream) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no'); // Disable buffering on reverse proxies like Nginx

        const tokenStream = engine.generate({
          prompt: userPrompt,
          temperature: temperature || 0.7,
          maxTokens: max_tokens || 150
        });

        const id = `chatcmpl-${Math.random().toString(36).substring(2, 11)}`;

        for await (const token of tokenStream) {
          const payload = {
            id,
            object: "chat.completion.chunk",
            created: Math.floor(Date.now() / 1000),
            model: selectedModel,
            choices: [{
              index: 0,
              delta: { content: token },
              finish_reason: null
            }]
          };
          res.write(`data: ${JSON.stringify(payload)}\n\n`);
        }

        // Finalize SSE compliance
        const finalPayload = {
          id,
          object: "chat.completion.chunk",
          created: Math.floor(Date.now() / 1000),
          model: selectedModel,
          choices: [{
            index: 0,
            delta: {},
            finish_reason: "stop"
          }]
        };
        res.write(`data: ${JSON.stringify(finalPayload)}\n\n`);
        res.write('data: [DONE]\n\n');
        return res.end();
      }

      // B. Handles STANDARD NON-STREAMING JSON RESPONSE
      let fullResponse = "";
      const tokenStream = engine.generate({
        prompt: userPrompt,
        temperature: temperature || 0.7,
        maxTokens: max_tokens || 150
      });

      for await (const token of tokenStream) {
        fullResponse += token;
      }

      return res.json({
        id: `chatcmpl-${Math.random().toString(36).substring(2, 11)}`,
        object: "chat.completion",
        created: Math.floor(Date.now() / 1000),
        model: selectedModel,
        choices: [{
          index: 0,
          message: {
            role: "assistant",
            content: fullResponse
          },
          finish_reason: "stop"
        }],
        usage: {
          prompt_tokens: Math.round(userPrompt.length / 4),
          completion_tokens: Math.round(fullResponse.length / 4),
          total_tokens: Math.round((userPrompt.length + fullResponse.length) / 4)
        }
      });

    } catch (err: any) {
      console.error(`🚨 Inference Error: ${err.message}`);
      return res.status(500).json({
        error: { message: err.message, type: "engine_inference_error" }
      });
    }
  });

  // ==========================================
  // 3. Hosted Cloud Browser Mock Endpoints
  // ==========================================
  
  app.post('/v1/browser/goto', (req, res) => {
    const { url } = req.body;
    console.log(`🌐 Cloud Gateway: Headless Chromium navigating to: "${url}"`);
    res.json({
      status: "success",
      pageTitle: "Trending repositories on GitHub · GitHub",
      url
    });
  });

  app.post('/v1/browser/type', (req, res) => {
    const { selector, text } = req.body;
    console.log(`🌐 Cloud Gateway: Simulating keyboard input "${text}" inside selector "${selector}"`);
    res.json({ status: "success" });
  });

  app.post('/v1/browser/click', (req, res) => {
    const { selector } = req.body;
    console.log(`🌐 Cloud Gateway: Simulating click event on selector "${selector}"`);
    res.json({ status: "success" });
  });

  app.post('/v1/browser/extract', (req, res) => {
    const { schema } = req.body;
    console.log(`🌐 Cloud Gateway: Extracting DOM context...`);
    
    // Simulate DOM Accessibility Tree Pruning Algorithm
    console.log(`[DOM Pruner] Pruning structural layout nodes (<div/>, <span/>, <section/>)`);
    console.log(`[DOM Pruner] Preserved interactive items (inputs, anchors, buttons, accessibility tags)`);
    
    const originalTokens = 12400; // 48KB HTML
    const prunedTokens = 580;     // 2.3KB Pruned tree
    const savings = (((originalTokens - prunedTokens) / originalTokens) * 100).toFixed(1);
    
    console.log(`📊 [Accessibility Tree Pruned] Original HTML: 49KB (approx ${originalTokens} tokens) -> Pruned Tree: 2.3KB (${prunedTokens} tokens) | Context Savings: ${savings}%`);

    // Mock structured extraction mapping
    let mockData = {};
    if (JSON.stringify(schema).includes("repositories")) {
      mockData = {
        repositories: [
          { name: "privane/engine", description: "Sovereign local-first runtime for Gemma & Llama", stars: 1420 },
          { name: "composiohq/composio", description: "Ecosystem connectors for AI systems", stars: 8540 }
        ]
      };
    } else {
      mockData = {
        status: "success",
        extractedText: "Extracted normalized accessibility details successfully."
      };
    }

    res.json({
      status: "success",
      data: mockData
    });
  });

  app.listen(port, () => {
    console.log(`\n======================================================`);
    console.log(`🟢 PRIVANE Sovereign Local REST API running successfully`);
    console.log(`   Address: http://localhost:${port}`);
    console.log(`   OpenAI-Compatible endpoint: http://localhost:${port}/v1`);
    console.log(`======================================================\n`);
  });
}
