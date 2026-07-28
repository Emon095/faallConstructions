import { createServer } from "node:http";
import handler from "./api/contact.js";

const portArg = process.argv.indexOf("--port");
// 3002 avoids the common local Docker/preview service occupying 3001.
const port = Number(portArg >= 0 ? process.argv[portArg + 1] : process.env.PORT || 3002);

const server = createServer(async (req, res) => {
  res.status = code => {
    res.statusCode = code;
    return res;
  };
  res.json = body => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(body));
  };

  if (req.url?.split("?")[0] !== "/api/contact") {
    return res.status(404).json({ error: "Not found." });
  }

  await handler(req, res);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Faall contact API listening at http://127.0.0.1:${port}/api/contact`);
});
