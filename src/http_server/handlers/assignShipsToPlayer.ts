import { USERS_DATABASE } from '../database';
import { User } from '../interface/user';

export function assignShipsToPlayer(params: any) {

	const { gameId, ships, indexPlayer } = JSON.parse(params);

	const player = USERS_DATABASE.find((player: User) => player.id === indexPlayer && player.gameId === gameId);
	
	if (player) {
		player.ships = ships;
	}

	return player;
}