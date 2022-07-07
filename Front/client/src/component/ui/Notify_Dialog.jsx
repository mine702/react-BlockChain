//#region react
import React  from 'react';
import Web3 from 'web3';
//#endregion

//#region mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
//#endregion

import RealEstate from "../../contracts/RealEstate.json"
import { useState } from 'react';

let web3;
let instance;

function Notify_Dialog(props) {

  const { warningHead, warning, warningButton , value } = props
  const [open, setOpen] = React.useState(false);

    const [sellername] = useState(value[0].name);
    const [sellerAddress] = useState(value[0].MetaMaskAcc)
    const [housePrice] = useState(value[0].price)
    const [houseAddress] = useState(value[0].address)
    const [locations] = useState(value[0].location)
    const [buyername] = useState(value[1][0].name);
    const [buyAddress , setBuyAddress] = useState();

  
  useEffect(()=>{
    async function load() {            
      web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
      //setAccounts(await web3.eth.getAccounts());

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = RealEstate.networks[networkId];
      
      instance =  new web3.eth.Contract(RealEstate.abi, deployedNetwork.address);
      await instance.methods.PrintAddress().call((err,res)=>{
        setBuyAddress(res);
      })
    }  
    load();
  },[]);

  
  async function BuyHouse() {
    await instance.methods.buyRealEstate(sellerAddress, locations, sellername, buyername, houseAddress, housePrice).send({
        from: buyAddress,
        value: web3.utils.toWei(housePrice, "ether"),
        gas: 150000,
    }) 
}



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>{warningButton}</Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          {warningHead}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {warning}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>아니요</Button>
          <Button onClick={()=>{
            BuyHouse()
            handleClose()
          }} autoFocus>
            네
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Notify_Dialog;