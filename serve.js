#!/usr/bin/env node
"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = __dirname;
const DIST = path.join(ROOT, "dist");
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".eot": "application/vnd.ms-fontobject",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".txt": "text/plain; charset=utf-8",
};

function build() {
  try {
    console.log("[build] Running local build (node build.js --local)...");
    execSync("node build.js --local", { cwd: ROOT, stdio: "inherit" });
    return true;
  } catch (err) {
    console.error("[build] Build failed:", err.message);
    return false;
  }
}

function handleRequest(req, res) {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Normalize safe path inside DIST
  let safePath = path.normalize(path.join(DIST, pathname));
  if (!safePath.startsWith(DIST)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("403 Forbidden");
    return;
  }

  // Check if directory or file
  try {
    if (fs.existsSync(safePath)) {
      const stat = fs.statSync(safePath);
      if (stat.isDirectory()) {
        if (!pathname.endsWith("/")) {
          // Redirect to path with trailing slash so relative links work properly
          res.writeHead(301, { Location: pathname + "/" + parsedUrl.search });
          res.end();
          return;
        }
        safePath = path.join(safePath, "index.html");
      }
    } else {
      // Try appending .html
      if (fs.existsSync(safePath + ".html")) {
        safePath = safePath + ".html";
      } else if (fs.existsSync(path.join(safePath, "index.html"))) {
        if (!pathname.endsWith("/")) {
          res.writeHead(301, { Location: pathname + "/" + parsedUrl.search });
          res.end();
          return;
        }
        safePath = path.join(safePath, "index.html");
      }
    }

    if (!fs.existsSync(safePath) || !fs.statSync(safePath).isFile()) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(`<!DOCTYPE html>
<html>
<head><title>404 Not Found</title></head>
<body style="font-family: sans-serif; padding: 2rem; text-align: center;">
  <h1>404 Not Found</h1>
  <p>The requested URL <code>${pathname}</code> was not found.</p>
  <p><a href="/">Back to Home</a></p>
</body>
</html>`);
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-cache, no-store, must-revalidate",
    });

    const stream = fs.createReadStream(safePath);
    stream.pipe(res);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`500 Internal Server Error: ${err.message}`);
  }
}

function startServer(port) {
  const server = http.createServer(handleRequest);

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`[serve] Port ${port} is in use, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error("[serve] Server error:", err);
    }
  });

  server.listen(port, () => {
    console.log(`
=====================================================
  Portfolio local server is running!
  Local:   http://localhost:${port}/
=====================================================
`);
  });

  // Watch content, templates, and assets for changes
  const watchDirs = ["content", "templates", "assets"];
  let debounceTimeout = null;

  watchDirs.forEach((dir) => {
    const fullDir = path.join(ROOT, dir);
    if (fs.existsSync(fullDir)) {
      try {
        fs.watch(fullDir, { recursive: true }, (eventType, filename) => {
          if (debounceTimeout) clearTimeout(debounceTimeout);
          debounceTimeout = setTimeout(() => {
            console.log(`[watch] Change detected in ${dir}/${filename || ""}, rebuilding...`);
            build();
          }, 200);
        });
      } catch (e) {
        // recursive watch may not be supported in all environments
      }
    }
  });
}

// Initial build then start
build();
startServer(DEFAULT_PORT);
