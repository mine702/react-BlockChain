import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

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