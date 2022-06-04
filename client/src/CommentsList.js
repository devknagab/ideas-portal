import React, { useEffect, useState } from "react";
import axios from "axios";

export default ({ comments }) => {
  
  // REmoved after we introduced the query service 
  // since we already get the comments from the query service. 

  // // array of comments
  // const [comments, setComments] = useState([]);

  // // fetch data is to be called only once
  // // when the comments are first displayed on the screen
  // const fetchData = async () => {
  //   // fetch data
  //   const res = await axios.get(
  //     `http://localhost:4001/ideas/${postId}/comments`
  //   );
  //   // set state
  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // map over the state to list the comments
  // display them
  const renderedComments = comments.map((comment) => {
    debugger;
    let content; 
    if(comment.status === 'approved') {
      content = comment.content;
    } 
    if(comment.status === 'pending') {
      content = "Comment waiting for moderation";
    }
    if(comment.status === 'rejected') {
      content = "This comment has been rejected";
    }
    return <li key={comment.id}> {content} </li>;
  });
  return <ul>{renderedComments}</ul>;
};
