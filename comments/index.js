const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
// forgot what do we use bodyparser for
app.use(bodyParser.json());
// pass this as a middle ware to the ideas server
app.use(cors());

const commentsByIdeaId = {};

// we need get and post comments routes
// we need something like
// /ideas/:id/comments
app.get("/ideas/:id/comments", (req, res) => {
  res.send(commentsByIdeaId[req.params.id] || []);
});

app.post("/ideas/:id/comments", async (req, res) => {
  // need unique id to store the comments
  // this id is different from the id that is passed in the route
  const commentId = randomBytes(4).toString("hex");

  // pull out the content that is sent on the request
  const { content } = req.body;
  console.log("CONTENT IN REQUEST", content);

  // if the commentsByIdeaId gives undefined then set that to empty array[]
  const comments = commentsByIdeaId[req.params.id] || [];

  // add the comments into an array
  // adding the status property after moderation was introduced
  comments.push({ id: commentId, content, status: "pending" });

  // send an EVENT to EVENT BUS that a comment was created
  // send the event data along with the event
  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      ideaId: req.params.id,
      status: "pending",
    },
  });

  // add that to the temp obj that we created
  commentsByIdeaId[req.params.id] = comments;

  // send back the entire array of comments
  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Comments Service Received Event", req.body.type);
  // we are looking for comment moderated event
  // once we receive the comment moderated event with the new data especially the status of the comment
  // we update the pending status of the comment when it was initially created
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { ideaId, id, status, content } = data;
    const comments = commentsByIdeaId[ideaId];

    // updating the comment for which the event was sent
    const comment = comments.find((comment) => {
      return comment.id === id;
    });

    // this is the comment that has to be updated
    comment.status = status;

    // send the comment updated event to the event bus
    await axios
      .post("http://event-bus-srv:4005/events", {
        type: "CommentUpdated",
        data: {
          id,
          status,
          ideaId,
          content,
        },
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  res.send({});
});

// what do we want on comments service
app.listen(4001, () => {
  console.log("Listening Comments Service on port 4001");
});
