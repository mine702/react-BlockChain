//#region 상위 컴포넌트
import React from 'react';
//#endregion


function TransactionText(props){

    const {log} = props;

    //#region 렌더링
    return (        
        <div>
            {log.map((log, index) => (
            <p key={index}>판매자 : {log.sellerName}&nbsp;&nbsp;&nbsp; 구매자 : {log.buyerName}&nbsp;&nbsp;&nbsp; 가격 : {log.housePrice} </p>
            ))}
        </div>
    )
    //#endregion
}

export default TransactionText;