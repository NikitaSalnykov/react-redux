import { useEffect, useState } from "react";

import { ModalContainer, Overlay } from "./Modal.style";

import { createPortal } from "react-dom";
import { useUpdateCommentCountMutation } from "../../redux/commentApi";

export const ModalEditTodo = ({ handleModal, comment: { content, id } }) => {
  const [value, setValue] = useState(content);
  const [editComment] = useUpdateCommentCountMutation();

  useEffect(() => {
    const handleCloseModal = (e) => {
      if (e.key === "Escape") {
        handleModal();
      }
    };
    window.addEventListener("keydown", handleCloseModal);

    return () => {
      window.removeEventListener("keydown", handleCloseModal);
    };
  }, [handleModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editComment({ id, content: value });
    handleModal();
    setValue("");
  };

  return createPortal(
    <Overlay>
      <ModalContainer>
        <p>Edit todo</p>
        <form
          style={{ background: "aliceblue", padding: "30px" }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="edit"></label>
          <input
            type="text"
            name="edit"
            id="edit"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </ModalContainer>
    </Overlay>,
    document.querySelector("#modal-root")
  );
};
