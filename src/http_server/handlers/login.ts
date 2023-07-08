import { User } from '../interface/user';
import { USERS_DATABASE } from '../database';
import { validateUser } from '../helpers/validateUser';
import { createUser } from '../handlers/createUser';

export const login = function (params: any) {
	const userData = JSON.parse(params)
	const isUserValid = validateUser(userData);
	if (isUserValid) {
		const user = createUser(userData);
		USERS_DATABASE.push(user);
		return {
			type: "reg",
			data:
				JSON.stringify({
					name: user.name,
					index: 0,
					error: false,
					errorText: '',
				}),
			id: 0,
		};
	}
	return {
		type: "reg",
		data:
			JSON.stringify({
				name: userData.name,
				index: 0,
				error: true,
				errorText: 'user name is already taken, please choose another one',
			}),
		id: 0,
	};
}
