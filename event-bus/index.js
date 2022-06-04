const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

// implement end point to handle incoming events
// since we are watching POST /events
// anytime we receive an /event we turn back around
// make series or requests /events to all the services.
// we will have to listen for /events requests from ideas and comments
// we will be handling POST req from the ideas and comments services
// use app.post() => from express routing

app.post("/events", (req, res) => {
  const event = req.body;
  // after receiving the event from the services
  // the event bus emits the event object received to other services
  // we store those events in the events array declared above
  events.push(event);

  axios.post("http://ideas-clusterip-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  }); // ideas service

  axios.post("http://comments-srv:4001/events", event).catch((err) => {
    console.log(err.message);
  }); // comments service

  axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log(err.message);
  }); // query service

  axios.post("http://moderation-srv:4003/events", event).catch((err) => {
    console.log(err.message);
  }); // moderation service

  //#region before using k8s 
  // axios.post("http://localhost:4000/events", event).catch((err) => {
  //   console.log(err.message);
  // }); // ideas service
  // axios.post("http://localhost:4001/events", event).catch((err) => {
  //   console.log(err.message);
  // }); // comments service
  // axios.post("http://localhost:4002/events", event).catch((err) => {
  //   console.log(err.message);
  // }); // query service
  // axios.post("http://localhost:4003/events", event).catch((err) => {
  //   console.log(err.message);
  // });
  //#endregion


  res.send({ status: "OK" });
});

// end point which retrieves all the events that were stored
app.get("/events", (req, res) => {
  res.send(events);
});

// EVENT BUS LISTENER
app.listen(4005, () => {
  console.log("Event Bus Listening on 4005");
});
