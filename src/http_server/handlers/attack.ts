import WebSocket from 'ws';
import { GAME_DATABASE, USERS_DATABASE } from '../database';
import { players } from '../server';
import { SOCKET_MESSAGE_TYPE } from '../interface/socketMessages';

export function attack(gameId: number){

	const playersinTheGame = USERS_DATABASE.filter((player) => player.gameId === gameId);
	const idsPlayersinTheGame = playersinTheGame.map((player) => player.id);

	const game = GAME_DATABASE.find(game => game.gameId === gameId);

	for (let [key, value] of players) {
		if (value.readyState === WebSocket.OPEN && idsPlayersinTheGame.includes(key)) {
			value.send(JSON.stringify(	{
				type: SOCKET_MESSAGE_TYPE.ATTACK,
				data:
					{
						gameId: <number>,
						x: <number>,
						y: <number>,
						indexPlayer: <number>, /* id of the player in the current game */
					},
				id: 0,
			}));
		}
	}

}