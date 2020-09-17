import { Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import {api} from "../../WooCommerceRestApi/API"


function Home() {
    const [product, setProduct] = useState([]);
    const [pending, setpending] = useState(true);

    useEffect(() => {
        api.get("products",{per_page:20}).then(
            res => {
                setProduct(res.data);
                console.log(res.data);
                setpending(false)
            }
        ).catch(error => console.log(error))
    }, [])
    return (
        <div>
            {/* <Container/> */}

        </div>
    )
}

export default Home
