import { User } from './user';
import { USERS_DATABASE } from '../database';
import { GAME_STATE } from './gameState';
export class Game {
	public gameId: number;
	public gameUsers: User[] = [];
	public state: GAME_STATE;
	public turn: number;

	constructor() {
		this.gameId = Math.floor(Math.random() * 1000000);
		this.state = GAME_STATE.INIT;
		this.turn = 0;
	}

	public addUserToGame(user: User) {
		this.gameUsers.push(user);
		const player = USERS_DATABASE.find((player: User) => player.id === user.id);
		if (player) player.gameId = this.gameId;
	}

	public setState(newState: GAME_STATE) {
		this.state = newState;
	}

	public setTurn(turn: number) {
		this.turn = turn;
	}
}