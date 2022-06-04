import React from "react";
import { useState } from "react";
import axios from "axios";

export default () => {
  const [title, setTitle] = useState("");

  // will make a call to the ideaservice
  // will post the data submitted from the form
  // title is the body of the req
  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://ideas-portal.com/ideas/create", { title });

    // reset the title to empty string
    setTitle("");
  };

  return (
    <div>
      {/* event listener */}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label> Idea </label>
          <input
            value={title}
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary"> Post Idea </button>
      </form>
    </div>
  );
};
