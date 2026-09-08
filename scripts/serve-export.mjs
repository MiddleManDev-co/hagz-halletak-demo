// Serves the static export the way GitHub Pages does: mounted at the repository
// basePath, resolving directories to index.html, and falling back to 404.html.
// Used by the e2e suite so that basePath/trailingSlash regressions fail locally
// instead of only after a deploy.
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';

const ROOT = new URL('../out/', import.meta.url).pathname;
const BASE_PATH = '/hagz-halletak-demo';
const PORT = Number(process.env.PORT ?? 4173);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

async function resolveFile(pathname) {
  const rel = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  const candidate = join(ROOT, rel);

  try {
    const info = await stat(candidate);
    if (info.isDirectory()) {
      const index = join(candidate, 'index.html');
      await stat(index);
      return index;
    }
    return candidate;
  } catch {
    // Pages also resolves an extensionless path to its .html sibling.
    try {
      const asHtml = `${candidate}.html`;
      await stat(asHtml);
      return asHtml;
    } catch {
      return null;
    }
  }
}

const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url ?? '/', 'http://localhost');

  if (!pathname.startsWith(BASE_PATH)) {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('Not found (outside basePath)');
    return;
  }

  const inner = pathname.slice(BASE_PATH.length) || '/';
  const file = await resolveFile(inner);

  if (!file) {
    const notFound = join(ROOT, '404.html');
    res.writeHead(404, { 'content-type': TYPES['.html'] });
    createReadStream(notFound).pipe(res);
    return;
  }

  res.writeHead(200, {
    'content-type': TYPES[extname(file)] ?? 'application/octet-stream',
  });
  createReadStream(file).pipe(res);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`export served at http://127.0.0.1:${PORT}${BASE_PATH}/`);
});
