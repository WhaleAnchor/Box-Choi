import React, { useState, useEffect } from "react";
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {db} from "../firebase/firebase";
import './Inventory.css'

// material ui imports
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
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

    console.log(data)
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
    
    <div className="inventoryWrapper">
        <Grid className="inputGrid">
          {/* Input form for boxes */}
          <Box
            component="form"
            sx={{'& > :not(style)': { m: 1, width: '8ch' },}}
            noValidate
            autoComplete="off"
            onChange={(event) => {
              setNewBoxLength(event.target.value);
              }}
          >
            <TextField id="outlined-basic" label="Length" variant="outlined" />
          </Box>
          <Box
            component="form" sx={{ '& > :not(style)': { m: 1, width: '8ch' },}}
            noValidate
            autoComplete="off"
            onChange={(event) => {
              setNewBoxWidth(event.target.value);
              }}
          >
            <TextField id="outlined-basic" label="Width" variant="outlined" />
          </Box>
          <Box
            component="form"
            sx={{'& > :not(style)': { m: 1, width: '8ch' }, }}
            noValidate
            autoComplete="off"
            onChange={(event) => {
              setNewBoxHeight(event.target.value);
              }}
          >
            <TextField id="outlined-basic" label="Height" variant="outlined" />
          </Box>
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '8ch' }, }}
            noValidate
            autoComplete="off"
            onChange={(event) => {
                setNewBoxPrice(event.target.value);
              }}
          >
            <TextField id="outlined-basic" label="Price" variant="outlined" />
          </Box>
          <Box
            component="form"
            sx={{  '& > :not(style)': { m: 1, width: '9ch' }, }}
            noValidate
            autoComplete="off"
            onChange={(event) => {
                setNewBoxAmount(event.target.value);
              }}
          >
            <TextField id="outlined-basic" label="Amount" variant="outlined" />
          </Box>
          {/* Add box button */}
          <Stack spacing={2} direction="row">
            <Button variant="text" onClick={addBox}>Add Box</Button>
          </Stack>
        </Grid>
      
    </div>
  );
};

export default Inventory;