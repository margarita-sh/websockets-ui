import { USERS_DATABASE } from '../database';
import { User } from '../interface/user';

export function updateWinners() {
	return {
		type: "update_winners",
		data: USERS_DATABASE.map((user: User) => JSON.stringify({name: user.name, wins: user.wins})),
		id: 0,
	}
	
}