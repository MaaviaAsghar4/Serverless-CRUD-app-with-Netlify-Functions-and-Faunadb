import React, { useState } from "react";
import styles from "./index.module.css";
const IndexPage = () => {
  let [inputValue, setInputValue] = useState("");
  let [editableValue, setUpdateValue] = useState("");
  let [values, setValues] = useState<string[]>([]);
  let [edit, setEdit] = useState(false);
  let [fetchArray, setFetchArray] = useState([]);

  const addValue = async () => {
    setValues((state) => {
      return [...state, inputValue];
    });
    try {
      const result = await fetch("/.netlify/functions/crudApp", {
        method: "POST",
        body: JSON.stringify(inputValue),
      });
      const response = await result.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setInputValue("");
  };

  React.useEffect(() => {
    const fetchValues = async () => {
      const fetchData = await fetch("/.netlify/functions/crudApp");
      const { result } = await fetchData.json();
      setFetchArray(result.data);
      console.log(result.data);
    };

    fetchValues();
  }, []);

  const updateValue = () => {
    // setEdit(true);
    console.log("hello");
  };

  const editValue = (index: string) => {
    // let newArr = [...values];
    // newArr.splice(index, 1, editableValue);
    // setValues(newArr);
    // setEdit(false);
    console.log(index);
  };

  const deleteValue = (index: string) => {
    // let newArr = [...values];
    // newArr.splice(index, 1);
    // setValues(newArr);
    console.log(index);
  };
  return (
    <div>
      <title>CRUD APP</title>
      <header className={styles.headerContent}>
        <h1>CRUD APP</h1>
        <h2>Netlify Functions and FaunaDB</h2>
      </header>
      <div className={styles.addContent}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required={true}
          type="text"
        />
        <button onClick={addValue}>Add</button>
      </div>
      <div className={styles.mainContainer}>
        {fetchArray.map((value: any, index: number) => {
          console.log(value.ref["@ref"].id);
          return (
            <div key={index} className={styles.crudContent}>
              {edit ? (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setUpdateValue(e.target.value)}
                />
              ) : (
                <span>{value.data.title}</span>
              )}
              <div>
                {edit ? (
                  <button
                    onClick={() => editValue(value?.ref?.id)}
                    className={styles.update}
                  >
                    Update
                  </button>
                ) : (
                  <button onClick={updateValue} className={styles.update}>
                    Update
                  </button>
                )}
                <button
                  onClick={() => deleteValue(value?.ref?.id)}
                  className={styles.delete}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndexPage;
