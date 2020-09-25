import React from 'react';
import DrawerRight from './Drawer/DrawerRight'
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        width: "100%",
        zIndex: 1000,
        backgroundColor: "#ee384e",
        display: "flex",
        justifyContent: "space-between",
        padding: 10,
        height: 70
    },
    topRight:{
        display: "flex",
        alignItems: "center",
        color: "#fafafa",
    },
    topLeft:{
        color: "#fafafa",
        cursor: "pointer",
        margin: 5
    },
    digikalaText: {
        fontSize: "25px",
        fontWeight: 700,
        marginBottom: 0,
    }
}))

function DefaultHeader() {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            <div className={classes.topRight}>
                <ShoppingCartIcon className={classes.topLeft}/>
                <SearchIcon className={classes.topLeft}/>
            </div>
            <div className={classes.topRight}>
                <p className={classes.digikalaText}>MyShop</p>
                <DrawerRight />
            </div>
        </div >
    )
}

export default DefaultHeader
