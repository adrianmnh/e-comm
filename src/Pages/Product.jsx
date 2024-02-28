import React, { useContext } from 'react'
import './CSS/Product.css'
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
	// const {all_product} = useContext(ShopContext);
	const { allProduct, linkNameMap } = useContext(ShopContext);

	const { productLinkName, productId } = useParams();

	// const product = allProduct ? allProduct.find((e)=> e.id === Number(productId)) : null;

	// let prodName = productName.replaceAll('-.,','').replaceAll('-', ' ')
	// const product = allProduct ? allProduct.find((e)=> e.name === prodName) : null;

	// const product = allProduct ? allProduct.find((e)=> e.linkName === productName) : null;


	// allProduct is a MAP

	// const product = allProduct ? allProduct.get(Number(productId)) : null;
	// const product = allProduct ? allProduct.get(linkNameMap.get(productLinkName)) : null;
	const product = allProduct.get(linkNameMap.get(productLinkName))
	// console.log(product)


	return (
		<>
		{ product &&
			<div className="product">
			<Breadcrum product={product} />
			<ProductDisplay product={product} />
			<DescriptionBox />
			<RelatedProducts />
			</div>
		}
		</>
	)
}

export default Product
