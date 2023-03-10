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

    // Adding amount of a box
    const addMat = async (id, amount) => {
        const matDoc = doc(db, "materials", id);
        const newFields = { materialCount: amount + 1 };
        await updateDoc(matDoc, newFields);
        window.location.reload(false);
    };

    // Subtracting amount of a box
    const minusMat = async (id, amount) => {
        const matDoc = doc(db, "materials", id);
        const newFields = { materialCount: amount - 1 };
        await updateDoc(matDoc, newFields);
        window.location.reload(false);
    };

    // Delete Materials
    const deleteMaterials = async (id) => {
      await deleteDoc(doc(db, "materials", id));
      window.location.reload(false);
    }

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
        { field: 'boxlength', headerName: 'L', width: 30 },
        { field: 'boxwidth', headerName: 'W', width: 30 },
        { field: 'boxheight', headerName: 'H', width: 50 },
        { field: 'boxprice', headerName: 'Price', width: 50 },
        { field: 'boxquantity', headerName: '#', width: 30 },
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
      { field: 'materialName', headerName: 'Material Name', width: 240 },
      { field: 'materialCount', headerName: '#', width: 30 },
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
      setShowBoxes(true);
      setShowMaterials(false);
    };
    const handleShowMaterials = () => {
      setShowMaterials(true);
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
                <div style={{ height: 750, width: 420 }}>
                  <div>
                    <h1>
                      Boxes
                    </h1>  
                  </div>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    autoPageSize={true}
                    rowsPerPageOptions={[5]}
                  />
                </div>
              )}
              {showMaterials && (
                <div style={{ height: 600, width: 450 }}>
                <div>
                    <h1>
                      Packing Materials
                    </h1>  
                  </div>
                  <DataGrid
                    rows={materialRows}
                    columns={materialColumn}
                    pageSize={45}
                    rowsPerPageOptions={[8]}
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
              rowsPerPageOptions={[5]}
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
              rowsPerPageOptions={[5]}
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