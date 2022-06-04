// display all the ideas that were created
import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentsList from "./CommentsList";

export default () => {
  const [ideas, setIdeas] = useState({});
  // populate the deleted ideas which we want to display in another page
  const [deletedIdeas, setDeletedIdeas] = useState({}); 

  const fetchIdeas = async () => {
    debugger;
    const res = await axios.get("http://ideas-portal.com/ideas");
    // response from axios is stored in res.data
    // set that to the ideas object we created
    setIdeas(res.data);
  };
  // get fetch ideas only when the component is displayed
  useEffect(() => {
    fetchIdeas();
  }, []);

  console.log(ideas);

  const renderedIdeas = Object.values(ideas).map((post) => {
    console.log(post);
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3> {post.title}</h3>
          {/* which post id needs to retrieve the comment for  */}
          {/* <CommentsList postId={post.id} /> */}
          {/* instead of sending the post id and then getting comments from that 
          we just send the comments that are available from the query services data source  */}
          <CommentsList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between ">
      {renderedIdeas}
    </div>
  );
};
