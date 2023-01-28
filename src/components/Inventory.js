import React, { useState, useEffect } from "react";
import {db} from "../firebase/firebase";
import {collection, query, getDocs, addDoc} from "firebase/firestore"

const Inventory = () => {
  // State to store the inventory items
  const [items, setItems] = useState([]);

  // Use effect to fetch the inventory items from Firestore
  useEffect(() => {
    const fetchItems = async () => {
      const itemCollection = collection(db, "items");
      const itemQuery = await query(itemCollection);
      const itemDocs = await getDocs(itemQuery);
      setItems(itemDocs.docs.map((doc) => doc.data()));
    };
    fetchItems();
  }, []);

  // Function to add a new item to the inventory
  const addItem = async (name, quantity) => {
    try {
      await addDoc(collection(db, "items"), { name, quantity });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Function to update an existing item in the inventory
  const updateItem = async (id, name, quantity) => {
    try {
      const itemRef = collection(db, "items").doc(id);
      await itemRef.update({ name, quantity });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Function to delete an item from the inventory
  const deleteItem = async (id) => {
    try {
      const itemRef = collection(db, "items").doc(id);
      await itemRef.delete();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div>
      <h1>Inventory</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}: {item.quantity}
          </li>
        ))}
      </ul>
      <button onClick={() => addItem("New Item", 1)}>Add Item</button>
      <button onClick={() => updateItem("itemId", "Updated Item", 2)}>
        Update Item
      </button>
      <button onClick={() => deleteItem("itemId")}>Delete Item</button>
    </div>
  );
};

export default Inventory;