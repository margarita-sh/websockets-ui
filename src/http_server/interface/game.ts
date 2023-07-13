import { User } from './user';
import { USERS_DATABASE } from '../database';
export class Game {
	public gameId: number;
	public gameUsers: User[] = [];

	constructor() {
		this.gameId = Math.floor(Math.random() * 1000000);
	}

	addUserToGame(user: User) {
		this.gameUsers.push(user);
		const player = USERS_DATABASE.find((player: User) => player.id === user.id);
		if (player) player.gameId = this.gameId;
	}
}