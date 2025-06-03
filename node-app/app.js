const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// Serve static CSS files (if any in future)
app.use(express.static('public'));

app.get('/', (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Node.js Docker App</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(to right, #667eea, #764ba2);
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        text-align: center;
      }
      .container {
        background: rgba(0, 0, 0, 0.2);
        padding: 2rem 3rem;
        border-radius: 16px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      }
      h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
      }
      p {
        font-size: 1.25rem;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>🚀 Welcome to Node.js Docker App</h1>
      <p>This application is running in a Docker container on port ${PORT}.</p>
    </div>
  </body>
  </html>
  `;
  res.send(html);
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});
app.get('/metrics', (req, res) => {
  // Example of Prometheus metrics format
  const metrics = `
# HELP node_app_requests_total The total number of requests
# TYPE node_app_requests_total counter
node_app_requests_total 42

# HELP node_app_uptime_seconds The uptime of the Node.js process in seconds
# TYPE node_app_uptime_seconds gauge
node_app_uptime_seconds ${process.uptime().toFixed(0)}
  `.trim();

  res.set('Content-Type', 'text/plain; version=0.0.4');
  res.send(metrics);
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
