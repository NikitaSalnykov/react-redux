import React from "react";
import { CiSearch } from "react-icons/ci";
import styles from "./Filter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getFilter, setFilter } from "../../redux/filterSlice";

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  return (
    <div className={styles.search}>
      <div className={styles.searchWrapper}>
        <CiSearch className={styles.searchIcon} />

        <input
          className={styles.searchInput}
          onChange={(e) => {
            dispatch(setFilter(e.target.value));
          }}
          type="text"
          id="search"
          placeholder="Search something.."
          value={filter}
        />
      </div>
    </div>
  );
};
