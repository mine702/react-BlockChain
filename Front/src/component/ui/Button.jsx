import React from "react";

function Button(props) {
    const { title, onClick, classtype } = props;

    return <button type="submit" class={classtype} onClick={onClick}>{title || "button"}</button>
}

export default Button;