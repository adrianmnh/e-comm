import React, { createContext, useState, useEffect, useContext } from 'react'
import { ShopContext } from './ShopContext';

export const AuthContext = createContext(null)

const AuthContextProvider = (props) => {

	const { apiEndpoint } = useContext(ShopContext);

	const [userIsLoggedIn, setUserIsLoggedIn] = useState();

	useEffect(() => {
		const token = localStorage.getItem('x-access-token');
		if (token) {
			console.log('Token found')
			setUserIsLoggedIn(true);
		}
	}, [])

	const loginApi = async ( formData ) => {
		return await fetch(`${apiEndpoint}/login`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		}).then(res => {
			console.log(res)
			if (!res.ok) {
				if (res.states >= 500) {
					console.log('500: Server error')
					throw new Error('Network error. Failed to Login');
				}
				if (res.status === 401) { // Unauthorized
					console.log("401: Incorrect password")
					return { success: false, message: "Incorrect password" };
				}
				if (res.status === 404) { // Unauthorized
					console.log("404: User not found")
					return { success: false, message: "User not found" };
				}
			}
			return res.json()
		}).then(data => {
			return data;
		}).catch(error => {
			console.log('Error caught: ', error)
			return { success: false, message: error.message };
		})
	}

	const signupApi = async (formData) => {
		return await fetch(`${apiEndpoint}/signup`, {

			// Now you can use the `homepage` variable in your component. , {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		}).then(res => {
			if (!res.ok) {
				if (res.status === 401) { // Unauthorized
					throw new Error('Incorrect password');
				} else {
					throw new Error('Network error. Failed to Signup');
				}
			}
			return res.json()
		}).then(data => {
			return data;
		}).catch(error => {
			console.log(error)
			return { success: false, message: error.message };
		})
	}

	const logout = () => {
		setUserIsLoggedIn(false);
		localStorage.removeItem('x-access-token');
		localStorage.removeItem('cart');
		setTimeout(() => {
			window.location.replace('/')
		}, 1000)

	}


	const contextValue = {
		loginApi, signupApi, logout,
		userIsLoggedIn, setUserIsLoggedIn
	}

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider