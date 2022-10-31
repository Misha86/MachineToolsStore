import About from "../pages/About";
import Home from "../pages/Home";
import Contacts from '../pages/Contacts';
import NoPage from "../pages/NoPage";


export const publicRoutes = [
  { path: '/', component: Home, exact: true },
  { path: '/about', component: About, exact: true },
  { path: '/contacts', component: Contacts, exact: true },
  { path: '*', component: NoPage },
];
