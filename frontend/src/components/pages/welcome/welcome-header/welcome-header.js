import React from "react";
import WelcomeLogo from '../../../../images/welcome-icon.svg';

import "./welcome-header.css";

const WelcomeHeader = () => {
    return (
        <div  id="welcome-header-menu" style={{float: "left"}} >
            <img src={WelcomeLogo} alt="" style={{width: "55%"}}/>
        </div>
    );
}

export default WelcomeHeader;