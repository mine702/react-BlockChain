//#region 상위 컴포넌트
import React from 'react';
//#endregion

//#region 채팅 로그 기록 함수
function LogText(props){

    const {log} = props;

    return (        
        <div>
            {log.map((log, index) => (
            <p key={index}>{log.name} : {log.msg}</p>
            ))}
        </div>
    )
}
//#endregion

export default LogText;