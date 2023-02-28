import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

/*
  We need to add some code below which will take updated content and save it to IndexedDB.
*/
export const putDb = async (content) => {
  const jateDb = await openDB("IndexedDB", 1);
  const tx = jateDb.transaction("IndexedDB", "readwrite");
  const store = tx.objectStore("IndexedDB");
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log("🚀 - data saved to the database", result.value);
};

export const getDb = async () => {
  const jateDb = await openDB("IndexedDB", 1);
  const tx = jateDb.transaction("IndexedDB", "readonly");
  const store = tx.objectStore("IndexedDB");
  const request = store.get(1);
  const result = await request;
  result
    ? console.log("🚀 - data retrieved from the database", result.value)
    : console.log("🚀 - data not found in the database");
  // Check if a variable is defined and if it is, return it. See MDN Docs on Optional Chaining (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
  return result?.value;
};

initdb();
