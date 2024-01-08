import React, { useState, useEffect } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useLocation } from 'react-router-dom'


const Navbar = () => {
	const location = useLocation();
	const [menu, setMenu] = useState("shop");

	useEffect(() => {
		const path = location.pathname;
		if (path === '/') {
			setMenu("shop");
		} else if (path === '/mens') {
			setMenu("mens");
		} else if (path === '/womens') {
			setMenu("womens");
		} else if (path === '/kids') {
			setMenu("kids");
		}
	}, [location.pathname]);

	return (
		<div className='navbar'>

			<div className="navbar-logo">
				<img src={logo} alt="" />
				<p>SHOPPER</p>
			</div>

			<ul className="navbar-menu">
				<li onClick={() => { setMenu("shop") }}><Link to='/'>Shop</Link> {menu === "shop" ? <hr /> : <></>}</li>
				<li onClick={() => { setMenu("mens") }}><Link to='/mens'>Men</Link> {menu === "mens" ? <hr /> : <></>}</li>
				<li onClick={() => { setMenu("womens") }}><Link to='/womens'>Women</Link> {menu === "womens" ? <hr /> : <></>}</li>
				<li onClick={() => { setMenu("kids") }}><Link to='/kids'>Kids</Link> {menu === "kids" ? <hr /> : <></>}</li>
			</ul>

			<div className="navbar-login-cart">
				<button>Login</button>
				<img src={cart_icon} alt="" />
				<div className="navbar-cart-count">0</div>
			</div>

		</div>
	)
}

export default Navbar
