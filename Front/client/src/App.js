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
import UserMyPage from "./component/page/UserMyPage";
import HouseInfoPage from "./component/page/HouseInfoPage";
import HouseInfoInsert from "./component/page/registration/HouseInfoInsert";
import HouseInfoUpdate from "./component/page/registration/HouseInfoUpdate"
import UserUpdatePage from "./component/page/UserUpdatePage"
function App(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<LoginPage />} />
                <Route path="post-NewMemberPage" element={<NewMemberPage />} />
                <Route path="post-MainPage" element={<MainPage  />} />
                <Route path="post-Checkout" element={<HouseInfoInsert/>} />
                <Route path="post-UserMyPage" element={<UserMyPage />} />
                <Route path="post-HouseInfoPage" element={<HouseInfoPage />} />
                <Route path="post-CorrectionForm" element={<HouseInfoUpdate />} />
                <Route path="post-UserUpdatePage" element={<UserUpdatePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;