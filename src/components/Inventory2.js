import React, { useState, useEffect } from "react";
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {db} from "../firebase/firebase";
import "./Inventory2.css"

// material ui imports
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


export function Inventory2() {
    const boxesColRef = collection(db, "boxes");
    const materialColRef = collection(db, "materials");
    const [rows, setRows] = useState([]);
    const [materialRows, setMaterialRows] = useState([]);

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
        const newFields = { boxquantity: amount + 1 };
        await updateDoc(boxDoc, newFields);
        window.location.reload(false);
    };

    // Subtracting amount of a box
    const minusBox = async (id, amount) => {
        const boxDoc = doc(db, "boxes", id);
        const newFields = { boxquantity: amount - 1 };
        await updateDoc(boxDoc, newFields);
        window.location.reload(false);
    };

  
    const columns = [
        {
            field: 'delete',
            headerName: '',
            width: 60,
            renderCell: (params) => (
            <IconButton onClick={() => deleteBox(params.id)}>
                <DeleteIcon />
            </IconButton>
            ),
        },
        { field: 'boxlength', headerName: 'Length', width: 80 },
        { field: 'boxwidth', headerName: 'Width', width: 80 },
        { field: 'boxheight', headerName: 'Height', width: 200 },
        { field: 'boxprice', headerName: 'Price', width: 200 },
        { field: 'boxquantity', headerName: 'Quantity', width: 80 },
        {
            field: 'Add',
            headerName: 'Add',
            width: 50,
            renderCell: (params) => (
            <IconButton onClick={() => {addBox(params.id, params.row.boxquantity) }}>
                <AddIcon />
            </IconButton>
            ),
        },
        {
            field: 'Delete',
            headerName: 'Delete',
            width: 70,
            renderCell: (params) => (
                <IconButton onClick={() => {minusBox(params.id, params.row.boxquantity) }}>
                <RemoveIcon />
                </IconButton>
            ),
        },
        
    ];


    const materialColumn = [
      { field: 'materialName', headerName: 'Material Name', width: 150 },
      { field: 'materialCount', headerName: 'Quantity', width: 80 },
    ]
  
    useEffect(() => {
      const fetchData = async () => {
        const data = await getDocs(boxesColRef);
        const formattedData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRows(formattedData);
      };
      const fetchMaterialData = async () => {
        const data = await getDocs(materialColRef);
        const formattedMatData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMaterialRows(formattedMatData);
      };
      fetchData();
      fetchMaterialData();
    }, []);


    return (
      <div className="Row">

        <div  className="firestoreBoxes">
          <div style={{ height:500, width:820}}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </div>

        <div  className="firestoreMaterials">
          <div style={{ height:500, width:500}}>
            <DataGrid
              rows={materialRows}
              columns={materialColumn}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </div>
      </div>
    );
  };

  export default Inventory2;