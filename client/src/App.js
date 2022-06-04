import React from "react";
import CreateIdea from "./CreateIdea";
import IdeasList from "./IdeasList";

export default () => {
  return (
    <>
      <div className="container">
        <h1> Ideas Portal </h1>
        <CreateIdea />
        <hr />
        <h1> Ideas to discuss </h1>
        <IdeasList />
      </div>
      <div> 
        <button className="btn btn-secondary"> Closed Ideas </button>
      </div>
    </>
  );
};
