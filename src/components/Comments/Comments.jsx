import React from "react";
import PropTypes from "prop-types";
import { Comment } from "../Comment/Comment";
import { Grid } from "../Grid/Grid";
import { useGetCommentsQuery } from "../../redux/commentApi";
import { getFilter } from "../../redux/filterSlice";
import { useSelector } from "react-redux";

export const Comments = () => {
  const { data: comments, isLoading } = useGetCommentsQuery();
  const filter = useSelector(getFilter);

  const filteredComments = () => {
    return comments.filter(({ content }) => content.includes(filter));
  };

  return (
    <>
      {isLoading && "Loading..."}
      <Grid>
        {comments &&
          filteredComments().map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
      </Grid>
    </>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape().isRequired),
};
