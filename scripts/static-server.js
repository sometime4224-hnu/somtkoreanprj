const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 4173);
const rootDir = path.resolve(__dirname, '..');

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.m4a': 'audio/mp4',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.webp': 'image/webp'
};

function send(response, statusCode, body, type = 'text/plain; charset=utf-8') {
  response.writeHead(statusCode, {
    'Content-Type': type,
    'Cache-Control': 'no-store'
  });
  response.end(body);
}

function resolvePath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split('?')[0]);
  const candidatePath = path.resolve(rootDir, `.${decodedPath}`);
  if (!candidatePath.startsWith(rootDir)) return null;
  return candidatePath;
}

const server = http.createServer((request, response) => {
  const requestPath = request.url === '/' ? '/index.html' : request.url;
  const filePath = resolvePath(requestPath);

  if (!filePath) {
    send(response, 403, 'Forbidden');
    return;
  }

  let finalPath = filePath;
  if (fs.existsSync(finalPath) && fs.statSync(finalPath).isDirectory()) {
    finalPath = path.join(finalPath, 'index.html');
  }

  if (!fs.existsSync(finalPath) || !fs.statSync(finalPath).isFile()) {
    send(response, 404, 'Not found');
    return;
  }

  const extension = path.extname(finalPath).toLowerCase();
  const contentType = contentTypes[extension] || 'application/octet-stream';
  fs.createReadStream(finalPath)
    .on('open', () => {
      response.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-store'
      });
    })
    .on('error', () => {
      if (!response.headersSent) {
        send(response, 500, 'Internal server error');
      } else {
        response.destroy();
      }
    })
    .pipe(response);
});

server.listen(port, host, () => {
  console.log(`Static server running at http://${host}:${port}`);
});
