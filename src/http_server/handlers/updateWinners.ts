import { USERS_DATABASE } from '../database';
import { User } from '../interface/user';

export function updateWinners() {
	return {
		type: "update_winners",
		data: JSON.stringify(USERS_DATABASE.map((user: User) => {
			return { name: user.name, wins: user.wins }
		})),
		id: 0,
	}
	
}