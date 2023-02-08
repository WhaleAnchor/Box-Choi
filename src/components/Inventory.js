import React, { useState, useEffect } from "react";
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {db} from "../firebase/firebase";

// material ui imports
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';





const Inventory = () => {

  const [boxes, setBoxes] = useState([]);
  const boxesColRef = collection(db, "boxes");

  const [newBoxLength, setNewBoxLength] = useState([])
  const [newBoxWidth, setNewBoxWidth] = useState([])
  const [newBoxHeight, setNewBoxHeight] = useState([])
  const [newBoxPrice, setNewBoxPrice] = useState([])
  const [newBoxAmount, setNewBoxAmount] = useState([])

  const theme = useTheme();

  // Retrieve boxes data from firestore
  useEffect(() => {
    const getBoxes = async () => {
      const data = await getDocs(boxesColRef);
      setBoxes(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };
    getBoxes();
  }, []);
  
  // Adding new boxes
  const addBox = async (event) => {
    event.preventDefault();
    // Add the new box to Firestore
    await addDoc(boxesColRef, { boxlength: newBoxLength, boxwidth: newBoxWidth, boxheight: newBoxHeight, boxprice: newBoxPrice, boxamount: Number(newBoxAmount) });
    window.location.reload(false);
  };

  // Adding amount of a box
  const updateBox = async (id, amount) => {
    const boxDoc = doc(db, "boxes", id);
    const newFields = { boxamount: amount + 1 };
    await updateDoc(boxDoc, newFields);
    window.location.reload(false);
  };

  // Subtracting amount of a box
  const minusBox = async (id, amount) => {
    const boxDoc = doc(db, "boxes", id);
    const newFields = { boxamount: amount - 1 };
    await updateDoc(boxDoc, newFields);
    window.location.reload(false);
  };

  // Deleting a box document
  const deleteBox = async (id) => {
    // Delete the box from Firestore
    await deleteDoc(doc(db, "boxes", id));
    console.log(deleteDoc)
    window.location.reload(false);
  };

  return (
    <div>
      <h1>Inventory</h1>
        <input 
          placeholder="Length"
          onChange={(event) => {
            setNewBoxLength(event.target.value);
          }}
        />

        <input 
          placeholder="Width"
          onChange={(event) => {
            setNewBoxWidth(event.target.value);
          }}
        />

        <input 
          placeholder="Height"
          onChange={(event) => {
            setNewBoxHeight(event.target.value);
          }}
        />

        <input 
          placeholder="Price"
          onChange={(event) => {
            setNewBoxPrice(event.target.value);
          }}
        />

        <input 
        type="number"
          placeholder="Amount"
          onChange={(event) => {
            setNewBoxAmount(event.target.value);
          }}
        />

        <button onClick={addBox}>Add Box</button>

      <div>
        {boxes.map((boxes) => {
          return <Card sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>

          {/* Box name and description */}
          <CardContent sx={{ flex: '1 0 auto' }}>
            {/* box name */}
            <Typography component="div" variant="h5">
            {boxes.boxlength}x{boxes.boxwidth}x{boxes.boxheight}
            </Typography>
            {/* box description */}
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Price: ${boxes.boxprice} <br></br>
              Amount: {boxes.boxamount} <br></br>
              
            </Typography>
          </CardContent>

          {/* Box icon controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            {/* Box add */}
            <IconButton aria-label="add" onClick={() => {
                updateBox(boxes.id, boxes.boxamount);
              }}>
              {theme.direction === 'rtl' ? <AddIcon /> : <AddIcon />}
            </IconButton>
            
            {/* Box minus */}
            <IconButton aria-label="remove" onClick={() => {
                minusBox(boxes.id, boxes.boxamount);
              }}>
              {theme.direction === 'rtl' ? <RemoveIcon /> : <RemoveIcon />}
            </IconButton>
            
            {/* Box delete */}
            <IconButton aria-label="clear" onClick={() => {
                deleteBox(boxes.id);
              }}>
              {theme.direction === 'rtl' ? <ClearIcon /> : <ClearIcon />}
            </IconButton>

          </Box>
        </Box>
      </Card>
        })}
      </div>
      
    </div>
  );
};

export default Inventory;