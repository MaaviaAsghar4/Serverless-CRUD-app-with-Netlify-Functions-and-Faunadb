import React from "react";
import styles from "./index.module.css";
const IndexPage = () => {
  return (
    <div>
      <title>CRUD APP</title>
      <header className={styles.headerContent}>
        <h1>CRUD APP</h1>
        <h2>Netlify Functions and FaunaDB</h2>
      </header>
      <div className={styles.addContent}>
        <input type="text" />
        <button>Add</button>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.crudContent}>
          <span>title</span>
          <div>
            <button className={styles.update}>Update</button>
            <button className={styles.delete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
