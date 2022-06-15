import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

// Pages
import MainPage from './component/page/MainPage';
import NewMemberPage from './component/page/NewMemberPage';
import LoginPage from './component/page/LoginPage';
import Checkout from "./component/page/registration/CheckOutForm";
import TestPage from './component/page/TestPage';
function App(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<TestPage />} />
                <Route path="post-NewMemberPage" element={<NewMemberPage />} />
                <Route path="post-MainPage" element={<MainPage />} />
                <Route path="post-Checkout" element={<Checkout />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;