import WebSocket from 'ws';
import { USERS_DATABASE } from '../database';
import { players } from '../server';
import { SOCKET_MESSAGE_TYPE } from '../interface/socketMessages';

import { handleShot } from './handleShot';

export let CURRENT_PLAYER_ATTACKER: number;

export function attack(attack: any) {

	const { x, y, gameId, indexPlayer } = attack;
	CURRENT_PLAYER_ATTACKER = indexPlayer;

	const playersinTheGame = USERS_DATABASE.filter((player) => player.gameId === gameId);
	const idsPlayersinTheGame = playersinTheGame.map((player) => player.id);

	const enemyPlayer = playersinTheGame.find(player => player.id !== indexPlayer);
	const currentPlayer = playersinTheGame.find(player => player.id === indexPlayer);

	let attackResult;

	if(enemyPlayer && currentPlayer) {
		attackResult = handleShot(currentPlayer, enemyPlayer, x, y);	
	}
	
	for (let [key, value] of players) {
		if (value.readyState === WebSocket.OPEN && idsPlayersinTheGame.includes(key)) {
			value.send(JSON.stringify({
				type: SOCKET_MESSAGE_TYPE.ATTACK,
				data: JSON.stringify(
					{
						position:
						{
							x: x,
							y: y,
						},
						currentPlayer: indexPlayer, 
						status: attackResult,
					}
				),
				id: 0,
			}));
		}
	}

}
