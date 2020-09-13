import React from 'react';
import DrawerRight from '../../Components/Drawer/DrawerRight'

function DefaultHeader() {
    return (
        <div className="d-flex justify-content-between align-items-center" style={{ height: "70px" }}>
            <DrawerRight/>
        </div >
    )
}

export default DefaultHeader
