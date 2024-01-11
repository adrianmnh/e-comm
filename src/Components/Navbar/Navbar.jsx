import React, { useState, useEffect } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useLocation } from 'react-router-dom'


const Navbar = () => {
	const location = useLocation();
	const [menu, setMenu] = useState("shop");
	const linkStyle = {
		textDecoration: 'none',
		color: 'black'
	};

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
		} else {
			setMenu("");
		}
	}, [location.pathname]);

	return (
		<div className='navbar'>

			<Link style={linkStyle} to='/'>
				<div className="navbar-logo" onClick={() => { setMenu("shop") }}>
						<img src={logo} alt="" />
						<p>SHOPPER</p>
				</div>
			</Link>

			<ul className="navbar-menu">
				<li onClick={() => { setMenu("shop") }}><Link style={linkStyle} to='/'>Shop</Link> {menu === "shop" ? <hr /> : <></>}</li>
				<li onClick={() => { setMenu("mens") }}><Link style={linkStyle} to='/mens'>Men</Link> {menu === "mens" ? <hr /> : <></>}</li>
				<li onClick={() => { setMenu("womens") }}><Link style={linkStyle} to='/womens'>Women</Link> {menu === "womens" ? <hr /> : <></>}</li>
				<li onClick={() => { setMenu("kids") }}><Link style={linkStyle} to='/kids'>Kids</Link> {menu === "kids" ? <hr /> : <></>}</li>
			</ul>

			<div className="navbar-login-cart">
				<Link to='/login'><button>Login</button></Link>
				<Link to='/cart'><img src={cart_icon} alt="" /></Link>
				<div className="navbar-cart-count">0</div>
			</div>

		</div>
	)
}

export default Navbar
