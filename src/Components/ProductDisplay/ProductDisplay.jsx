import React, { useContext, useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext';
import CartItems from '../CartItems/CartItems';

const ProductDisplay = (props) => {

	const { product } = props;
	const { addToCart, cartItems } = useContext(ShopContext);
	const [selectedSize, setSelectedSize] = useState('')
	const addToCartRef = useRef();

	useEffect (() => {
		console.log(product.inventory)
	}, [])

	const [cartErrorMsg, setCartErrorMsg] = useState('SELECT SIZE')

	const navigate = useNavigate();
	const location = useLocation();

	const [noSizeHover, setNoSizeHover] = useState(false)

	const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl']

	const [unavailableSizes, setUnavailableSizes] = useState([])

		useEffect(() => {
		if (product) {
			sizes.forEach(size => {
				if (!unavailableSizes.includes(size)) {
					// 		console.log(1)
					const cartItemQuantity = cartItems.get(product.id)?.get(size) || 0;
					const inventoryQuantity = product.inventory[size];

					if (cartItemQuantity >= inventoryQuantity) {
						// 			console.log(2)
						setUnavailableSizes(prevSizes => [...prevSizes, size]);
					}
				}
			});
		}
	}, [product, cartItems, unavailableSizes]);

	useEffect(() => {
		if (product) {
			setUnavailableSizes(Object.entries(product.inventory).filter(([size, quantity]) => quantity === 0).map(([size, quantity]) => size))
		}
	}, [product]);

	useEffect(() => {

		const searchParams = new URLSearchParams(location.search);
		const size = searchParams.get('size')?.toLowerCase();
		const isSizeValid = sizes.includes(size);
		const isSizeOnlyParam = Array.from(searchParams.keys()).length === 1 && searchParams.has('size');

		if (isSizeValid && isSizeOnlyParam) {
			setSelectedSize(size);
		} else {
			navigate(location.pathname); // Navigate to the current path without any query parameters
		}
	}, []);

	const handleAddToCart = () => {
		// console.log('selectedSize: ', selectedSize)
		console.log(unavailableSizes)
		if (sizes.includes(selectedSize) && !unavailableSizes.includes(selectedSize)) {
			console.log('gets here', true)
			if (checkAvailability()) {
				addToCart(product.id, selectedSize)
				console.log('Added to cart complete')
			}
		}
	}

	const checkAvailability = () => {
		if ((cartItems.get(product.id)?.get(selectedSize) || 0) <= product.inventory[selectedSize]) {
			console.log(true, cartItems.get(product.id)?.get(selectedSize) || 0, 'inner check', product.inventory[selectedSize])
			return true
		} else if (!cartItems.get(product.id)) {
			console.log(false, 'nothing in cart with this ID')
			// console.log('Adding to cart')
			return true
		}
		console.log(false, 'not enough in inventory')

		return false
	}

	const getPrices = () => {
		if (!product.sale_price) {
			return (<div className="productdisplay-right-price-new">${product.retail_price.toFixed(2)}</div>)
		} else {
			return (
				<>
					<div className="productdisplay-right-price-retail">${product.retail_price.toFixed(2)}</div>
					<div className="productdisplay-right-price-sale">${product.sale_price.toFixed(2)}</div>
				</>
			)

		}
	}

	const handleSizeChange = (size) => {
		setSelectedSize(size)
		navigate(`?size=${size.toLowerCase()}`);
	}

	return (
		<div className="productdisplay">
			<div className="productdisplay-left">
				<div className="productdisplay-img-list">
					<img src={product.image} alt="" />
					<img src={product.image} alt="" />
					<img src={product.image} alt="" />
					<img src={product.image} alt="" />
				</div>
				<div className="productdisplay-img">
					<img className="productdisplay-main-img" src={product.image} alt="" />
				</div>
			</div>
			<div className="productdisplay-right">
				<h1 className='productdisplay-product-name'>{product.name}</h1>
				<div className="productdisplay-right-stars">
					<img src={star_icon} alt="" />
					<img src={star_icon} alt="" />
					<img src={star_icon} alt="" />
					<img src={star_icon} alt="" />
					<img src={star_dull_icon} alt="" />
					<p>(122)</p>
				</div>
				<div className="productdisplay-right-prices">

					{getPrices()}

				</div>
				<div className="productdisplay-right-description">
					A lightweight, usually knitted pullover sweater that is worn over a shirt, polo, or t-shirt to provide additional warmth and comfort.
				</div>
				<div className="productdisplay-right-size">
					<h1>Select Size</h1>
					<div className="productdisplay-right-sizes">

						<div
							onClick={() => !unavailableSizes.includes('xs') && handleSizeChange('xs')}
							className={`${selectedSize === 'xs' ? 'selected-size' : ''} ${unavailableSizes.includes('xs') ? 'unavailable' : ''}`}
						>
							XS
						</div>
						<div
							onClick={() => !unavailableSizes.includes('s') && handleSizeChange('s')}
							className={`${selectedSize === 's' ? 'selected-size' : ''} ${unavailableSizes.includes('s') ? 'unavailable' : ''}`}
						>
							S
						</div>
						<div
							onClick={() => !unavailableSizes.includes('m') && handleSizeChange('m')}
							className={`${selectedSize === 'm' ? 'selected-size' : ''} ${unavailableSizes.includes('m') ? 'unavailable' : ''}`}
						>
							M
						</div>
						<div
							onClick={() => !unavailableSizes.includes('l') && handleSizeChange('l')}
							className={`${selectedSize === 'l' ? 'selected-size' : ''} ${unavailableSizes.includes('l') ? 'unavailable' : ''}`}
						>
							L
						</div>
						<div
							onClick={() => !unavailableSizes.includes('xl') && handleSizeChange('xl')}
							className={`${selectedSize === 'xl' ? 'selected-size' : ''} ${unavailableSizes.includes('xl') ? 'unavailable' : ''}`}
						>
							XL
						</div>
					</div>
				</div>
				<button className={`add-to-cart-btn ${selectedSize === '' ? 'no-size-selected' : ''}`}
					// ref={addToCartRef}
					onMouseEnter={() => selectedSize === '' && setNoSizeHover(true)}
					onMouseLeave={() => setNoSizeHover(false)}
					onClick={() => handleAddToCart()}>{noSizeHover && selectedSize === '' ? 'SELECT SIZE' : 'ADD TO CART'}
				</button>

				<p className="productdisplay-right-category"><span>Category: </span>Women, T-Shirt, Crop Top</p>
				<p className="productdisplay-right-category"><span>Tags: </span>Modern, Latest</p>
			</div>
		</div>
	)
}

export default ProductDisplay
