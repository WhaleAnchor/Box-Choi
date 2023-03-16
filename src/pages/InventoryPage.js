import React from 'react';
import Navbar from '../components/Navbar';
import InventoryAdd from '../components/InventoryAdd';
import { InventoryTables } from '../components/InventoryTables';
import "./InventoryPage.css";

const InventoryPage = () => {
    return (
        <div className="InventoryPageWrapper">
            <Navbar />
            <div className='InventoryContentWrapper'>
                <InventoryAdd />   
                <InventoryTables />
            </div>
        </div>
    )
};

export default InventoryPage