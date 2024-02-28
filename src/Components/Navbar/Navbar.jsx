import React, { useState, useRef, useEffect, useContext } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/shopping_cart_icon.png'
import { Link, useLocation } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import dropdown_menu_icon from '../Assets/navbar_dropdown.png'
import profile_icon from '../Assets/profile_icon.png'
import { AuthContext } from '../../Context/AuthContext'

const Navbar = () => {
	const location = useLocation();

	const [menu, setMenu] = useState("shop");
	const { getTotalCartItems } = useContext(ShopContext);
	const [expanded, setExpanded] = useState(false);

	const { logout } = useContext(AuthContext);

	const menuRef = useRef();
	const profileMenuRef = useRef();
	const profileRef = useRef();

	const dropdown_toggle = (e) => {
		menuRef.current.classList.toggle("navbar-menu-visible");
		e.target.classList.toggle("open");
	}

	const profile_dropdown_toggle = (e) => {

		if (windowSize.innerWidth < 2560 && windowSize.innerWidth > 1280) {
			setExpanded(!expanded);
			profileRef.current.classList.toggle('expand');
			profileMenuRef.current.classList.toggle("navbar-profile-menu-visible");
		} else {
			// if (expanded) {
			// 	profileRef.current.classList.remove("expand");
			// 	// profileMenuRef.current.classList.remove("navbar-profile-menu-visible");
			// 	setExpanded(false);
			// }
		}
	}

	const linkStyle = {
		textDecoration: 'none',
		color: 'black'
	};

	const [windowSize, setWindowSize] = useState(getWindowSize());

	useEffect(() => {
		function handleWindowResize() {
			setWindowSize(getWindowSize());
		}
		window.addEventListener('resize', handleWindowResize);
		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	function getWindowSize() {
		const { innerWidth, innerHeight } = window;
		return { innerWidth, innerHeight };
	}

	useEffect((innerWidth) => {
		if (windowSize.innerWidth > 2560 && windowSize.innerWidth < 1280) {
			profileRef.current.classList.remove("expand");
			profileMenuRef.current.classList.remove("navbar-profile-menu-visible");
			setExpanded(false);
		}
	}, [windowSize.innerWidth]);

	// useEffect(() => {

	// 	if (expanded && windowSize.innerWidth < 2560 && windowSize.innerWidth > 1280) {
	// 	} else {
	// 		setExpanded(false);
	// 		document.getElementsByClassName('navbar-profile')[0].classList.remove("expand");
	// 	}
	// }, [expanded, windowSize.innerWidth]);

	useEffect(() => {
		if (localStorage.getItem('auth-token')) {

			if (!expanded || windowSize.innerWidth >= 2560 || windowSize.innerWidth <= 1280) {
				setExpanded(false);
				document.getElementsByClassName('navbar-profile')[0].classList.remove("expand");
			}
		}
	}, [expanded, windowSize.innerWidth]);

	useEffect(() => {
		const path = location.pathname;
		if (path === '/') {
			setMenu("shop");
		} else if (path === '/men') {
			setMenu("men");
		} else if (path === '/women') {
			setMenu("women");
		} else if (path === '/kids') {
			setMenu("kids");
		} else {
			setMenu("");
		}
	}, [location.pathname]);

	return (

		<div className="navbar-wrapper">

			<div className='navbar'>

				<Link style={linkStyle} to='/'>
					<div className="navbar-logo" onClick={() => { setMenu("shop") }}>
						<img src={logo} alt="" />
						{/* <p>SHOPPER</p> */}
						<p className="navbar-tmp-ws">{windowSize.innerWidth} x {windowSize.innerHeight}</p>
					</div>
				</Link>

				<img className="navbar-dropdown" onClick={dropdown_toggle} src={dropdown_menu_icon} alt="" />
				<ul ref={menuRef} className="navbar-menu">
					<li onClick={() => { setMenu("shop") }}><Link style={linkStyle} to='/'>Shop</Link> {menu === "shop" ? <hr /> : <></>}</li>
					<li onClick={() => { setMenu("men") }}><Link style={linkStyle} to='/men'>Men</Link> {menu === "men" ? <hr /> : <></>}</li>
					<li onClick={() => { setMenu("women") }}><Link style={linkStyle} to='/shop/women'>Women</Link> {menu === "women" ? <hr /> : <></>}</li>
					<li onClick={() => { setMenu("kids") }}><Link style={linkStyle} to='/kids'>Kids</Link> {menu === "kids" ? <hr /> : <></>}</li>
				</ul>

				<div className="navbar-login-cart">

					<div className={`navbar-login`}>
						{localStorage.getItem('x-acceess-token') ?
							<button onClick={() => logout }>Logout</button> :
							<Link to='/login'><button>Login</button></Link>
						}
					</div>

					<div className={`navbar-cart`}>
						<Link to='/cart'><img src={cart_icon} alt="" /></Link>
						<div className="navbar-cart-count">{getTotalCartItems()}</div>
					</div>

					{localStorage.getItem('auth-token') &&
					<div ref={profileRef} className='navbar-profile' onClick={profile_dropdown_toggle}>
						<img className='navbar-profile-icon navbar-profile-dropdown' src={profile_icon} />
						<ul ref={profileMenuRef} className={`navbar-profile-menu ${windowSize.innerWidth < 2560 && windowSize.innerWidth > 1280 ? '' : 'hide'}`}>
							<li><Link to='/kids'>Kids menu</Link>{menu === "kids" ? <hr /> : <></>}</li>
							<li><Link to='/men'>men menu</Link>{menu === "men" ? <hr /> : <></>}</li>
							<li><Link to='/women'>Shop women</Link>{menu === "women" ? <hr /> : <></>}</li>
							<li><Link to='/'>Account</Link>{menu === "shop" ? <hr /> : <></>}</li>
						</ul>
					</div>}
				</div>
				{/* <div className="navbar-login-cart">
					<Link to='/login'><button>Login</button></Link>
					<Link to='/cart'><img src={cart_icon} alt="" /></Link>
					<div className="navbar-cart-count">{getTotalCartItems()}</div>
				</div> */}
			</div>
			<div className="navbar-placeholder"></div>
		</div>

	)
}

export default Navbar
