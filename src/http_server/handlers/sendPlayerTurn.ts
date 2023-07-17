import WebSocket from 'ws';
import { GAME_DATABASE, USERS_DATABASE } from '../database';
import { SOCKET_MESSAGE_TYPE } from '../interface/socketMessages';
import { players } from '../server';
import { CURRENT_SHOT } from './handleShot';
import { STATUS_SHIP } from '../interface/statusShip';

export function sendPlayerTurn(gameId: number) {

	const playersinTheGame = USERS_DATABASE.filter((player) => player.gameId === gameId);
	const idsPlayersinTheGame = playersinTheGame.map((player) => player.id);

	const game = GAME_DATABASE.find(game => game.gameId === gameId);
	if (game) {
		if (game.turn === 0) {
			game.setTurn(idsPlayersinTheGame[0]);
		} else if(CURRENT_SHOT === STATUS_SHIP.shot || CURRENT_SHOT === STATUS_SHIP.killed){
			game.setTurn(game.turn);
		}else{
			// const currentPlayer = idsPlayersinTheGame.indexOf(game.turn);
			const otherPlayer = idsPlayersinTheGame.find(player => player !== game.turn);
			if (otherPlayer) {
				game.setTurn(otherPlayer);
			}
		}
	}

	for (let [key, value] of players) {
		if (value.readyState === WebSocket.OPEN && idsPlayersinTheGame.includes(key)) {
			value.send(JSON.stringify({
				type: SOCKET_MESSAGE_TYPE.TURN,
				data: JSON.stringify(
					{
						currentPlayer: game?.turn,
					}),
				id: 0,
			}));
		}
	}
}