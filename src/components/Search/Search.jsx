import React from "react";

import styles from "./Search.module.scss";
import { SearchContext } from "../../App"

const Search = () => {
  const {searchValue, setSearchValue} = React.useContext(SearchContext)

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon__search}
        fill="#000000"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
      </svg>
      <input
        className={styles.input}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Искать пиццу..."
      />

      {searchValue && (
        <svg
          className={styles.icon__close}
          onClick={() => setSearchValue("")}
          height="200"
          viewBox="0 0 200 200"
          width="200"
        >
          <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
