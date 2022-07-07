import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Web3 from 'web3';

import { useLocation } from "react-router-dom";

// Pages
import MainPage from './component/page/MainPage';
import NewMemberPage from './component/page/NewMemberPage';
import LoginPage from './component/page/LoginPage';
import UserMyPage from "./component/page/UserMyPage";
import HouseInfoPage from "./component/page/HouseInfoPage";
import HouseInfoInsert from "./component/page/registration/HouseInfoInsert";
import HouseInfoUpdate from "./component/page/registration/HouseInfoUpdate"

import RealEstate from "../src/contracts/RealEstate.json"

let web3;
let instance;

function App(props) {

    useEffect(() => {
        async function load() {            
            web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
            
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = RealEstate.networks[networkId];
            
            instance =  new web3.eth.Contract(RealEstate.abi, deployedNetwork.address);
            // instance.methods.PrintAddress().call((err,res)=>{
            //     console.log(res);
            // })
            // //console.log(instance.methods.readRealEstate('대전').call());
            // instance.methods.readRealEstate('대전').call((err,res)=>{
            //     console.log(res);
            // })
        }
        load();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<LoginPage />} />
                <Route path="post-NewMemberPage" element={<NewMemberPage />} />
                <Route path="post-MainPage" element={<MainPage/>} />
                <Route path="post-Checkout" element={<HouseInfoInsert/>} />
                <Route path="post-UserMyPage" element={<UserMyPage />} />
                <Route path="post-HouseInfoPage" element={<HouseInfoPage />} />
                <Route path="post-CorrectionForm" element={<HouseInfoUpdate />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;