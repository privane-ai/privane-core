import http from 'http';

async function testLocalStream() {
  console.log("🔗 Connecting to local REST endpoint: http://localhost:8080/v1/chat/completions...");

  const payload = JSON.stringify({
    model: "gemma-2b-instruct",
    messages: [
      { role: "system", content: "You are a local helper." },
      { role: "user", content: "Explain quantum computing in simple terms." }
    ],
    stream: true,
    temperature: 0.7
  });

  const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const req = http.request(options, (res) => {
    console.log(`📡 Server status: ${res.statusCode}`);
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      // Streamed server events return as "data: { ...JSON... }"
      const lines = chunk.split('\n');
      for (const line of lines) {
        if (line.startsWith('data: ') && !line.includes('[DONE]')) {
          try {
            const data = JSON.parse(line.replace('data: ', ''));
            const content = data.choices[0]?.delta?.content || "";
            process.stdout.write(content);
          } catch (err) {
            // Ignore line parsing fragments
          }
        }
      }
    });

    res.on('end', () => {
      console.log('\n\n✓ Stream connection closed by server.');
    });
  });

  req.on('error', (e) => {
    console.error(`🚨 Connection Failed: ${e.message}`);
  });

  req.write(payload);
  req.end();
}

testLocalStream();
