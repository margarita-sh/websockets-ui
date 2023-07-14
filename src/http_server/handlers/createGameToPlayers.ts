import WebSocket from 'ws';
import { USERS_DATABASE } from '../database';
import { players } from '../server';
import { SOCKET_MESSAGE_TYPE } from '../interface/socketMessages';

export function createGameToPlayers(gameInfo: any) {

	const playersinTheGame = USERS_DATABASE.filter((player) => player.gameId === gameInfo.gameId);
	const idsPlayersinTheGame = playersinTheGame.map((player) => player.id);

	for (let [key, value] of players) {
		if (value.readyState === WebSocket.OPEN && idsPlayersinTheGame.includes(key)) {
			value.send(JSON.stringify({
				type: SOCKET_MESSAGE_TYPE.CREATE_GAME,
				data:
					JSON.stringify({
						idGame: gameInfo.gameId,
						idPlayer: key,
					}),
				id: 0,
			}));
		}
	}
}