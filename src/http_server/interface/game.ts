import { User } from './user';
import { USERS_DATABASE } from '../database';

export class Game {
	public gameId: number;
	public gameUsers: User[] = [];
	public turn!: number;
	public currentAttacker!: number;

	constructor() {
		this.gameId = Math.floor(Math.random() * 1000000);
	}

	public addUserToGame(user: User) {
		this.gameUsers.push(user);
		const player = USERS_DATABASE.find((player: User) => player.id === user.id);
		if (player) player.gameId = this.gameId;
	}

	public setTurn(turn: number) {
		this.turn = turn;
	}

	public setAttacker(attacker: number) {
		this.currentAttacker = attacker;
	}
}