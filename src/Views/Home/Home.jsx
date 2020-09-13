import React, { useState, useEffect } from 'react'
import {api} from "../../WooCommerceRestApi/API"


function Home() {
    const [product, setProduct] = useState([]);
    const [pending, setpending] = useState(true);

    useEffect(() => {
        api.get("products").then(
            res => {
                setProduct(res.data);
                console.log(res.data);
                setpending(false)
            }
        ).catch(error => console.log(error))
    }, [])
    return (
        <div>
            {
                pending ?
                    <h1 style={{ color: "red" }}>...pending</h1>
                    : product.map(item =>
                        <div key={item.id} >
                            {/* <h5>{item.name}</h5>
                            <h3>({item.id})</h3>
                            <p>{`${item.description}`}</p>
                            <img style={{width: "100px"}} src={item.images[0].src} /> */}
                        </div>
                    )
            }

        </div>
    )
}

export default Home
