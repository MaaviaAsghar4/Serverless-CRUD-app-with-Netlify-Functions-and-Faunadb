import React, { useState } from "react";
import styles from "./index.module.css";

interface arrType {
  data: string;
  id: string;
}
const IndexPage = () => {
  let [inputValue, setInputValue] = useState("");
  let [editableValue, setUpdateValue] = useState("");
  let [fetchArray, setFetchArray] = useState<arrType[]>([]);

  const addValue = async () => {
    try {
      const fetchAddValue = await fetch("/.netlify/functions/crudApp", {
        method: "POST",
        body: JSON.stringify(inputValue),
      });
      const { result } = await fetchAddValue.json();
      const newValue = {
        data: result.data.title,
        id: result.ref["@ref"].id,
      };
      setFetchArray((state: arrType[]) => {
        return [newValue, ...state];
      });
    } catch (error) {
      console.log(error);
    }
    setInputValue("");
  };

  React.useEffect(() => {
    const fetchValues = async () => {
      const fetchData = await fetch("/.netlify/functions/crudApp");
      const fetchedData = await fetchData.json();
      const { newData } = fetchedData;
      setFetchArray(newData);
    };

    fetchValues();
  }, []);

  const editValue = async (id: string, data: string, index: number) => {
    const newValue = prompt("Enter Value to Edit", data);
    const updateValue = {
      id: id,
      content: newValue,
    };
    const fetchData = await fetch("/.netlify/functions/crudApp", {
      method: "PUT",
      body: JSON.stringify(updateValue),
    });
    const { result } = await fetchData.json();
    const updatedValue = {
      data: result.data.title,
      id: result.ref["@ref"].id,
    };
    let newArr = [...fetchArray];
    newArr[index].data = updatedValue.data;
    setFetchArray(newArr);
  };

  const deleteValue = async (index: string) => {
    const deleteData = await fetch("/.netlify/functions/crudApp", {
      method: "DELETE",
      body: JSON.stringify(index),
    });
    setFetchArray(fetchArray.filter((value) => value.id !== index));
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
        {fetchArray &&
          fetchArray.map((value: arrType, index: number) => {
            return (
              <div key={index} className={styles.crudContent}>
                <span>{value.data}</span>
                <div>
                  <button
                    onClick={() => editValue(value.id, value.data, index)}
                    className={styles.update}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteValue(value.id)}
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
