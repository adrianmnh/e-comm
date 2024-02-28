import React, { createContext, useState, useEffect } from "react";
// import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

	const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

	useEffect(() => {
		// awaitFetchAllProducts();
		fetchAllProducts();
	}, [])

	const toLinkName = (name) => {
		return name.replaceAll('-', ' ').trim().replaceAll(/\s+/g, '-').toLowerCase();
	}

	const [allProduct, setAllProduct] = useState(new Map());

	const [linkNameMap, setLinkNameMap] = useState(new Map());

	const getDefaultCart = () => {
		if (localStorage.getItem('cart')) {
			// let cart = JSON.parse(localStorage.getItem('cart'));
			// console.log('Cart from local storage: ', cart)
			// return new Map(cart);
			const cartItemsArray = JSON.parse(localStorage.getItem('cart'));
			const cart = new Map(cartItemsArray.map(([key, value]) => [key, new Map(value)]));
			return cart;
		}
		return new Map();

	}

	const [cartItems, setCartItems] = useState(getDefaultCart());

	const [totalCartAmount, setTotalCartAmount] = useState(0);
	useEffect(() => {
		setTotalCartAmount(getTotalCartAmount());
	}, [allProduct, cartItems]);

	useEffect(() => {
		handleCartChanges();
	}, [cartItems])

	const handleCartChanges = () => {
		// console.log('Cart items changed: ', cartItems);
		const cartItemsArray = Array.from(cartItems, ([key, value]) => [key, Array.from(value)]);
		localStorage.setItem('cart', JSON.stringify(cartItemsArray));
	}

	const fetchAllProducts = async () => {
		fetch(`${apiEndpoint}/all_product`)
			.then(res => {
				if (!res.ok) {
					if (res.state >= 500) {
						throw new Error('Server Error');
					}
					else {
						throw new Error('Unknown Error');
					}
				}
				return res.json();
			}).then(data => {

				// console.log('All products', data.all_product)
				const formattedData = new Map(Array.from(data.all_product, ([key, product]) => [
					key,
					{
						...product,
						id: key,
						name: product.name.toLowerCase(),
						linkName: `${key}-${toLinkName(product.name)}` // Assign the proper linkName value using the toLinkName function
					}
				]));

				setLinkNameMap(new Map(Array.from(formattedData, ([key, product]) => [
					product.linkName,
					key
				])));

				setAllProduct(formattedData)

			})

			.catch(error => {
				console.log(error);
			})
	}

	// const addToCart = (itemId) => {
	// 	setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
	// }

	// const removeFromCart = (itemId) => {
	// 	setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
	// }

	// const removeItemFromCart = (itemId) => {
	// 	setCartItems((prev) => ({ ...prev, [itemId]: 0 }))
	// }

	const addToCart = (itemId, selectedSize) => {
		setCartItems((prev) => {
			const itemSizes = prev.get(itemId) || new Map();
			const newSizeCount = (itemSizes.get(selectedSize) || 0) + 1;
			itemSizes.set(selectedSize, newSizeCount);
			return new Map(prev).set(itemId, itemSizes);
		});
	};

	const removeFromCart = (itemId, selectedSize) => {
		setCartItems((prev) => {
			const itemSizes = prev.get(itemId);
			if (itemSizes) {
				const newSize = itemSizes.get(selectedSize) - 1;
				if (newSize > 0) {
					itemSizes.set(selectedSize, newSize);
				} else {
					itemSizes.delete(selectedSize);
					if(itemSizes.size === 0) {
						prev.delete(itemId)
					}
				}
			}
			return new Map(prev);
			// const newItems = new Map(prev)
			// const itemSizes = newItems.get(itemId);
			// if (itemSizes) {
			// 	const newSizes = new Map(itemSizes);
			// 	const newSize = newSizes.get(selectedSize) - 1;
			// 	if (newSize > 0) {
			// 		newSizes.set(selectedSize, newSize);
			// 	} else {
			// 		newSizes.delete(selectedSize);
			// 	}
			// 	newItems.set(itemId, newSizes);
			// }
			// return newItems;
		})
	}

	const removeItemFromCart = (itemId, selectedSize) => {
		setCartItems((prev) => {
			const itemSizes = prev.get(itemId);
			itemSizes?.delete(selectedSize);
			if (itemSizes?.size === 0) {
			  prev.delete(itemId);
			}
			return new Map(prev);
			// const newItems = new Map(prev);
			// const newSizes = newItems.get(itemId)
			// newSizes.delete(selectedSize);
			// if( newSizes.size === 0) {
			// 	newItems.delete(itemId)
			// } else {
			// 	newItems.set(itemId, newSizes)
			// }
			// return newItems;
		});
	};

	const getTotalCartAmount = () => {
		let totalAmount = 0;
		if (allProduct.size > 0) {
			// for (const itemId of cartItems.keys()) {
			// 	let itemInfo = allProduct.get(itemId)
			// 	let price = !itemInfo.sale_price ? itemInfo.retail_price : itemInfo.sale_price;
			// 	totalAmount += price * cartItems.get(itemId);
			// }
			// return totalAmount;
			for (const [itemId, sizeMap] of cartItems.entries()) {
				// console.log('Item ID: ', itemId, sizeMap);
				let itemInfo = allProduct.get(itemId)
				for (const [size, quantity] of sizeMap.entries()) {
					let price = !itemInfo.sale_price ? itemInfo.retail_price : itemInfo.sale_price;
					totalAmount += price * quantity;
				}
				// let price = !itemInfo.sale_price ? itemInfo.retail_price : itemInfo.sale_price;
				// totalAmount += price * cartItems.get(itemId);
			}
			return totalAmount;
		}
	}

	const getTotalCartItems = () => {
		let totalItems = 0;
		for (const count of cartItems.values()) {
			for (const quantity of count.values()) {
				totalItems += quantity;
			}
		}
		return totalItems;
	}

	const contextValue = {
		apiEndpoint, toLinkName, allProduct, linkNameMap,
		cartItems, addToCart, removeFromCart, removeItemFromCart, getTotalCartAmount, getTotalCartItems
	};

	return (
		<ShopContext.Provider value={contextValue}>
			{props.children}
		</ShopContext.Provider>

	)
}

export default ShopContextProvider;