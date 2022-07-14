//#region react
import React, { useState, useEffect } from 'react';
//#endregion

//#region mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//#endregion

//#region 라이브러리
import BuyHouse from "../../contracts/BuyHouse.json"
import Web3 from 'web3';
//#endregion

//#region 전역변수
let web3;
let instance;
let buyhouse = BuyHouse;
//#endregion

function Notify_Dialog(props) {

  const { warningHead, warning, warningButton, value } = props

  //#region useState
  const [open, setOpen] = React.useState(false);

  const [sellername] = useState(value[0].name);
  const [sellerAddress] = useState(value[0].MetaMaskAcc);
  const [housePrice] = useState(value[0].price);
  const [houseAddress] = useState(value[0].address);
  const [sellerImg] = useState(value[0].files);
  const [locations] = useState(value[0].location);
  const [buyername] = useState(value[1][0].name);
  const [tokkenId] = useState(value[0].tokkenId);

  const [accounts, setAccounts] = useState("");
  //#endregion

  useEffect(() => {
    async function load() {
      web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
      setAccounts(await web3.eth.getAccounts());
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = buyhouse.networks[networkId];
      instance = new web3.eth.Contract(buyhouse.abi, deployedNetwork.address);
    }

    load();
  }, []);

  //#region 구매(이벤트)
  async function BuyHouse() {
    try{
      console.log(sellerAddress)
      await instance.methods.buyRealEstate(sellerAddress, locations, sellername, sellerImg, buyername, houseAddress, housePrice, tokkenId).send({
        from: accounts[0],
        value: web3.utils.toWei(housePrice, "ether"),    //wei
        gas: 5000000,
      })
      alert("구매완료");
      window.location.replace("/post-MainPage");
    }
    catch(e){
      alert(e.message);
      window.location.replace("/post-MainPage");
    }
  }
  //#endregion

  //#region 구매 모달 open & close
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);    
  };
  //#endregion

  //#region 렌더링
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
          <Button onClick={() => {
            BuyHouse()
            handleClose()
          }} autoFocus>
            네
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  //#endregion
}

export default Notify_Dialog;