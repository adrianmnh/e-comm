import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom/dist';
// import { HashRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import PageNotFound from './Pages/404';
import Footer from './Components/Footer/Footer';
import mens_banner from './Components/Assets/banner_mens.png';
import womens_banner from './Components/Assets/banner_women.png';
import kids_banner from './Components/Assets/banner_kids.png';

function App() {
  return (
    <div className="App">
			<BrowserRouter>

				<Navbar />

				<Routes>
					<Route path='/' element={<Shop />} />

					<Route path="/men" element={<Navigate to="/mens" />} />
					<Route path='/mens' element={<ShopCategory banner={mens_banner} category="men"/>} />

					<Route path='/women' element={<Navigate to='/womens' />} />
					<Route path='/womens' element={<ShopCategory banner={womens_banner} category='women'/>} />

					<Route path='kid' element={<Navigate to='/kids' />} />
					<Route path='/kids' element={<ShopCategory banner={kids_banner} category='kid'/>} />

					<Route path='/product' element={<Product />} >
						<Route path=':productId' element={<Product />} />
					</Route>

					<Route path='/cart' element={<Cart />} />

					<Route path='/login' element={<LoginSignup />} />

					<Route path='/not_valid' element={<PageNotFound />} />
					<Route path="/*" element={<Navigate to="/not_valid" />} />
				</Routes>

				{/* <Footer /> */}


			</BrowserRouter>

    </div>
  );
}

export default App;



// import React from "react";
// import "./App.css";
// import Navbar from "./comps/Navbar";
// import {
// 	BrowserRouter as Router,
// 	Routes,
// 	Route,
// } from "react-router-dom";
// import Home from "./pags";
// import About from "./pags/about";
// import Events from "./pags/events";
// import AnnualReport from "./pags/annual";
// import Teams from "./pags/team";
// import Blogs from "./pags/blogs";
// import SignUp from "./pags/signup";

// function App() {
// 	return (
// 		<Router>
// 			<Navbar />
// 			<Routes>
// 				<Route path="/" element={<Home />} />
// 				<Route path="/shop" element={<Shop />} />
// 				<Route
// 					path="/events"
// 					element={<Events />}
// 				/>
// 				<Route
// 					path="/annual"
// 					element={<AnnualReport />}
// 				/>
// 				<Route path="/team" element={<Teams />} />
// 				<Route path="/blogs" element={<Blogs />} />
// 				<Route
// 					path="/sign-up"
// 					element={<SignUp />}
// 				/>
// 			</Routes>

// 			{/* Placeholder HTML components */}
// 			<div className="d">
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 				<p className="test">helo</p>
// 			</div>

// 		</Router>
// 	);
// }

// export default App;
