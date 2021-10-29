import React, { useContext } from "react"
import { NavLink, useHistory } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export const Navbar = () => {
	const auth = useContext(AuthContext)
	const history = useHistory()
	
	const logoutHandler = event => {
		event.preventDefault()
		auth.logOut()
		history.push('/')
	}

	return (
		<nav>
    <div className="nav-wrapper blue darken-1 self-p2">
			<span className="brand-logo">Links reduction</span>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><NavLink to="/create">Create</NavLink></li>
        <li><NavLink to="/links">Links</NavLink></li>
        <li><a href="/" onClick={logoutHandler}>Log out</a></li>
      </ul>
    </div>
  </nav>
	)
}