import React, { useState, useRef, useEffect, useContext } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useLocation } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import dropdown_icon from '../Assets/navbar_dropdown_icon.png'


const Navbar = () => {
	const location = useLocation();

	const [menu, setMenu] = useState("shop");
	const {getTotalCartItems} = useContext(ShopContext);
	const menuRef = useRef();

	const dropdown_toggle = (e) => {
		menuRef.current.classList.toggle("navbar-menu-visible");
		e.target.classList.toggle("open");
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
	const {innerWidth, innerHeight} = window;
	return {innerWidth, innerHeight};
  }

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

		<div className="navbar-wrapper">

			<div className='navbar'>

				<Link style={linkStyle} to='/'>
					<div className="navbar-logo" onClick={() => { setMenu("shop") }}>
							<img src={logo} alt="" />
							{/* <p>SHOPPER</p> */}
							<p className="navbar-tmp-ws">{windowSize.innerWidth} x {windowSize.innerHeight}</p>
					</div>
				</Link>
				<img className="navbar-dropdown" onClick={dropdown_toggle} src={dropdown_icon} alt="" />
				<ul ref={menuRef} className="navbar-menu">
					<li onClick={() => { setMenu("shop") }}><Link style={linkStyle} to='/'>Shop</Link> {menu === "shop" ? <hr /> : <></>}</li>
					<li onClick={() => { setMenu("mens") }}><Link style={linkStyle} to='/mens'>Men</Link> {menu === "mens" ? <hr /> : <></>}</li>
					<li onClick={() => { setMenu("womens") }}><Link style={linkStyle} to='/womens'>Women</Link> {menu === "womens" ? <hr /> : <></>}</li>
					<li onClick={() => { setMenu("kids") }}><Link style={linkStyle} to='/kids'>Kids</Link> {menu === "kids" ? <hr /> : <></>}</li>
				</ul>

				<div className="navbar-login-cart">
					<Link to='/login'><button>Login</button></Link>
					<Link to='/cart'><img src={cart_icon} alt="" /></Link>
					<div className="navbar-cart-count">{getTotalCartItems()}</div>
				</div>

			</div>
			<div className="navbar-placeholder"></div>
		</div>

	)
}

export default Navbar
