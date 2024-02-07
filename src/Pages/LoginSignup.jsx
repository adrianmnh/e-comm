import React, { useState } from 'react'
import './CSS/LoginSignup.css'
// import Popup from 'reactjs-popup';

const LoginSignup = () => {

	const [state, setState] = useState('Sign Up');
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		email: '',
	})

	const [alertMessage, setAlertMessage] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const [agree, setAgree] = useState(false);


	const login = async () => {
		console.log('login', formData)
	}

	const alert = (message, timeout) => {
		setAlertMessage(message);
		setShowAlert(true);
		setTimeout(() => {
			setShowAlert(false);
		}, timeout)
	}

	const signup = async () => {

		if(!formData.username || !formData.email || !formData.password){
			alert('All fields are required', 1100)
			return
		}
		if (agree === false) {
			alert('Please agree to the terms of use & policy', 1200)
			return;
		}

		console.log('signup', formData)

		let responseData;
		// api/ users/ signup
		await fetch('http://localhost:4000/signup', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		}).catch( error => {
			console.log(error)
			return {success: false, message: 'Failed to signup'}
		}).then( res => res.json() ).then( data => {
			responseData = data;
		})

		if(responseData.success){
			alert('Signup successful');
			localStorage.setItem('auth-token', responseData.token)
			window.location.replace('/')
		} else {
			alert(responseData.message, 1200)
		}
	}

	const changeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value})
	}

	const checkboxHandler = (e) => {
		setAgree(e.target.checked);
	}

	return (

		<div className='loginsignup'>
			<div className={`alert ${showAlert ? '' : 'hide'}`}>{alertMessage}</div>
			<div className='loginsignup-container'>
				<h1>{state}</h1>
				<div className='loginsignup-fields'>
					{ state === 'Sign Up' && <input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Your Name' /> }
					<input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address'/>
					<input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='password' />
				</div>
				<button onClick={ ()=> {state ==="Login" ? login() : signup()}} >Continue</button>
				{
					state === "Sign Up" ?
					<p className='loginsignup-login'>Already have an account? <span onClick={() => setState("Login")} >Login here</span></p> :
					<p className='loginsignup-login'>Create an account? <span onClick={ () => setState("Sign Up")}>Click here</span></p>
				}
				<div className='loginsignup-agree'>
					<input type='checkbox' name='accept-terms' onChange={checkboxHandler}/>
					<p>By continuing, I agree to the terms of use & policy.</p>
				</div>
			</div>

		</div>
	)
}

export default LoginSignup
