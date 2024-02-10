import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

	const navigate = useNavigate();

	// Now you can use the `homepage` variable in your component.

	const [state, setState] = useState('login');
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
	})

	const [alertMessage, setAlertMessage] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const [agree, setAgree] = useState(false);

	const [showPassValidation, setShowPassValidation] = useState(false);
	const [showEmailValidation, setShowEmailValidation] = useState(false);

	// const styleHeight = { '--height': state === 'signup' ? '700px' : '470px' }
	const styleHeight = {
		'--height': state === 'signup'
			? (showPassValidation ? '866px' : '705px')
			: '546px'
	};

	const customAlert = (message, timeout) => {
		setAlertMessage(message);
		setShowAlert(true);
		setTimeout(() => {
			setShowAlert(false);
		}, timeout)

	}

	const login = async () => {

		if (!formData.email || !formData.password) {
			customAlert('All fields are required', 1100)
			return
		}

		const isEmailValid = emailRegex.test(formData.email);
		if (!isEmailValid) {
			customAlert('Email is not valid', 1200)
			setShowEmailValidation(true);
			return;
		}
		setShowEmailValidation(false);

		let responseData;
		// api/ users/ signup
		await fetch(`${apiUrl}/login`, {
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
				}
				if (res.status === 404) { // Unauthorized
					console.log("404: User not found")
				}
			}
			return res.json()
		}).then(data => {
			responseData = data;

		}).catch(error => {
			console.log('Error caught: ', error)
			responseData = { success: false, message: error.message };
		})

		if (responseData.success) {
			alert('Login successful');
			localStorage.setItem('auth-token', responseData.token)
			console.log(responseData)
			navigate('/')

		} else {
			customAlert(responseData.message, 1600)
			console.log(responseData)
		}
	}

	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const [hideValidation, setHideValidation] = useState(true);

	const hasLowerCase = /[a-z]/.test(password);
	const hasUpperCase = /[A-Z]/.test(password);
	const hasNumber = /\d/.test(password);
	const hasSpecialChar = /[!@#$%^*?&.=_-]/.test(password);
	const hasMinLength = password.length >= 8;

	const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

	const signup = async () => {

		if (!formData.username || !formData.email || !formData.password) {
			customAlert('All fields are required', 1100)
			return
		}

		// const email = 'name@example.com';
		const isEmailValid = emailRegex.test(formData.email);
		if (!isEmailValid) {
			customAlert('Email is not valid', 1200)
			setShowEmailValidation(true);
			return;
		}
		setShowEmailValidation(false);

		if (agree === false) {
			customAlert('Please agree to the terms of use & policy', 1200)
			return;
		}

		if (!hasLowerCase || !hasUpperCase || !hasNumber || !hasSpecialChar || !hasMinLength) {
			customAlert('Password is not valid', 1200)
			return
		}

		console.log('signup', formData)

		let responseData;
		// api/ users/ signup
		await fetch(`${apiUrl}/signup`, {

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
			responseData = data;
		}).catch(error => {
			console.log(error)
			responseData = { success: false, message: error.message };
		})

		if (responseData.success) {
			alert('Signup successful');
			localStorage.setItem('auth-token', responseData.token)
			navigate('/')

			// window.location.replace('/')
		} else {
			customAlert(responseData.message, 1600)
		}
	}

	const changeHandler = (e) => {
		if (state === 'signup' && e.target.name === 'password') {
			setPassword(e.target.value);
			if (e.target.value.length !== 0 || e.target.value !== '') {
				if (e.target.value.length === 1) {
					setHideValidation(false);
				}
				setTimeout(() => {

					setShowPassValidation(true);
				}, 100)
			}
			else {
				setShowPassValidation(false);

				// setTimeout(() => {
				setHideValidation(true);
				// }, 0)
			}
		}

		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const checkboxHandler = (e) => {
		setAgree(e.target.checked);
	}

	const onEnter = (e) => {
		if (e.key === 'Enter') document.getElementById('continue-btn').click();
	}

	return (

		<div onKeyDown={onEnter} className='loginsignup'>
			<div className={`alert ${showAlert ? '' : 'hide'} ${state} ${showPassValidation ? 'large' : ''}`} style={styleHeight}>
				{alertMessage}
			</div>
			<div className={`loginsignup-container ${state}`} style={styleHeight}>
				<h1>{state === 'signup' ? 'Sign Up' : 'Login'}</h1>
				<div className='loginsignup-fields'>
					{state === 'signup' &&
						<input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Your Name' />
					}
					<input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address' />

					{<p className={`input-regex ${showEmailValidation ? 'show' : ''}`}>example@domain.com</p>}

					<div className='loginsignup-password'>

						<input className='loginsignup-password-input' name='password' value={formData.password} onChange={changeHandler} type={showPassword ? 'text' : 'password'} placeholder='Password' />

						{
							formData.password !== '' &&
							<button className='show-password-btn' onClick={toggleShowPassword}> {showPassword ? 'Hide' : 'Show'} </button>
						}

					</div>

					{state === 'signup' &&
						<>
							<div className={`password-validation ${showPassValidation ? 'show' : ''} ${hideValidation ? 'hide' : ''}`}>
								<div>
									<span>{hasLowerCase ? '🟢' : '🔴'}</span>
									<p>One lowercase character</p>
								</div>
								<div >
									<span>{hasUpperCase ? '🟢' : '🔴'}</span>
									<p>One uppercase character</p>
								</div>
								<div>
									<span>{hasNumber ? '🟢' : '🔴'}</span>
									<p>One number</p>
								</div>
								<div>
									<span>{hasSpecialChar ? '🟢' : '🔴'}</span>
									<p>One special character</p>
								</div>
								<div>
									<span>{hasMinLength ? '🟢' : '🔴'}</span>
									<p>At least 8 characters long</p>
								</div>
							</div>
						</>
					}

				</div>
				<button className='submit-btn' style={styleHeight} onClick={() => { state === "login" ? login() : signup() }} id='continue-btn'>Continue</button>
				{
					state === "signup" ?
						<p className='loginsignup-login'>Already have an account? <span onClick={() => setState("login")} >Login here</span></p> :
						<p className='loginsignup-login'>Create an account? <span onClick={() => setState("signup")}>Click here</span></p>
				}
				{state === 'signup' &&
					<div className='loginsignup-agree'>
						<input type='checkbox' name='accept-terms' onChange={checkboxHandler} />
						<p>By continuing, I agree to the terms of use & policy.</p>
					</div>
				}
			</div>

		</div>
	)
}

export default LoginSignup
