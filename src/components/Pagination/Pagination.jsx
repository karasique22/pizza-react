import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";

import { setCurrentPage } from "../../app/slices/filterSlice";

import styles from "./Pagination.module.scss";

const Pagination = () => {
  const dispatch = useDispatch();

  // FIXME: Pagination does not work properly after reloading

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
