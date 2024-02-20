import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
	const snapToTop = () => {
		window.scrollTo(0, 0)
	}

	console.log(props)

	const linkName = props.name.replace(' ', '-').toLowerCase()
	const productCategory = props.category
	// const productName = props.name.toCamelCase()

	const prices = () => {

		return (
			<div className="item-prices">
			{ !props.sale_price ?
			<div className="item-sale-price">
				${props.retail_price.toFixed(2)}
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
		)

	}

	// console.log(props.keyy)
	return (
		<div className="item">
			{/* <Link to={`/product/${props.id}`}><img onClick={snapToTop} src={props.image} alt="" /></Link> */}
			{/* <Link to={`/product/${linkName}`}><img onClick={snapToTop} src={props.image} alt="" /></Link> */}
			<Link to={`/shop/${productCategory}/${linkName}`}><img onClick={snapToTop} src={props.image} alt="" /></Link>
			<p className='item-name'>{props.name}</p>
			{prices()}

		</div>
	)
}

export default Item