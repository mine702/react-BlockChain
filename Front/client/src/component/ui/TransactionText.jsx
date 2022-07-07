import React from 'react';


function TransactionText(props){

    const {log} = props;

    return (        
        <div>
            {log.map((log, index) => (
            <p key={index}>판매자 : {log.sellerName}&nbsp;&nbsp;&nbsp; 구매자 : {log.buyerName}&nbsp;&nbsp;&nbsp; 가격 : {log.housePrice} </p>
            ))}
        </div>
    )
}

export default TransactionText;