import React from 'react';


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

export default LogText;