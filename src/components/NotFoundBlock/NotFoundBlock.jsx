import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div className="container">
      <div className={styles.root}>
        <h1>
          <span>🙁</span>
          <br />
          Ничего не найдено
        </h1>
      </div>
    </div>
  );
};

export default NotFoundBlock;
