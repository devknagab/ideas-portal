const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
// pass this as a middle ware to the ideas server
app.use(cors());

// store every idea that we create
const ideas = {};

// we need idea and get requests to be handled here
app.get("/ideas", (req, res) => {
  // just fetch all the ideas
  res.send(ideas);
});

// *** ASYNC COMMUNICATION => EMIT AN EVENT AS SOON AS WE CREATE A IDEA ***
app.post("/ideas/create", async (req, res) => {
  // generate an id
  const id = randomBytes(4).toString("hex");

  // look at the request that is sent by the user
  // the request will have a title in the body
  const { title } = req.body;

  // assign it to a object
  // store it in the ideas object that we create above
  ideas[id] = {
    id,
    title,
  };

  // once the idea is update in the object
  // we send a request to the EVENT BUS
  // EMITING => we are just posting some data to the EVENT BUS
  // along with the data
  try {
    await axios.post("http://event-bus-srv:4005/events", {
      type: "IdeaCreated",
      data: {
        id,
        title,
      },
    });
  } catch (ex) {}

  // send a response to the user letting them know
  // that the idea was saved
  // send the idea that was just created, the object with the id and title
  res.status(201).send(ideas[id]);
});

app.post("/events", (req, res) => {
  console.log("Ideas Service Received Event", req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log("Version1");
  console.log("Listening on port 4000");
});
