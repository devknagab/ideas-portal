import React, { useState } from "react";
import axios from "axios";

// export default (props) => {
//   return <div />;
// };

// since we will be receiving only postId
// instead of props, we destructure it to get only postId as a argument.

export default ({ postId }) => {
  // function that is gonna make post request
  // to comments microservice
  const [content, setContent] = useState("");

  //since this is a form submission we receive an event object
  const onSubmit = async (event) => {
    event.preventDefault();

    // use the postId and content to make a request to the comments microservice.
    // POST request because we are creating a new comment

    await axios.post(`http://ideas-portal.com/ideas/${postId}/comments`, {
      content,
    });

    // clear out the value of the input
    setContent("");
  };
  return (
    <div>
      {/* event handler to watch for submit event */}
      {/* onSubmit listener */}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label> Comments on Idea </label>
          {/* need a piece of state that is going to track the input */}
          {/* set up event handlers and value setters here  */}
          <input
            value={content}
            //onChange event listener
            //use target.value property to update the content
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="form-control"
          />
          <button className="btn btn-primary"> Post Comment </button>
        </div>
      </form>
      {/* TODO: remove idea from the current ideas list and display them in closed ideas section => new page which shows this */}
      <button className="btn btn-secondary" onClick="">
        Close Idea
      </button>
    </div>
  );
};
