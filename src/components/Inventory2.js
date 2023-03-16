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
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


export function Inventory2() {
  const boxesColRef = collection(db, "boxes");
  const materialColRef = collection(db, "materials");
  const [rows, setRows] = useState([]);
  const [materialRows, setMaterialRows] = useState([]);
  const [showBoxes, setShowBoxes] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);

  // Increment amount of a box
  const addBox = async (id, amount) => {
    const boxDoc = doc(db, "boxes", id);
    const newFields = { boxquantity: amount + 1 };
    await updateDoc(boxDoc, newFields);
    const data = await getDocs(boxesColRef);
    const formattedData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRows(formattedData);
  };
  // Decrement  amount of a box
  const minusBox = async (id, amount) => {
    const boxDoc = doc(db, "boxes", id);
    const newFields = { boxquantity: amount - 1 };
    await updateDoc(boxDoc, newFields);
    const data = await getDocs(boxesColRef);
    const formattedData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRows(formattedData);
  };

  // Deleting a box document
  const deleteBox = async (id) => {
    // Delete the box from Firestore
      await deleteDoc(doc(db, "boxes", id));
      setRows(rows.filter((doc)=> doc.id !== id))
  };

  // Manually update a box's quantity
  const updateBoxQuantity = async (id, quantity) => {
    const boxDoc = doc(db, 'boxes', id);
    const newFields = {boxquantity: quantity};
    await updateDoc(boxDoc, newFields);

    const data = await getDocs(boxesColRef);

    const formattedData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRows(formattedData);
  };

  // Increment a material's quantity
  const addMat = async (id, amount) => {
    const matDoc = doc(db, "materials", id);
    const newFields = { materialCount: amount + 1 };
    await updateDoc(matDoc, newFields);
    const data = await getDocs(materialColRef);
    const formattedData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMaterialRows(formattedData);
  };

  // Decrement a material's quantity
  const minusMat = async (id, amount) => {
    const matDoc = doc(db, "materials", id);
    const newFields = { materialCount: amount - 1 };
    await updateDoc(matDoc, newFields);
    const data = await getDocs(materialColRef);
    const formattedData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMaterialRows(formattedData);
  };


  // Delete Materials
  const deleteMaterials = async (id) => {
    await deleteDoc(doc(db, "materials", id));
    setMaterialRows(materialRows.filter((doc)=> doc.id !== id))
  };

  // Manually update a material's quanitty
  const updateMatQuantity = async (id, quantity) => {
    const matDoc = doc(db, 'materials', id);
    const newFields = {materialCount: quantity};
    await updateDoc(matDoc, newFields);

    const data = await getDocs(materialColRef);

    const formattedData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMaterialRows(formattedData);
  };

  const columns = [
      {
          field: 'delete',
          headerName: '',
          width: 10,
          renderCell: (params) => (
          <IconButton onClick={() => deleteBox(params.id)}>
              <DeleteIcon />
          </IconButton>
          ),
      },
      { field: 'boxlength', headerName: 'L', width: 40 },
      { field: 'boxwidth', headerName: 'W', width: 30 },
      { field: 'boxheight', headerName: 'H', width: 50 },
      { field: 'boxprice', headerName: 'Price', width: 30 },
      {
        field: 'boxquantity',
        headerName: '#',
        width: 30,
        renderCell: (params) => (
          <div onClick={() => {
            const newQuantity = prompt(`Enter new quantity. Current quantity for ${params.row.boxlength}x${params.row.boxwidth}x${params.row.boxheight} is ${params.row.boxquantity}.`, params.value);
            if (newQuantity !== null && newQuantity.trim() !== '' && /^\d+$/.test(newQuantity)) {
              updateBoxQuantity(params.id, parseInt(newQuantity));
            }
          }}>
            {params.value}
          </div>
        )
    },
      {
          field: 'Add',
          headerName: 'Add',
          width: 30,
          renderCell: (params) => (
          <IconButton onClick={() => {addBox(params.id, params.row.boxquantity) }}>
              <AddIcon />
          </IconButton>
          ),
      },
      {
          field: 'Delete',
          headerName: 'Del',
          width: 30,
          renderCell: (params) => (
              <IconButton onClick={() => {minusBox(params.id, params.row.boxquantity) }}>
              <RemoveIcon />
              </IconButton>
          ),
      },
  ];
  const materialColumn = [
    {
      field: 'delete',
      headerName: '',
      width: 30,
      renderCell: (params) => (
      <IconButton onClick={() => deleteMaterials(params.id)}>
          <DeleteIcon />
      </IconButton>
      ),
    },
    { field: 'materialName', headerName: 'Material Name', width: 200 },
    { field: 'materialCount',
    headerName: '#',
    width: 30,
    renderCell: (params) => (
      <div onClick={() => {
        const newQuantity = prompt(`Enter new quantity. Current quantity for "${params.row.materialName}" is ${params.row.materialCount}.`);
        if (newQuantity !== null && newQuantity.trim() !== '' && /^\d+$/.test(newQuantity)) {
          updateMatQuantity(params.id, parseInt(newQuantity));
        }
      }}>
          {params.value}
      </div>
    )
    },
    {
      field: 'Add',
      headerName: 'Add',
      width: 30,
      renderCell: (params) => (
      <IconButton onClick={() => {addMat(params.id, params.row.materialCount) }}>
          <AddIcon />
      </IconButton>
      ),
    },
    {
      field: 'Delete',
      headerName: 'Del',
      width: 30,
      renderCell: (params) => (
          <IconButton onClick={() => {minusMat(params.id, params.row.materialCount) }}>
          <RemoveIcon />
          </IconButton>
      ),
    },
  ]

  // Toggle tables
  const handleShowBoxes = () => {
    setShowBoxes((prev) => !prev);
    setShowMaterials(false);
  };
  const handleShowMaterials = () => {
    setShowMaterials((prev) => !prev);
    setShowBoxes(false);
  };
  
  // fetch firestore data
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

  // JSX depeding on screen size
  const isSmallScreen = window.innerWidth <= 1260;
  // JSX depending on screen size
  const SmallScreen = () => (
        <div className="Row">
          <div className="firestoreBoxes">
            <div className="title">
              <Stack spacing={2} direction="row">
                <Button variant="outlined" onClick={handleShowBoxes}>Boxes</Button>
                <Button variant="outlined" onClick={handleShowMaterials}> Packing Materials </Button>
              </Stack>
            </div>
            {showBoxes && (
              <div style={{ height: 750, width: 410 }}>
                <div>
                  <h1>
                    Boxes
                  </h1>  
                </div>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  autoPageSize={true}
                  rowsPerPageOptions={[-1]}
                />
              </div>
            )}
            {showMaterials && (
              <div style={{ height: 600, width: 410 }}>
              <div>
                  <h1>
                    Packing Materials
                  </h1>  
                </div>
                <DataGrid
                  rows={materialRows}
                  columns={materialColumn}
                  pageSize={15}
                  rowsPerPageOptions={[-1]}
                />
              </div>
            )}
          </div>
        </div>
  );
  
  const RegularScreen = () => (
      <div className="Row">

      <div  className="firestoreBoxes">
        <div className="title">
          <h1>
            Boxes
          </h1>
        </div>
        <div style={{ height:800, width:450}}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoPageSize={true}
            rowsPerPageOptions={[-1]}
          />
        </div>
      </div>

      <div  className="firestoreBoxes">
        <div className="title">
          <h1>
            Packing Materials
          </h1>
        </div>
        <div style={{ height:800, width:450}}>
          <DataGrid
            rows={materialRows}
            columns={materialColumn}
            autoPageSize={true}
            rowsPerPageOptions={[-1]}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {isSmallScreen ? <SmallScreen /> : < RegularScreen/>}
    </div>
  );
};

  export default Inventory2;