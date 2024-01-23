const { createServer } = require("http");
const { parse } = require("url");
const { join } = require("path");
const { exec } = require("child_process");

const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname === "/start-nextjs") {
      // Run 'npm run start' when accessing /start-nextjs
      exec("npm run start", (error, stdout, stderr) => {
        if (error) {
          console.error(`Error starting Next.js: ${error}`);
          res.statusCode = 500;
          res.end("Error starting Next.js");
          return;
        }

        console.log(`Next.js server started. Output: ${stdout}`);
        res.statusCode = 200;
        res.end("Next.js server started");
      });
    } else {
      // Handle other requests with Next.js
      handle(req, res, parsedUrl);
    }
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
