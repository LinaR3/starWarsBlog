import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext"; 
import { Home } from "./views/Home";
import { Detail } from "./views/Detail";
import { Navbar } from "./components/Navbar";
import "./index.css"; 

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/detail/:type/:id" element={<Detail />} />
                <Route path="*" element={<h1 className="text-white p-10">Página no encontrada</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export default injectContext(App);