import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

// icon
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StarIcon from '@material-ui/icons/Star';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';


const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
    direction: "rtl",
  },
  listItem: {
    textAlign: "right"
  },
  ListItemIcon: {
    minWidth: "auto",
    margin: 5,
  },
  user: {
    height: 80,
    direction: "rtl",
    backgroundColor: "#ee384e",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    padding: 15,
  },
  userButton: {
    borderRadius: 10,
    border: "2px solid #fafafa",
    color: "#fafafa",
    marginRight: 5
  },
  MenuIcon: {
    color: "#fafafa",
    fontSize: "25px",
  }
}));

export default function SwipeableTemporaryDrawer() {
  let { id } = useParams()

  const classes = useStyles();
  const [state, setState] = React.useState({ right: false });
  const [rightMenuTop, setRightMenuTop] = React.useState([
    { text: 'خانه', icon: <HomeIcon /> , path:'/'},
    { text: 'لیست دسته‌بندی محصولات', icon: <ListIcon />, path: `/categories/52`},
    { text: 'لیست محصولات مورد علاقه', icon: <FavoriteIcon /> ,path: ''},
  ]);
  const [rightMenuDown, setRightMenuDown] = React.useState([
    { text: 'تنظیمات', icon: <SettingsIcon /> , path:'/'},
    { text: 'جدیدترین‌ها', icon: <StarIcon />, path: `/Newest`},
    { text: 'پرامتیازترین', icon: <StarIcon /> ,path: '/HighestScore'},
  ]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.user}>
        <PersonIcon fontSize="large" style={{ color: "#fafafa" }} />
        <Button variant="outlined" className={classes.userButton}>ورود و ثبت نام</Button>
      </div>

      <List>
        {rightMenuTop.map((item) => (
          <ListItem button key={item.text} className={classes.listItem} component={Link} to={item.path}>
            <ListItemIcon className={classes.ListItemIcon}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider />

      <ListItem button className={classes.listItem}>
        <ListItemIcon className={classes.ListItemIcon}><ShoppingCartIcon /></ListItemIcon>
        <ListItemText primary={"سبد خرید"} />
      </ListItem>

      <Divider />

      <List>
        {rightMenuDown.map((item) => (
          <ListItem button key={item.text} className={classes.listItem} component={Link} to={item.path}>
            <ListItemIcon className={classes.ListItemIcon}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton color="inherit" onClick={toggleDrawer("right", true)} >
          <MenuIcon className={classes.MenuIcon} />
        </IconButton>
        <SwipeableDrawer anchor={"right"} open={state["right"]} onClose={toggleDrawer("right", false)} onOpen={toggleDrawer("right", true)} >
          {list("right")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
