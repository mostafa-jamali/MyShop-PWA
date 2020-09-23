import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TV from '../../assets/images/TV.jpg'
import Watch from '../../assets/images/Watch.jpg'
import radio from '../../assets/images/radio.jpg'
import nesquit from '../../assets/images/nesquit.jpg'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#b4fd45",
    }
}))

function CarouselTop() {
    const classes = useStyles();

    const onClickItem = () => {
        alert("hello")
    }
    return (
        <Carousel autoPlay infiniteLoop showArrows={false} showThumbs={false} showStatus={false} onClickItem={onClickItem} className={classes.root}>
            <div>
                <img src={Watch} />
                <p className="d-none d-lg-block legend">ساعت هوشمند</p>
            </div>
            <div>
                <img src={TV} />
                <p className="d-none d-lg-block legend">تلویزیون</p>
            </div>
            <div>
                <img src={radio} />
                <p className="d-none d-lg-block legend">رادیو</p>
            </div>
            <div>
                <img src={nesquit} />
                <p className="d-none d-lg-block legend">نسکوئیت</p>
            </div>
        </Carousel>
    );
};

export default CarouselTop;