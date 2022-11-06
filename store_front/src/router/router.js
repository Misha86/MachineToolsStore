import About from "../pages/About";
import Home from "../pages/Home";
import Contacts from '../pages/Contacts';
import ProductsList from '../pages/ProductsList';
import ProductDetails from '../pages/ProductDetails';
import NoPage from "../pages/NoPage";


export const publicRoutes = [
  { path: '/', component: Home, exact: true },
  { path: '/about', component: About, exact: true },
  { path: '/contacts', component: Contacts, exact: true },
  { path: '/categories/:slug/products', component: ProductsList, exact: true },
  { path: '/products/:slug', component: ProductDetails, exact: true },
  { path: '*', component: NoPage },
];
