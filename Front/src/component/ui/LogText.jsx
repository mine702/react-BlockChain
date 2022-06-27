import React from 'react';


function LogText(props){

    const {log} = props;

    return (
        
        <div>
            {log.map((log) => (
            <p>{log.name} : {log.msg}</p>
            ))}
        </div>
    )       

}

export default LogText;