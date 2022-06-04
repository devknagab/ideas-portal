const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  // anytime we see event of 'CommentCreated' we emit 'CommentModerated' event.
  const { type, data } = req.body;
  if (type == "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    // we emit the comment moderated event to the event bus
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        ideaId: data.ideaId,
        status: status,
        content: data.content,
      },
    }).catch((err) => {
      console.log(err.message);
    });
  }
  // with out this the event handler will hang

  res.send({});
});

app.listen(4003, async () => {
  console.log("Moderation Service Listening on port 4003");
});
