import { readFile } from "fs/promises";
import http from "http";
import https from "https";

import { RewriteFrames } from "@sentry/integrations";
import * as Sentry from "@sentry/node";
import express, { RequestHandler } from "express";
import fetch from "node-fetch";

import { handleEnd } from "./controllers/handleEnd";
import { handleIndex } from "./controllers/handleIndex";
import { handleMove } from "./controllers/handleMove";
import { handleStart } from "./controllers/handleStart";
import { logHandler } from "./utils/logHandler";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  integrations: [
    new RewriteFrames({
      root: global.__dirname,
    }),
  ],
});

const app = express();

const url = process.env.DEBUG_HOOK;

(async () => {
  app.use(express.json() as RequestHandler);

  app.get("/", handleIndex);
  app.post("/start", handleStart);
  app.post("/move", handleMove);
  app.post("/end", handleEnd);

  const httpServer = http.createServer(app);

  httpServer.listen(1080, () => {
    logHandler.log("http", "http server listening on port 1080");
    if (url) {
      void fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: "Battlesnake HTTP online!" }),
      });
    }
  });

  if (process.env.NODE_ENV === "production") {
    const privateKey = await readFile(
      "/etc/letsencrypt/live/battlesnake.nhcarrigan.com/privkey.pem",
      "utf8"
    );
    const certificate = await readFile(
      "/etc/letsencrypt/live/battlesnake.nhcarrigan.com/cert.pem",
      "utf8"
    );
    const ca = await readFile(
      "/etc/letsencrypt/live/battlesnake.nhcarrigan.com/chain.pem",
      "utf8"
    );

    const credentials = {
      key: privateKey,
      cert: certificate,
      ca: ca,
    };

    const httpsServer = https.createServer(credentials, app);

    httpsServer.listen(1443, () => {
      logHandler.log("http", "https server listening on port 1443");
      if (url) {
        void fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: "Battlesnake HTTPS online!" }),
        });
      }
    });
  }
})();

export default app;
