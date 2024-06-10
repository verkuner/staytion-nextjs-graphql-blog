import { IApiResponse } from '../app/app.types';
import { authEndpoints } from './auth.endpoints';
import { ILogin, IUser } from './auth.types';

export const loginHandler = async (credentials: ILogin) => {
	fetch(authEndpoints.login, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ...credentials }),
	})
		.then(async (r) => {
			// feel free to store the result in cookie or local storage
			const response: IApiResponse = {
				data: await r.json(),
				hasError: false,
			};
			return response;
		})

		.catch((err) => console.log(err));
};

export const signUpHandler = async (data: IUser) => {
	return fetch(authEndpoints.signup, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			...data,
		}),
	})
		.then(async (r) => {
			const response: IApiResponse = {
				data: await r.json(),
				hasError: false,
			};
			return response;
		})
		.catch((err) => {
			const response: IApiResponse = {
				data: null,
				hasError: true,
			};
			return response;
		});
};
