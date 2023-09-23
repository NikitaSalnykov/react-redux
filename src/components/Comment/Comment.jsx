import { useState } from "react";
import styles from "./Comment.module.css";
import PropTypes from "prop-types";
import { TiThumbsUp, TiThumbsDown } from "react-icons/ti";
import { formatDateToNow } from "../../helpers/formatDateToNow";
import { Button } from "../Button/Button";
import {
  useDeleteCommentMutation,
  useUpdateCommentCountMutation,
} from "../../redux/commentApi";
import { ModalEditTodo } from "../ModalEditTodo/ModalEditTodo";

export const Comment = ({
  createdAt,
  content,
  author,
  avatar,
  thumbsUp,
  thumbsDown,
  id,
}) => {
  const [deleteComment] = useDeleteCommentMutation();
  const [editComment] = useUpdateCommentCountMutation();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  const handleDeleteComment = (id) => {
    deleteComment(id);
  };

  const handleEditComment = () => {
    editComment(id);
    toggleModal();
  };

  return (
    <li className={styles.card}>
      <img className={styles.avatar} src={avatar} alt={author} />
      <div className={styles.cardWrapper}>
        <div className={styles.cardBody}>
          <h3 className={styles.author}>{author}</h3>
          <p className={styles.content}>
            <span className={styles.blockquote}>"</span>
            {content}
            <span className={styles.blockquote}>"</span>
          </p>
        </div>

        <div className={styles.cardFooter}>
          <span className={styles.date}>{formatDateToNow(createdAt)}</span>

          <div className={styles.buttonBox}>
            <Button counter={thumbsUp} id={id}>
              <TiThumbsUp className={styles.icon} />
            </Button>

            <Button counter={thumbsDown} role="thumbsDown" id={id}>
              <TiThumbsDown className={styles.icon} />
            </Button>
          </div>
        </div>
        <button type="button" onClick={() => handleDeleteComment(id)}>
          Delete
        </button>

        <button type="button" onClick={() => handleEditComment(id)}>
          Edit
        </button>
      </div>
      {modalIsOpen && (
        <ModalEditTodo handleModal={toggleModal} comment={{ id, content }} />
      )}
    </li>
  );
};

Comment.propTypes = {
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  thumbsUp: PropTypes.number.isRequired,
  thumbsDown: PropTypes.number.isRequired,
};
