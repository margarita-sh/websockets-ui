import { ROOMS_DATABASE, USERS_DATABASE } from '../database';
import { validateUser } from '../helpers/validateUser';
import { createUser } from '../handlers/createUser';
import { Room } from '../interface/room';
import { User } from '../interface/user';
import { createRoom } from './createRoom';

export const login = function (params: any, playerId: number) {
	const dataParsed = JSON.parse(params);
	const userData = {...dataParsed, id: playerId};
	
	const isUserValid = validateUser(userData);
	if (isUserValid) {
		const user = createUser(userData);
		USERS_DATABASE.push(user);

		let room!: Room;
			const player: User | undefined = USERS_DATABASE.find((user) => playerId === user.id);
	
			if (player) {
					room = createRoom();
					room.addUserToRoom(player);
					ROOMS_DATABASE.push(room);
			};
		return {
			type: "reg",
			data:
				JSON.stringify({
					name: user.name,
					index: playerId,
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
				name: '',
				index: 0,
				error: true,
				errorText: 'user name is already taken, please choose another one',
			}),
		id: 0,
	};
}
