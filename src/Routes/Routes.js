import React from 'react';


const Home = React.lazy(() => import('../Views/Home/Home'));
const SingleP = React.lazy(() => import('../Views/SingleP/SingleP'));
const Categories = React.lazy(() => import('../Views/Categories/Categories'));
const ListOfProduct = React.lazy(() => import('../Views/ListOfProduct/ListOfProduct'));
const BasketPage = React.lazy(() => import('../Views/BasketPage/BasketPage'));
const FavoritePage = React.lazy(() => import('../Views/FavoritePage/FavoritePage'));


const routes= [
    { path: "/favorite", exact: true, component: FavoritePage },
    { path: "/basket", exact: true, component: BasketPage },
    { path: "/categories/:id", exact: true, component: Categories },
    { path: "/:runComponent", exact: true, component: ListOfProduct },
    { path: "/product/:id", exact: true, component: SingleP },
    { path: "/", exact: true, component: Home },
]

export default routes;