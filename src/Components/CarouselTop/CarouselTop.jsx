import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TV from '../../assets/images/TV.jpg'
import Watch from '../../assets/images/Watch.jpg'
import radio from '../../assets/images/radio.jpg'
import nesquit from '../../assets/images/nesquit.jpg'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#b4fd45",
    }
}))

function CarouselTop() {
    let history = useHistory();
    const classes = useStyles();

    const handleClickTv = () => {
        history.push("/product/667");
    }
    const handleClickWatch = () => {
        history.push("/product/540");
    }
    const handleClickRadio = () => {
        history.push("/product/585");
    }
    const handleClickNesquit = () => {
        history.push("/product/482");
    }
    return (
        <Carousel autoPlay infiniteLoop showArrows={true} showThumbs={false} showStatus={false} className={classes.root}>
            <div onClick={handleClickWatch}>
                <img src={Watch} />
                {/* <p className="d-none d-lg-block legend">ساعت هوشمند</p> */}
            </div>
            <div onClick={handleClickTv}>
                <img src={TV} />
                {/* <p className="d-none d-lg-block legend">تلویزیون</p> */}
            </div>
            <div onClick={handleClickRadio}>
                <img src={radio} />
                {/* <p className="d-none d-lg-block legend">رادیو</p> */}
            </div>
            <div onClick={handleClickNesquit}>
                <img src={nesquit} />
                {/* <p className="d-none d-lg-block legend">نسکوئیت</p> */}
            </div>
        </Carousel>
    );
};

export default CarouselTop;