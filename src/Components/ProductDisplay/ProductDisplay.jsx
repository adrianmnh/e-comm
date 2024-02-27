import React, { useContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {

	const { product } = props;
	const { addToCart } = useContext(ShopContext);
	const [selectedSize, setSelectedSize] = useState('')

	const navigate = useNavigate();
	const location = useLocation();

	const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl']

	const [unavailableSizes, setUnavailableSizes] = useState([])

	useEffect(() => {
		if(product){
			console.log(product.inventory)
			const availableSizes = new Map(product.inventory.fromEntries());
			console.log(availableSizes)
			// const unavailableSizes =
			// setUnavailableSizes(unavailableSizes);
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
		if (selectedSize === '') {
			alert('Please select a size')
		} else {
			addToCart(product.id, selectedSize)
		}
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
							onClick={() => handleSizeChange('xs')}
							className={selectedSize === 'xs' ? 'selected-size' : ''}>	XS	</div>
						<div
							onClick={() => handleSizeChange('s')}
							className={selectedSize === 's' ? 'selected-size' : ''}>	S	</div>
						<div
							onClick={() => handleSizeChange('m')}
							className={selectedSize === 'm' ? 'selected-size' : ''}>	M	</div>
						<div
							onClick={() => handleSizeChange('l')}
							className={selectedSize === 'l' ? 'selected-size' : ''}>	L	</div>
						<div
							onClick={() => handleSizeChange('xl')}
							className={selectedSize === 'xl' ? 'selected-size' : ''}>	XL	</div>
						{/* <div
							onClick={() => handleSizeChange('XXL')}
							className={selectedSize === 'XXL' ? 'selected-size' : ''}
						>
							XXL
						</div> */}
					</div>
				</div>
				<button onClick={() => handleAddToCart()}>ADD TO CART</button>
				<p className="productdisplay-right-category"><span>Category: </span>Women, T-Shirt, Crop Top</p>
				<p className="productdisplay-right-category"><span>Tags: </span>Modern, Latest</p>
			</div>
		</div>
	)
}

export default ProductDisplay
