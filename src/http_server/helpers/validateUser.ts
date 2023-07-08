import { USERS_DATABASE } from '../database';
import { User } from '../interface/user';

export function validateUser(player: User) {
	if (USERS_DATABASE.find(user => user.name === player.name)) {
		return false;
	} else {
		return true;
	}

}