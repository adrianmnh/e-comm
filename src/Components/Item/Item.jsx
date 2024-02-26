import React, { useContext } from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext';

const Item = (props) => {
	const snapToTop = () => {
		window.scrollTo(0, 0)
	}

	const { toLinkName } = useContext(ShopContext);

	const linkName = props.linkName
	const productCategory = props.category


	return (
		<div className="item">
			{/* <Link to={`/product/${props.id}`}><img onClick={snapToTop} src={props.image} alt="" /></Link> */}
			{/* <Link to={`/product/${linkName}`}><img onClick={snapToTop} src={props.image} alt="" /></Link> */}
			{/* <Link to={`/shop/${productCategory}/${linkName}`}><img onClick={snapToTop} src={props.image} alt="" /></Link> */}
			<Link to={`/shop/${productCategory}/${props.linkName}`}><img onClick={snapToTop} src={props.image} alt="" /></Link>
			<p className='item-name'>{props.name}</p>
			{/* {prices()} */}

			<div className="item-prices">
			{ !props.sale_price || !props.sale_price === 0 ?
			<div className="item-sale-price">
				${props.retail_price ? props.retail_price.toFixed(2) : null}
			</div>
			:
			<>
			<div className="item-sale-price">
				${props.sale_price.toFixed(2)}
			</div>
			<div className="item-retail-price">
				${props.retail_price.toFixed(2)}
			</div>
			</>
			}
		</div>

		</div>
	)
}

export default Item