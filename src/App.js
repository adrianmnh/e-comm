import React, { useContext } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom/dist';
import { ShopContext } from './Context/ShopContext';
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
	const { apiEndpoint } = useContext(ShopContext);
	return (


		<div className='App'>
			<BrowserRouter>

				<Navbar />

				{apiEndpoint}

				<Routes>
					<Route path='/' element={<Shop />} />

					<Route path='/mens' element={<Navigate to='/men' />} />
					<Route path='/men' element={<ShopCategory banner={mens_banner} category='men' />} />

					<Route path='/womens' element={<Navigate to='/shop/women' />} />
					<Route path='/women' element={<Navigate to='/shop/women' />} />
					<Route path='/shop/women' element={<ShopCategory banner={womens_banner} category='women' />} />

					<Route path='kid' element={<Navigate to='/kids' />} />
					<Route path='/kids' element={<ShopCategory banner={kids_banner} category='kids' />} />

					{/* <Route path='/product' element={<Product />} >
						<Route path=':productId' element={<Product />} />
					</Route> */}

					{/* <Route path='/product' element={<Product />} >
						<Route path=':productName' element={<Product />} />
					</Route> */}

					<Route path='/shop/:productCategory' element={<Product />} >
						<Route path=':productLinkName' element={<Product />} />
						{/* <Route path=':productId' element={<Product />} /> */}
					</Route>

					<Route path='/cart' element={<Cart />} />

					<Route path='/login' element={<LoginSignup />} />

					{/* <Route path='/not_valid' element={<PageNotFound />} /> */}
					{/* <Route path='/not_valid' element={<PageNotFound />} /> */}
					<Route path='/*' element={<Navigate to='/' />} />
				</Routes>


				<Footer />

			</BrowserRouter >

		</div >
	);
}

export default App