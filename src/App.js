import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';

import styles from './App.module.css';

import { GlobalContext } from './services/GlobalContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {
	const navigate = useNavigate();
	const [accessToken, setAccessToken] = useState(null);

	const logout = () => {
		cookie.remove('access_token');
		setAccessToken(null);
		navigate('/login');
	};

	useEffect(() => {
		let accessTokenCookie = cookie.get('access_token');
		if (accessTokenCookie) {
			setAccessToken(accessTokenCookie);
		} else {
			navigate('/login');
		}
	}, []);

	return (
		<div className="App">
			<GlobalContext.Provider
				value={{
					accessToken,
					setAccessToken,
				}}
			>
				<div className={styles.main}>
					<h1>Todo Application</h1>
					{accessToken ? <button onClick={logout}>Logout</button> : ''}
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<LoginPage />} />
					</Routes>
				</div>
			</GlobalContext.Provider>
		</div>
	);
}

export default App;
