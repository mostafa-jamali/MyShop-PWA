import React from 'react';
import DrawerRight from '../../Components/Drawer/DrawerRight'
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
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
        fontSize: "35px",
        fontWeight: 700,
        marginBottom: 0,
        [theme.breakpoints.down('xs')]: {
            fontWeight: 600,
            fontSize: "25px",
        },
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
                <p className={classes.digikalaText}>digikala</p>
                <DrawerRight />
            </div>
        </div >
    )
}

export default DefaultHeader
