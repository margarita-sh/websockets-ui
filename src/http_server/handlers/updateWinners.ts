import { USERS_DATABASE } from '../database';
import { SOCKET_MESSAGE_TYPE } from '../interface/socketMessages';
import { User } from '../interface/user';

export function updateWinners() {
	return {
		type: SOCKET_MESSAGE_TYPE.UPDATE_WINNERS,
		data: JSON.stringify(USERS_DATABASE.map((user: User) => {
			return { name: user.name, wins: user.wins }
		})),
		id: 0,
	}
	
}