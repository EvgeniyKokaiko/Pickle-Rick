import React from "react";
import {NavLink} from "react-router-dom";
import Logo from "../assets/Logo.png"

const NavBar = (): JSX.Element => {
    return (
        <div className="nav_container">
            <img className="nav_logo" src={Logo} alt="Logo"/>
            <NavLink  className="ui inverted orange button" exact to="/Characters">Characters</NavLink>
            <NavLink className="ui inverted orange button" exact to="/Episodes">Episodes</NavLink>
            <NavLink className="ui inverted orange button" exact to="/Locations">Locations</NavLink>
            <NavLink className="ui inverted orange button" exact to="/MyList">MyList</NavLink>
        </div>
    )
}


export default NavBar