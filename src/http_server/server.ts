import WebSocket, { WebSocketServer } from 'ws';
import { login } from './handlers/login';
import { updateRoom } from './handlers/updateRoom';
import { generateID } from './helpers/generateId';
import { createGame } from './handlers/createGame';
import { GAME_DATABASE } from './database';
import { SOCKET_MESSAGE_TYPE } from './interface/socketMessages';
import { sendUpdateRoomToAll } from './handlers/sendUpdateRoomToAll';
import { createGameToPlayers } from './handlers/createGameToPlayers';
import { startGamesToPlayers } from './handlers/startGamesToPlayers';
import { sendPlayerTurn } from './handlers/sendPlayerTurn';
import { updateWinnersToAll } from './handlers/updateWinnersToAll';
import { assignShipsToPlayer } from './handlers/assignShipsToPlayer';
import { attack } from './handlers/attack';


export const wss = new WebSocketServer({ port: 3000 });

export const players = new Map();

wss.on('connection', function connection(socket: WebSocket.WebSocket) {
	const playerId = generateID();

	players.set(playerId, socket);

	socket.on('message', function message(data) {

		const obj = JSON.parse(data as any);

		const type = obj.type;
		const params = obj.data;
		const createdRoom = updateRoom(playerId);

		switch (type) {
			case SOCKET_MESSAGE_TYPE.REG:
				const response = login(params, playerId);
				socket.send(JSON.stringify(response));
				break;
			case SOCKET_MESSAGE_TYPE.CREATE_ROOM:
				sendUpdateRoomToAll(createdRoom);
				updateWinnersToAll();
				break;
			case SOCKET_MESSAGE_TYPE.ADD_USER_TO_ROOM:
				const createdGame = createGame(params, playerId);
				createGameToPlayers(createdGame);
				sendUpdateRoomToAll(createdRoom);
				updateWinnersToAll();
				break;
			case SOCKET_MESSAGE_TYPE.ADD_SHIPS:
				const { gameId } = JSON.parse(params);
				assignShipsToPlayer(params);
				if (GAME_DATABASE.find(game => game.gameId === gameId)?.gameUsers.every(user => user.ships.length > 0)) {
					startGamesToPlayers(gameId);
					sendPlayerTurn(gameId);
				};
				break;
			case SOCKET_MESSAGE_TYPE.ATTACK:
				attack()
				sendPlayerTurn(gameId);
				break;
			case SOCKET_MESSAGE_TYPE.RANDOM_ATTACK:
				sendPlayerTurn(gameId);
				break;
			default:
				console.warn(`Type: ${type} unknown`);
				break;
		}
	});

	socket.on('close', () => {
		console.log(`WebSocket connection with player ${playerId} closed.`);

		players.delete(playerId);
	});
});
