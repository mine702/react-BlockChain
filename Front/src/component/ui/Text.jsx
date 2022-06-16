import React from "react";

function Text(props) {
    const { value, onChange } = props;
    return (
        <input type="text" value={value} onChange={onChange}></input>
    )
}

export default Text;