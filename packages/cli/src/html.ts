export function getChatHtml(port: number): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privane Sovereign Local Chat UI</title>
  <!-- Modern Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Inter:wght@400;500;600&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <style>
    /* -------------------------------------------------- */
    /* Design Tokens & Variables                          */
    /* -------------------------------------------------- */
    :root {
      --bg-app: #080911;
      --bg-gradient: radial-gradient(circle at 50% 0%, #15122e 0%, #080911 75%);
      --bg-sidebar: rgba(13, 14, 28, 0.85);
      --bg-glass-card: rgba(18, 19, 38, 0.55);
      --border-glass: rgba(255, 255, 255, 0.06);
      --border-active: rgba(139, 92, 246, 0.4);
      --accent-purple: #8b5cf6;
      --accent-purple-gradient: linear-gradient(135deg, #a78bfa, #7c3aed);
      --accent-cyan: #06b6d4;
      --accent-cyan-gradient: linear-gradient(135deg, #22d3ee, #0891b2);
      --accent-emerald: #10b981;
      --accent-emerald-gradient: linear-gradient(135deg, #34d399, #059669);
      --accent-rose: #f43f5e;
      --text-primary: #f3f4f6;
      --text-secondary: #9ca3af;
      --text-muted: #6b7280;
      
      --glow-purple: 0 0 20px rgba(139, 92, 246, 0.25);
      --glow-cyan: 0 0 20px rgba(6, 182, 212, 0.25);
      --shadow-premium: 0 10px 30px rgba(0, 0, 0, 0.5);
      --transition-standard: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* -------------------------------------------------- */
    /* Global Resets & App Layout                        */
    /* -------------------------------------------------- */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: var(--bg-app);
      background-image: var(--bg-gradient);
      color: var(--text-primary);
      height: 100vh;
      display: flex;
      overflow: hidden;
      -webkit-font-smoothing: antialiased;
    }

    a {
      color: var(--accent-purple);
      text-decoration: none;
    }

    /* -------------------------------------------------- */
    /* Sidebar / Configuration Left Column                */
    /* -------------------------------------------------- */
    .sidebar {
      width: 320px;
      background-color: var(--bg-sidebar);
      border-right: 1px solid var(--border-glass);
      backdrop-filter: blur(20px);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      z-index: 10;
    }

    .sidebar-header {
      padding: 24px;
      border-bottom: 1px solid var(--border-glass);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-container {
      background: var(--accent-purple-gradient);
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--glow-purple);
    }

    .logo-icon {
      width: 20px;
      height: 20px;
      fill: #ffffff;
    }

    .logo-text {
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      font-size: 20px;
      letter-spacing: 0.5px;
      background: linear-gradient(135deg, #ffffff 30%, #a78bfa 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .sidebar-scrollable {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .config-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .config-label {
      font-family: 'Outfit', sans-serif;
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .config-select, .config-input, .config-textarea {
      background-color: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border-glass);
      border-radius: 8px;
      color: var(--text-primary);
      padding: 10px 12px;
      font-size: 14px;
      font-family: inherit;
      width: 100%;
      outline: none;
      transition: var(--transition-standard);
    }

    .config-select:focus, .config-input:focus, .config-textarea:focus {
      border-color: var(--accent-purple);
      box-shadow: 0 0 10px rgba(139, 92, 246, 0.15);
      background-color: rgba(255, 255, 255, 0.05);
    }

    .slider-container {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .slider-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .slider-value {
      font-family: 'Fira Code', monospace;
      font-size: 12px;
      color: var(--accent-purple);
      background-color: rgba(139, 92, 246, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
    }

    .slider-control {
      -webkit-appearance: none;
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background: rgba(255, 255, 255, 0.08);
      outline: none;
    }

    .slider-control::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--accent-purple);
      cursor: pointer;
      box-shadow: var(--glow-purple);
      transition: var(--transition-standard);
    }

    .slider-control::-webkit-slider-thumb:hover {
      transform: scale(1.2);
    }

    /* -------------------------------------------------- */
    /* Telemetry / Performance Dashboard Panel            */
    /* -------------------------------------------------- */
    .telemetry-card {
      background: var(--bg-glass-card);
      border: 1px solid var(--border-glass);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: var(--shadow-premium);
    }

    .telemetry-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    }

    .telemetry-row:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .telemetry-item-label {
      font-size: 12px;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .telemetry-item-val {
      font-family: 'Fira Code', monospace;
      font-size: 12px;
      font-weight: 500;
      color: var(--text-primary);
    }

    .telemetry-item-val.highlight {
      color: var(--accent-cyan);
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 600;
      background-color: rgba(16, 185, 129, 0.1);
      color: var(--accent-emerald);
      padding: 4px 8px;
      border-radius: 100px;
      border: 1px solid rgba(16, 185, 129, 0.2);
    }

    .status-badge .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--accent-emerald);
      box-shadow: 0 0 8px var(--accent-emerald);
      animation: pulse 1.8s infinite;
    }

    /* -------------------------------------------------- */
    /* Log Terminal Overlay                               */
    /* -------------------------------------------------- */
    .terminal-ticker {
      margin-top: auto;
      padding: 16px 24px;
      border-top: 1px solid var(--border-glass);
      background-color: rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .terminal-ticker-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.5px;
      color: var(--text-muted);
      text-transform: uppercase;
    }

    .terminal-viewport {
      height: 65px;
      overflow-y: auto;
      font-family: 'Fira Code', monospace;
      font-size: 10.5px;
      color: var(--accent-cyan);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .terminal-line {
      opacity: 0.8;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .terminal-line.success {
      color: var(--accent-emerald);
    }

    .terminal-line.info {
      color: var(--text-secondary);
    }

    /* -------------------------------------------------- */
    /* Chat Workspace Area                                */
    /* -------------------------------------------------- */
    .chat-workspace {
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      position: relative;
    }

    .chat-header {
      height: 68px;
      border-bottom: 1px solid var(--border-glass);
      padding: 0 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      backdrop-filter: blur(20px);
      z-index: 5;
    }

    .chat-header-title {
      font-family: 'Outfit', sans-serif;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .header-tag {
      font-size: 11px;
      background-color: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-glass);
      border-radius: 4px;
      padding: 2px 6px;
      color: var(--text-secondary);
      font-family: 'Fira Code', monospace;
    }

    .clear-history-btn {
      background: transparent;
      border: 1px solid var(--border-glass);
      color: var(--text-secondary);
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-family: inherit;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: var(--transition-standard);
    }

    .clear-history-btn:hover {
      background-color: rgba(244, 63, 94, 0.1);
      border-color: rgba(244, 63, 94, 0.2);
      color: var(--accent-rose);
    }

    .messages-container {
      flex: 1;
      overflow-y: auto;
      padding: 40px 32px;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    /* -------------------------------------------------- */
    /* Conversation Bubbles                              */
    /* -------------------------------------------------- */
    .message-row {
      display: flex;
      gap: 16px;
      max-width: 85%;
      animation: fadeInSlide 0.3s ease-out forwards;
    }

    .message-row.user {
      align-self: flex-end;
      flex-direction: row-reverse;
    }

    .message-row.assistant {
      align-self: flex-start;
    }

    .avatar {
      width: 38px;
      height: 38px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: var(--shadow-premium);
    }

    .message-row.user .avatar {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid var(--border-glass);
    }

    .message-row.assistant .avatar {
      background: var(--accent-purple-gradient);
      box-shadow: var(--glow-purple);
    }

    .avatar-icon {
      width: 20px;
      height: 20px;
      fill: #ffffff;
    }

    .bubble {
      padding: 16px 20px;
      border-radius: 12px;
      font-size: 14.5px;
      line-height: 1.6;
      box-shadow: var(--shadow-premium);
    }

    .message-row.user .bubble {
      background-color: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-glass);
      color: var(--text-primary);
      border-top-right-radius: 0;
    }

    .message-row.assistant .bubble {
      background: var(--bg-glass-card);
      border: 1px solid var(--border-glass);
      color: var(--text-primary);
      border-top-left-radius: 0;
    }

    /* -------------------------------------------------- */
    /* Empty State View                                   */
    /* -------------------------------------------------- */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-align: center;
      padding: 0 40px;
    }

    .empty-icon-box {
      width: 80px;
      height: 80px;
      background: var(--bg-glass-card);
      border: 1px solid var(--border-glass);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
      box-shadow: var(--shadow-premium);
    }

    .empty-title {
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      font-size: 26px;
      margin-bottom: 12px;
      background: linear-gradient(135deg, #ffffff 40%, #c084fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .empty-subtitle {
      font-size: 14.5px;
      color: var(--text-secondary);
      max-width: 500px;
      line-height: 1.5;
      margin-bottom: 32px;
    }

    .suggestions-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      max-width: 580px;
      width: 100%;
    }

    .suggestion-card {
      background: var(--bg-glass-card);
      border: 1px solid var(--border-glass);
      border-radius: 12px;
      padding: 16px;
      text-align: left;
      cursor: pointer;
      transition: var(--transition-standard);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .suggestion-card:hover {
      border-color: var(--border-active);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(139, 92, 246, 0.1);
    }

    .suggestion-title {
      font-weight: 600;
      font-size: 13.5px;
      color: var(--accent-purple);
      font-family: 'Outfit', sans-serif;
    }

    .suggestion-text {
      font-size: 12.5px;
      color: var(--text-secondary);
      line-height: 1.4;
    }

    /* -------------------------------------------------- */
    /* Input Container & Form                             */
    /* -------------------------------------------------- */
    .input-wrapper {
      padding: 24px 32px 32px 32px;
      backdrop-filter: blur(20px);
      border-top: 1px solid var(--border-glass);
      z-index: 5;
    }

    .input-form {
      background-color: var(--bg-glass-card);
      border: 1px solid var(--border-glass);
      border-radius: 14px;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: var(--shadow-premium);
      transition: var(--transition-standard);
    }

    .input-form:focus-within {
      border-color: var(--border-active);
      box-shadow: var(--glow-purple), var(--shadow-premium);
    }

    .textarea-chat {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: var(--text-primary);
      font-size: 14px;
      line-height: 1.5;
      font-family: inherit;
      resize: none;
      height: 38px;
      max-height: 120px;
      padding-top: 8px;
    }

    .send-btn {
      background: var(--accent-purple-gradient);
      border: none;
      outline: none;
      width: 38px;
      height: 38px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: var(--glow-purple);
      transition: var(--transition-standard);
      flex-shrink: 0;
    }

    .send-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 0 25px rgba(139, 92, 246, 0.45);
    }

    .send-btn:disabled {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-glass);
      color: var(--text-muted);
      cursor: not-allowed;
      box-shadow: none;
      transform: none;
    }

    .send-icon {
      width: 18px;
      height: 18px;
      fill: #ffffff;
    }

    .privacy-notice {
      text-align: center;
      font-size: 11px;
      color: var(--text-muted);
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }

    /* -------------------------------------------------- */
    /* Markdown Syntax Formatting Styles                  */
    /* -------------------------------------------------- */
    .bubble p {
      margin-bottom: 12px;
    }
    
    .bubble p:last-child {
      margin-bottom: 0;
    }

    .bubble strong {
      color: #ffffff;
      font-weight: 600;
    }

    .bubble ul {
      margin-left: 20px;
      margin-bottom: 12px;
    }

    .bubble li {
      margin-bottom: 6px;
    }

    .inline-code {
      background-color: rgba(255, 255, 255, 0.08);
      font-family: 'Fira Code', monospace;
      font-size: 13px;
      padding: 2px 6px;
      border-radius: 4px;
      color: var(--accent-cyan);
    }

    .code-container {
      background-color: #0b0c16;
      border: 1px solid var(--border-glass);
      border-radius: 8px;
      margin: 14px 0;
      overflow: hidden;
      box-shadow: var(--shadow-premium);
    }

    .code-header {
      background-color: rgba(255, 255, 255, 0.03);
      padding: 8px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    }

    .code-lang {
      font-family: 'Outfit', sans-serif;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--text-secondary);
      letter-spacing: 0.5px;
    }

    .copy-btn {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: var(--text-secondary);
      font-size: 11px;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
      font-family: inherit;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: var(--transition-standard);
    }

    .copy-btn:hover {
      background-color: rgba(255, 255, 255, 0.04);
      color: #ffffff;
      border-color: rgba(255, 255, 255, 0.15);
    }

    .code-container pre {
      padding: 16px;
      overflow-x: auto;
      font-family: 'Fira Code', monospace;
      font-size: 13px;
      line-height: 1.5;
      color: #e5e7eb;
    }

    /* -------------------------------------------------- */
    /* Telemetry indicators                               */
    /* -------------------------------------------------- */
    .stream-cursor {
      display: inline-block;
      width: 6px;
      height: 15px;
      background-color: var(--accent-purple);
      margin-left: 2px;
      vertical-align: middle;
      animation: cursorBlink 0.8s infinite;
    }

    /* -------------------------------------------------- */
    /* Keyframe Animations                                */
    /* -------------------------------------------------- */
    @keyframes fadeInSlide {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
      }
      70% {
        box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
      }
    }

    @keyframes cursorBlink {
      50% { opacity: 0; }
    }
  </style>
</head>
<body>

  <!-- Sidebar Column -->
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="logo-container">
        <!-- Shield Icon SVG -->
        <svg class="logo-icon" viewBox="0 0 24 24">
          <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 2.18l6 2.25v4.88c0 4.14-2.73 8-6 8.95-3.27-.95-6-4.81-6-8.95v-4.88l6-2.25z"/>
        </svg>
      </div>
      <div class="logo-text">PRIVANE</div>
    </div>
    
    <div class="sidebar-scrollable">
      <!-- Connection Status Card -->
      <div class="telemetry-card">
        <div class="telemetry-row">
          <div class="telemetry-item-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--text-secondary)">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            System Status
          </div>
          <div class="status-badge">
            <span class="dot"></span>
            ACTIVE
          </div>
        </div>
        <div class="telemetry-row">
          <div class="telemetry-item-label">Local Bound</div>
          <div class="telemetry-item-val" style="color: var(--accent-emerald);">100% Isolated</div>
        </div>
        <div class="telemetry-row">
          <div class="telemetry-item-label">Server Port</div>
          <div class="telemetry-item-val">${port}</div>
        </div>
      </div>

      <!-- Settings Configurations -->
      <div class="config-group">
        <label class="config-label" for="model-selector">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--text-secondary)">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
          </svg>
          Active LLM Model
        </label>
        <select id="model-selector" class="config-select">
          <option value="gemma-2b-instruct">gemma-2b-instruct (Cached)</option>
        </select>
      </div>

      <div class="config-group">
        <label class="config-label">Inference Controls</label>
        
        <div class="slider-container">
          <div class="slider-header">
            <span style="font-size: 12px; color: var(--text-secondary);">Temperature</span>
            <span id="temp-val" class="slider-value">0.7</span>
          </div>
          <input type="range" id="temp-slider" class="slider-control" min="0.1" max="1.5" step="0.1" value="0.7">
        </div>

        <div class="slider-container" style="margin-top: 12px;">
          <div class="slider-header">
            <span style="font-size: 12px; color: var(--text-secondary);">Max Tokens</span>
            <span id="max-tokens-val" class="slider-value">250</span>
          </div>
          <input type="range" id="max-tokens-slider" class="slider-control" min="50" max="1500" step="50" value="250">
        </div>
      </div>

      <div class="config-group">
        <label class="config-label" for="system-prompt">System Context</label>
        <textarea id="system-prompt" class="config-textarea" rows="4">You are Privane, a sovereign local-first AI assistant. You run completely offline on the user's local machine using WebGPU hardware acceleration.</textarea>
      </div>

      <!-- Realtime Telemetry Panel -->
      <div class="config-group">
        <label class="config-label">Silicon Telemetry</label>
        <div class="telemetry-card">
          <div class="telemetry-row">
            <div class="telemetry-item-label">Generation Velocity</div>
            <div id="telemetry-speed" class="telemetry-item-val highlight">0.0 t/s</div>
          </div>
          <div class="telemetry-row">
            <div class="telemetry-item-label">Time to First Token</div>
            <div id="telemetry-ttft" class="telemetry-item-val">0ms</div>
          </div>
          <div class="telemetry-row">
            <div class="telemetry-item-label">Context Tokens</div>
            <div id="telemetry-tokens" class="telemetry-item-val">0</div>
          </div>
          <div class="telemetry-row">
            <div class="telemetry-item-label">Hardware Acceleration</div>
            <div class="telemetry-item-val">Local Silicon</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scrollable Live Logging Component -->
    <div class="terminal-ticker">
      <div class="terminal-ticker-header">
        <span>Local Execution Logs</span>
        <span style="color: var(--accent-cyan);">Daemon</span>
      </div>
      <div id="terminal-viewport" class="terminal-viewport">
        <div class="terminal-line info">[12:17:26] Core: Handshook with host</div>
        <div class="terminal-line success">[12:17:26] Server: Listening on port ${port}</div>
      </div>
    </div>
  </aside>

  <!-- Main Chat Workspace -->
  <main class="chat-workspace">
    <!-- Chat Top Header -->
    <header class="chat-header">
      <div class="chat-header-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--accent-purple)">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
        </svg>
        <span>Sovereign Local Arena</span>
        <span id="active-model-header" class="header-tag">gemma-2b-instruct</span>
      </div>
      <button class="clear-history-btn" id="clear-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
        </svg>
        Clear Arena
      </button>
    </header>

    <!-- Chat Messages Viewport -->
    <div class="messages-container" id="messages-container">
      <!-- Empty State -->
      <div class="empty-state" id="empty-state">
        <div class="empty-icon-box">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--accent-purple)">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" style="display:none;"/>
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
          </svg>
        </div>
        <h2 class="empty-title">Sovereign Local Chat</h2>
        <p class="empty-subtitle">Chat directly with weights stored locally on your machine. Zero outbound connections, zero tracking, total privacy.</p>
        
        <div class="suggestions-grid">
          <div class="suggestion-card" onclick="selectSuggestion('Explain quantum computing in simple, direct terms.')">
            <span class="suggestion-title">Explain Concept</span>
            <span class="suggestion-text">"Explain quantum computing in simple, direct terms."</span>
          </div>
          <div class="suggestion-card" onclick="selectSuggestion('Write a beautiful, glassmorphic card component using Vanilla CSS.')">
            <span class="suggestion-title">Write Code</span>
            <span class="suggestion-text">"Write a beautiful, glassmorphic CSS card component."</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Input Section -->
    <div class="input-wrapper">
      <form class="input-form" id="chat-form">
        <textarea class="textarea-chat" id="chat-input" placeholder="Type a message to chat with local model weights..." required></textarea>
        <button class="send-btn" id="send-button" type="submit">
          <svg class="send-icon" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </form>
      <div class="privacy-notice">
        <!-- Shield Micro-icon -->
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 15l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z"/>
        </svg>
        Local-first telemetry. Data stays secure on device.
      </div>
    </div>
  </main>

  <!-- -------------------------------------------------- -->
  <!-- Client Side Interactive Controller Logic           -->
  <!-- -------------------------------------------------- -->
  <script>
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const messagesContainer = document.getElementById('messages-container');
    const emptyState = document.getElementById('empty-state');
    const modelSelector = document.getElementById('model-selector');
    const activeModelHeader = document.getElementById('active-model-header');
    
    // Sliders
    const tempSlider = document.getElementById('temp-slider');
    const tempVal = document.getElementById('temp-val');
    const maxTokensSlider = document.getElementById('max-tokens-slider');
    const maxTokensVal = document.getElementById('max-tokens-val');
    const systemPrompt = document.getElementById('system-prompt');
    const clearBtn = document.getElementById('clear-btn');
    
    // Telemetry Elements
    const teleSpeed = document.getElementById('telemetry-speed');
    const teleTtft = document.getElementById('telemetry-ttft');
    const teleTokens = document.getElementById('telemetry-tokens');
    const terminalViewport = document.getElementById('terminal-viewport');

    let conversationHistory = [];

    // Slider Event Listeners
    tempSlider.addEventListener('input', (e) => {
      tempVal.textContent = parseFloat(e.target.value).toFixed(1);
    });
    maxTokensSlider.addEventListener('input', (e) => {
      maxTokensVal.textContent = e.target.value;
    });

    // Handle dropdown select
    modelSelector.addEventListener('change', (e) => {
      activeModelHeader.textContent = e.target.value;
      logToTerminal('Config: Active model changed to ' + e.target.value, 'info');
    });

    clearBtn.addEventListener('click', () => {
      conversationHistory = [];
      messagesContainer.innerHTML = '';
      messagesContainer.appendChild(emptyState);
      emptyState.style.display = 'flex';
      
      // Reset telemetry
      teleSpeed.textContent = '0.0 t/s';
      teleTtft.textContent = '0ms';
      teleTokens.textContent = '0';
      
      logToTerminal('Core: Conversation context flushed.', 'info');
    });

    // Populate Models list on page load
    async function loadModels() {
      try {
        logToTerminal('API: Fetching active local models list...', 'info');
        const response = await fetch('/v1/models');
        if (!response.ok) throw new Error('Models call failed');
        
        const payload = await response.json();
        
        // Clear selector
        modelSelector.innerHTML = '';
        
        if (payload.data && payload.data.length > 0) {
          payload.data.forEach(model => {
            const opt = document.createElement('option');
            opt.value = model.id;
            opt.textContent = model.id + ' (Cached)';
            modelSelector.appendChild(opt);
          });
          modelSelector.value = payload.data[0].id;
          activeModelHeader.textContent = payload.data[0].id;
          logToTerminal('API: Discovered ' + payload.data.length + ' cached models.', 'success');
        } else {
          // Fallbacks
          const opt = document.createElement('option');
          opt.value = 'gemma-2b-instruct';
          opt.textContent = 'gemma-2b-instruct';
          modelSelector.appendChild(opt);
        }
      } catch (err) {
        logToTerminal('Error: Failed to fetch /v1/models: ' + err.message, 'error');
      }
    }
    
    loadModels();

    function logToTerminal(message, type = 'info') {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const div = document.createElement('div');
      div.className = 'terminal-line ' + type;
      div.textContent = '[' + timeStr + '] ' + message;
      terminalViewport.appendChild(div);
      terminalViewport.scrollTop = terminalViewport.scrollHeight;
    }

    function selectSuggestion(text) {
      chatInput.value = text;
      chatInput.focus();
    }

    // Auto resize textarea
    chatInput.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight - 4) + 'px';
    });

    // Enter key submits prompt, Shift+Enter adds newline
    chatInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event('submit'));
      }
    });

    // Send Button action handler
    chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const prompt = chatInput.value.trim();
      if (!prompt) return;

      // Clear input & reset height
      chatInput.value = '';
      chatInput.style.height = '38px';
      
      // Remove empty state if present
      if (emptyState.style.display !== 'none') {
        emptyState.style.display = 'none';
      }

      // Add user message bubble
      appendMessage('user', prompt);
      
      // Update historical logs
      conversationHistory.push({ role: 'user', content: prompt });
      
      // Prepare assistant bubble placeholder
      const bubbleId = 'bot-' + Math.random().toString(36).substring(2, 9);
      const assistantBubble = appendMessage('assistant', '', bubbleId);
      
      // Lock buttons
      chatInput.disabled = true;
      sendButton.disabled = true;
      
      logToTerminal('Inference: Starting local completions for prompt...', 'info');

      try {
        const model = modelSelector.value;
        const temperature = parseFloat(tempSlider.value);
        const maxTokens = parseInt(maxTokensSlider.value, 10);
        
        // Context construction with System prompt
        const systemMsg = { role: 'system', content: systemPrompt.value };
        const payloadMessages = [systemMsg, ...conversationHistory];

        // Telemetry tracking parameters
        const startTime = performance.now();
        let firstTokenReceived = false;
        let ttft = 0;
        let tokenCount = 0;
        
        const response = await fetch('/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model,
            messages: payloadMessages,
            stream: true,
            temperature,
            max_tokens: maxTokens
          })
        });

        if (!response.ok) {
          throw new Error('Local server responded with ' + response.status);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let done = false;
        let rawAccumulator = '';
        let markdownContent = '';

        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            const chunk = decoder.decode(value, { stream: !done });
            rawAccumulator += chunk;
            
            // Split chunks by Server Sent Events line markers
            const lines = rawAccumulator.split('\\n');
            // Keep last element in case it's incomplete
            rawAccumulator = lines.pop() || '';

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed) continue;
              if (trimmed === 'data: [DONE]') {
                done = true;
                break;
              }
              if (trimmed.startsWith('data: ')) {
                try {
                  const dataStr = trimmed.substring(6);
                  const parsed = JSON.parse(dataStr);
                  const delta = parsed.choices[0]?.delta?.content || '';
                  
                  if (delta) {
                    if (!firstTokenReceived) {
                      firstTokenReceived = true;
                      ttft = Math.round(performance.now() - startTime);
                      teleTtft.textContent = ttft + 'ms';
                      logToTerminal('Inference: TTFT loaded in ' + ttft + 'ms.', 'success');
                    }
                    
                    markdownContent += delta;
                    tokenCount++;
                    
                    // Live render formatted bubbles
                    assistantBubble.innerHTML = formatResponse(markdownContent) + '<span class="stream-cursor"></span>';
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;

                    // Telemetry Speed Calculator
                    const elapsedSec = (performance.now() - startTime) / 1000;
                    if (elapsedSec > 0) {
                      const speed = (tokenCount / elapsedSec).toFixed(1);
                      teleSpeed.textContent = speed + ' t/s';
                    }
                  }
                } catch (jsonErr) {
                  // Buffer fragmentation skip
                }
              }
            }
          }
        }

        // Clean trailing cursor and apply final markdown formatting pass
        const cursor = assistantBubble.querySelector('.stream-cursor');
        if (cursor) cursor.remove();
        assistantBubble.innerHTML = formatResponse(markdownContent);
        
        // Add response to conversational context history
        conversationHistory.push({ role: 'assistant', content: markdownContent });
        
        // Finalize telemetry gauges
        const totalDuration = ((performance.now() - startTime) / 1000).toFixed(2);
        teleTokens.textContent = conversationHistory.length * 20 + tokenCount; // simple approximate token length
        
        logToTerminal('Inference: Completed generation. Total time: ' + totalDuration + 's. Output tokens: ' + tokenCount, 'success');

      } catch (err) {
        logToTerminal('Error: Inference failure - ' + err.message, 'error');
        assistantBubble.innerHTML = '<span style="color: var(--accent-rose); font-weight: 500;">🚨 Local Inference Connection Loss:</span> ' + err.message + '<br><small style="color: var(--text-muted);">Please make sure \'privane serve\' is running in your terminal.</small>';
      } finally {
        chatInput.disabled = false;
        sendButton.disabled = false;
        chatInput.focus();
      }
    });

    function appendMessage(role, content, customId = '') {
      const row = document.createElement('div');
      row.className = 'message-row ' + role;
      
      const avatar = document.createElement('div');
      avatar.className = 'avatar';
      
      // SVGs inside avatars
      if (role === 'user') {
        avatar.innerHTML = '<svg class="avatar-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>';
      } else {
        avatar.innerHTML = '<svg class="avatar-icon" viewBox="0 0 24 24"><path d="M12 2c1.1 0 2 .9 2 2v1c2.76 0 5 2.24 5 5v8c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V9c0-2.76 2.24-5 5-5V4c0-1.1.9-2 2-2zm0 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5-4V17h10V9.5c0-1.93-1.57-3.5-3.5-3.5h-3C8.57 6 7 7.57 7 9.5z"/></svg>';
      }

      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      if (customId) {
        bubble.id = customId;
      }
      
      bubble.innerHTML = formatResponse(content);
      
      row.appendChild(avatar);
      row.appendChild(bubble);
      messagesContainer.appendChild(row);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      
      return bubble;
    }

    // High fidelity markdown code renderer for bubbles
    function formatResponse(text) {
      if (!text) return '';

      // Escape HTML tags to prevent XSS issues inside output
      let escaped = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // 1. Triple-backtick code block formatting blocks
      // We construct regex dynamically to avoid backtick literal compilation errors
      const codeBlockRegex = new RegExp('\\u0060\\u0060\\u0060([a-zA-Z0-9-]*)\\n([\\s\\S]*?)\\u0060\\u0060\\u0060', 'g');
      escaped = escaped.replace(codeBlockRegex, (match, lang, code) => {
        const displayLang = lang || 'code';
        const cleanCode = code.trim();
        return '<div class="code-container">' +
          '<div class="code-header">' +
            '<span class="code-lang">' + displayLang + '</span>' +
            '<button class="copy-btn" onclick="copyCode(this)">' +
              '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">' +
                '<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>' +
              '</svg>' +
              ' Copy' +
            '</button>' +
          '</div>' +
          '<pre><code>' + cleanCode + '</code></pre>' +
        '</div>';
      });

      // 2. Inline code snippets
      const inlineCodeRegex = new RegExp('\\u0060([^\\u0060\\n]+)\\u0060', 'g');
      escaped = escaped.replace(inlineCodeRegex, '<code class="inline-code">$1</code>');

  // 3. Bold text markdown format
  escaped = escaped.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');

  // 4. Split and parse lines for Lists and Paragraphs
  const lines = escaped.split('\n');
  let insideList = false;
  let outputLines = [];

  for (let line of lines) {
    const trimmed = line.trim();

    // Bullet Lists checking
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!insideList) {
        insideList = true;
        outputLines.push('<ul>');
      }
      outputLines.push('<li>' + trimmed.substring(2) + '</li>');
    } else {
      if (insideList) {
        insideList = false;
        outputLines.push('</ul>');
      }

      if (trimmed.length > 0) {
        // Keep container wrappers intact, don't wrap code structural containers in paragraph tags
        if (trimmed.startsWith('<div') || trimmed.startsWith('</div') || trimmed.startsWith('<pre') || trimmed.startsWith('</pre') || trimmed.startsWith('<ul') || trimmed.startsWith('</ul') || trimmed.startsWith('<li')) {
          outputLines.push(line);
        } else {
          outputLines.push('<p>' + line + '</p>');
        }
      } else {
        outputLines.push('');
      }
    }
  }

  if (insideList) {
    outputLines.push('</ul>');
  }

  return outputLines.join('\n');
}

// Static code clipboards copier
function copyCode(btn) {
  const container = btn.closest('.code-container');
  const pre = container.querySelector('pre');
  const codeText = pre.textContent;

  navigator.clipboard.writeText(codeText).then(() => {
    const originalText = btn.innerHTML;
    btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Copied!';
    btn.style.color = 'var(--accent-emerald)';
    btn.style.borderColor = 'rgba(16, 185, 129, 0.3)';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 2000);
  });
}
</script>
  </body>
  </html>`;
}
