const path = require("path");
const express = require("express");
const uuid = require("uuid");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.post("/api/v1/inviteUser", (req, res) => {
  const spanId = uuid.v4(),
    traceId = req.headers["trace-id"],
    parentId = req.headers["parent-id"];

  console.log(
    "Adding job to email queue",
    `[traceId: ${traceId},`,
    `parentId: ${parentId},`,
    `spanId: ${spanId}]`
  );

  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
