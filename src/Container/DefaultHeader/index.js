import React from 'react';
import DrawerRight from './Drawer/DrawerRight'
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

import { connect } from 'react-redux';

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
    topRight: {
        display: "flex",
        alignItems: "center",
        color: "#fafafa",
    },
    topLeft: {
        color: "#fafafa",
        cursor: "pointer",
        margin: 10
    },
    digikalaText: {
        fontSize: "25px",
        fontWeight: 700,
        marginBottom: 0,
    }
}))

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: 10,
        top: 8,
        border: `1px solid green`,
        fontFamily: "bYekan",
        backgroundColor: "#ffffff",
        color: "red"
    },
}))(Badge);

function DefaultHeader({ basketLength }) {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            <div className={classes.topRight}>
                <StyledBadge badgeContent={basketLength}>
                    <Link to="/basket">
                        <ShoppingCartIcon className={classes.topLeft} />
                    </Link>
                </StyledBadge>
                <Link to="/searchProduct">
                    <SearchIcon className={classes.topLeft} />
                </Link>
            </div>
            <div className={classes.topRight}>
                <p className={classes.digikalaText}>MyShop</p>
                <DrawerRight />
            </div>
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        basketLength: state.basketList.basket_list.length,
    }
}
export default connect(mapStateToProps, {})(DefaultHeader);