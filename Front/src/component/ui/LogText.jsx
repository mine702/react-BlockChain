import React from 'react';


function LogText(props){

    const {log} = props;

    return (        
        <div>
            {log.map((log) => (
            <p key={"msg"+ log}>{log.name} : {log.msg}</p>
            ))}
        </div>
    )
}

export default LogText;