const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const ideas = {};
// QUICK EXAMPLE ideas object will look like this
// ideas ===
//   {
//     j12345: {
//       id: "j12345",
//       title: "new idea",
//       comments: [{ id: "jk7878", content: "comments" }],
//     },
//   };

const handleEvents = (type, data) => {
  if (type === "IdeaCreated") {
    const { id, title } = data;
    ideas[id] = { id, title, comments: [] };
    console.log(ideas);
  }

  if (type === "CommentCreated") {
    const { id, content, ideaId, status } = data;
    const idea = ideas[ideaId];
    // the idea will be of this format
    // {
    //  id: "j12345",
    //  title: "new idea",
    //   comments: [{ id: "jk7878", content: "comments" }],
    // }
    idea.comments.push({ id, content, status });
    // res.send({});
  }

  if (type === "CommentUpdated") {
    const { id, content, status, ideaId } = data;

    const idea = ideas[ideaId];
    const comment = idea.comments.find((comment) => {
      return comment.id === id;
    });

    // updating the status and content
    comment.status = status;
    comment.content = content;
  }
};

app.get("/ideas", (req, res) => {
  // getting collection of ideas
  res.send(ideas);
});

// receive events from event bus
app.post("/events", (req, res) => {
  // req.body => event that we care about

  console.log("req body: ", req.body);
  const { type, data } = req.body;
  console.log("query ideas service");

  handleEvents(type, data);

  console.log(ideas);
  res.send({});
});

// when we create the idea we are going to save the idea
// when we create a comment we are gonna save comment with the associated idea.

app.listen(4002, async () => {
  console.log("Query Service Listening on port 4002");
  try {
    const res = await axios.get("http://event-bus-srv:4005/events");
    for (let event of res.data) {
      console.log("Processing Events", event.type);
      handleEvents(event.type, event.data);
    }
  } catch (ex) {}
});
