import React, {useEffect, useState} from 'react'
import { useParams, Redirect } from 'react-router-dom';
import { api } from "../../WooCommerceRestApi/API"

function Product() {
    let { id } = useParams()
    const [newProduct, setNewProduct] = useState([]);

    useEffect(() => {
        api.get(`products/${id}`).then(
            res => {
                setNewProduct(res.data);
            }
        )
    }, [])

    return (
        <div>
            <h1>{newProduct.name}</h1>
            <h1>{newProduct.id}</h1>
        </div>
    )
}

export default Product
