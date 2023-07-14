import WebSocket from 'ws';
import { GAME_DATABASE, USERS_DATABASE } from '../database';
import { players } from '../server';
import { SOCKET_MESSAGE_TYPE } from '../interface/socketMessages';

export function startGamesToPlayers(gameId: number) {

	const playersinTheGame = USERS_DATABASE.filter((player) => player.gameId === gameId);
	const idsPlayersinTheGame = playersinTheGame.map((player) => player.id);

	for (let [key, value] of players) {
		if (value.readyState === WebSocket.OPEN && idsPlayersinTheGame.includes(key)) {
			value.send(JSON.stringify({
				type: SOCKET_MESSAGE_TYPE.START_GAME,
				data:JSON.stringify(
				{
					ships: USERS_DATABASE.find(user=> user.id === key)?.ships,
					currentPlayerIndex: key
				}),
				id: 0,
			}));
		}
	}
}