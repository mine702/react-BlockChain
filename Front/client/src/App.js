import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
//import Web3 from 'web3';

// Pages
import MainPage from './component/page/MainPage';
import NewMemberPage from './component/page/NewMemberPage';
import LoginPage from './component/page/LoginPage';
import UserMyPage from "./component/page/UserMyPage";
import HouseInfoPage from "./component/page/HouseInfoPage";
import HouseInfoInsert from "./component/page/registration/HouseInfoInsert";
import HouseInfoUpdate from "./component/page/registration/HouseInfoUpdate"

function App(props) {

    // const [account, setAccount] = useState(); // state variable to set account.
  
    // useEffect(() => {
    // async function load() {
    //   const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    //   const accounts = await web3.eth.requestAccounts();
      
    //   setAccount(accounts[0]);
    // }

    // load();
    // }, []);
    

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
            </Routes>
        </BrowserRouter>
    );
}

export default App;