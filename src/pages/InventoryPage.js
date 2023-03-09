import React from 'react';
import Navbar from '../components/Navbar';
import Inventory from '../components/Inventory';
import { Inventory2 } from '../components/Inventory2';
import "./InventoryPage.css";

const InventoryPage = () => {
    return (
        <>
            <Navbar />
            <Inventory />
            <Inventory2 />
        </>
    )
};

export default InventoryPage