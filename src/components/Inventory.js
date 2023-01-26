import React, { useState } from 'react';

function Inventory() {
  // Use the useState hook to set up state for the list of boxes
  const [boxes, setBoxes] = useState(JSON.parse(localStorage.getItem('boxes')) || []);

  // Function to add a new box to the list
  const addBox = (length, width, height) => {
    const newBox = { length, width, height };
    setBoxes([...boxes, newBox]);
    localStorage.setItem('boxes', JSON.stringify([...boxes, newBox]));
  }

  // Function to remove a box from the list
  const removeBox = (index) => {
    const newBoxes = [...boxes];
    newBoxes.splice(index, 1);
    setBoxes(newBoxes);
    localStorage.setItem('boxes', JSON.stringify(newBoxes));
  }

  return (
    <div>
      <h1>Shipping Box Inventory</h1>

      <button onClick={() => addBox(5, 10, 15)}>Add Box</button>

      <table>
        <thead>
          <tr>
            <th>Length</th>
            <th>Width</th>
            <th>Height</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {boxes.map((box, index) => (
            <tr key={index}>
              <td>{box.length}</td>
              <td>{box.width}</td>
              <td>{box.height}</td>
              <td>
                <button onClick={() => removeBox(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
