import axios from 'axios';
import cookie from 'js-cookie';

let axiosInstance = axios.create({
	baseURL: 'http://localhost:3000',
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use((request) => {
	let accessToken = cookie.get('access_token');
	if (accessToken && request.headers) {
		request.headers['Authorization'] = `Bearer ${accessToken}`;
	}
	return request;
});

export default axiosInstance;
