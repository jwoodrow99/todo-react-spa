import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';

import styles from './LoginPage.module.css';

import http from '../services/http';
import { GlobalContext } from '../services/GlobalContext';

const LoginPage = () => {
	const navigate = useNavigate();
	const GlobalContextState = useContext(GlobalContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const login = () => {
		http
			.post('/api/auth/login', {
				email: email,
				password: password,
			})
			.then((response) => {
				if (response.data.access_token) {
					cookie.set('access_token', response.data.access_token);
					GlobalContextState.setAccessToken(response.data.access_token);
					navigate('/');
				}
			});

		setEmail('');
		setPassword('');
	};

	return (
		<div className="LoginPage">
			<h1>Login Page</h1>

			<div>
				<label>Email</label>
				<br />
				<input
					placeholder="johndoe@example.test"
					type="text"
					onChange={(event) => {
						setEmail(event.target.value);
					}}
				/>
			</div>

			<div>
				<label>Password</label>
				<br />
				<input
					type="password"
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				/>
			</div>

			<button type="button" onClick={login}>
				Login
			</button>
		</div>
	);
};

export default LoginPage;
