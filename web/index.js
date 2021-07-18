const path = require("path");
const express = require("express");
const uuid = require("uuid");
const Bull = require("bull");

const emailQueue = new Bull("email");
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

  emailQueue.add({
    title: "Welcome to our product",
    to: req.params.email,
    meta: {
      traceId: traceId,

      // the downstream span's parent_id is this span's span_id
      parentId: spanId,
    },
  });

  res.status(200).send("ok");
});

// Background Task Worker
emailQueue.process((job, done) => {
  const spanId = uuid.v4();
  const { traceId, parentId } = job.data.meta;

  console.log(
    "Sending email",
    `[traceId: ${traceId},`,
    `parentId: ${parentId},`,
    `spanId: ${spanId}]`
  );

  // actually send the email
  // ...

  done();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
