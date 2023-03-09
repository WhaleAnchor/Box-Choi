import React, { useState, useEffect } from "react";
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {db} from "../firebase/firebase";
import "./Inventory.css"

// material ui imports
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Deleting a box document
const deleteBox = async (id) => {
    // Delete the box from Firestore
    await deleteDoc(doc(db, "boxes", id));
    console.log(deleteDoc)
    window.location.reload(false);
};

// Adding amount of a box
const addBox = async (id, amount) => {
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

  
const columns = [
    {
        field: 'delete',
        headerName: 'Delete',
        width: 100,
        renderCell: (params) => (
          <IconButton onClick={() => deleteBox(params.id)}>
            <DeleteIcon />
          </IconButton>
        ),
      },
    { field: 'boxlength', headerName: 'Length', width: 130 },
    { field: 'boxwidth', headerName: 'Width', width: 130 },
    { field: 'boxheight', headerName: 'Height', width: 130 },
    { field: 'boxprice', headerName: 'Price', type: 'number', width: 130 },
    { field: 'boxamount', headerName: 'Amount', type: 'number', width: 130 },
    {
        field: 'Add',
        headerName: 'Add',
        width: 50,
        renderCell: (params) => (
          <IconButton onClick={() => {addBox(params.id, params.boxamount) }}>
            <AddIcon />
          </IconButton>
        ),
    },
    {
        field: 'Delete',
        headerName: 'Delete',
        width: 70,
        renderCell: (params) => (
            <IconButton onClick={() => {minusBox(params.id, params.boxamount) }}>
              <RemoveIcon />
            </IconButton>
        ),
    },
    
];
    

  export function Inventory2() {
    const boxesColRef = collection(db, "boxes");
    const [rows, setRows] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const data = await getDocs(boxesColRef);
        const formattedData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRows(formattedData);
      };
      fetchData();
    }, []);

    
    // Subtracting amount of a box
    const minusBox = async (id, amount) => {
        const boxDoc = doc(db, "boxes", id);
        const newFields = { boxamount: amount - 1 };
        await updateDoc(boxDoc, newFields);
        window.location.reload(false);
    };

    return (
      <div className="fireStoreGet" style={{ height: 400}}>
      
      
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    );
  };

  export default Inventory2;