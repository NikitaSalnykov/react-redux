import React from "react";
import PropTypes from "prop-types";
import { Comment } from "../Comment/Comment";
import { Grid } from "../Grid/Grid";
import { useGetCommentsQuery } from "../../redux/commentApi";

export const Comments = () => {
  const { data: comments, isLoading } = useGetCommentsQuery();

  return (
    <>
      {isLoading && "Loading..."}
      <Grid>
        {comments &&
          comments.map((comment) => <Comment key={comment.id} {...comment} />)}
      </Grid>
    </>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape().isRequired),
};
