import React, { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, deleteDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import {db} from "../firebase/firebase";

const Inventory = () => {
  const [boxes, setBoxes] = useState([]);
  const [formData, setFormData] = useState({
    length: "",
    width: "",
    height: "",
    price: "",
  });

  useEffect(() => {
    const q = query(collection(db, 'boxes'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setBoxes(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add the new box to Firestore
    await addDoc(collection(db, "boxes"), formData);
    // Clear the form
    setFormData({
      length: "",
      width: "",
      height: "",
      price: "",
    });
  };

  const handleUpdate = async (id) => {
    // Update the box in Firestore
    await updateDoc(collection(db, "boxes").doc(id), formData);
  };

  const handleDelete = async (id) => {
    // Delete the box from Firestore
    await deleteDoc(collection(db, "boxes").doc(id));
  };

  return (
    <div>
      <h1>Inventory</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Length:
          <input type="text" name="length" value={boxes.length} onChange={handleChange} />
        </label>
        <label>
          Width:
          <input type="text" name="width" value={boxes.width} onChange={handleChange} />
        </label>
        <label>
          Height:
          <input type="text" name="height" value={boxes.height} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="text" name="price" value={boxes.price} onChange={handleChange} />
        </label>
        <button type="submit">Add Box</button>
      </form>
      <div>
        {boxes.map((box) => (
          <div key={box.id}>
            <p>Length: {box.length}</p>
            <p>Width: {box.width}</p>
            <p>Height: {box.height}</p>
            <p>Price: {box.price}</p>
            <button onClick={() => handleUpdate(box.id)}>Update</button>
            <button onClick={() => handleDelete(box.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
        