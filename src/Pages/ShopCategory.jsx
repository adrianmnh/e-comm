import React, { useContext, useEffect, useMemo } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {

	const { allProduct, linkNameMap } = useContext(ShopContext)

	const filteredProducts = useMemo(() => {
		if (!allProduct) return [];

		return Array.from(allProduct.entries())
			.filter(([key, item]) => props.category === item.category);
	}, [allProduct, props.category]);

	return (
		<div className="shop-category">
			{/* <img className="shopcategory-banner" src={props.banner} alt="" /> */}
			<div className="shopcategory-indexSort">
				<p>
					<span>Showing 1-12</span> out of 36 products
				</p>
				<div className="shopcategory-sort">
					Sort by <img src={dropdown_icon} alt="" />
				</div>
			</div>
			<div className="shopcategory-products">

				{filteredProducts.map(([key, item]) => {
					return (
						<Item
							key={key}
							id={item.id}
							name={item.name}
							image={item.image}
							category={item.category}
							retail_price={item.retail_price}
							sale_price={item.sale_price ? item.sale_price : null}
							linkName={item.linkName}
							// sizes
						/>
					);
				})}

				{/* {	productsByCategory.length > 0 &&
					productsByCategory.map((item, i) => {
						return <Item key={i} id={item.id} name={item.name} image={item.image} category={item.category}
							retail_price={item.retail_price} sale_price={item.sale_price ? item.sale_price : null}
							linkName={item.linkName} sizes />
					})
				} */}


			</div>
			<div className="shopcategory-loadmore">
				Explore More
			</div>

		</div>
	)
}

export default ShopCategory
