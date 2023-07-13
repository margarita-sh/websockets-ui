import WebSocket, { WebSocketServer } from 'ws';
import { login } from './handlers/login';
import { updateRoom } from './handlers/updateRoom';
import { generateID } from './helpers/generateId';
import { updateWinners } from './handlers/updateWinners';
import { createGame } from './handlers/createGame';
import { USERS_DATABASE } from './database';


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
			case 'reg':
				const response = login(params, playerId);
				socket.send(JSON.stringify(response));
				break;
			case 'create_room':
				sendUpdateRoomToAll(createdRoom);
				updateWinnersToAll();
				break;
			case 'add_user_to_room':
				const createdGame = createGame(params, playerId);
				createGamesToPlayrs(createdGame);
				sendUpdateRoomToAll(createdRoom);
				updateWinnersToAll();
				break;
			case 'add_ships':
				// startGame();
			console.log('params', params)
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

function sendUpdateRoomToAll(createdRoom: any) {
	players.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(createdRoom));
		}
	});
}


function updateWinnersToAll() {
	players.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(updateWinners()));
		}
	});
}


function createGamesToPlayrs(gameInfo: any) {

	const playersinTheGame = USERS_DATABASE.filter((player) => player.gameId === gameInfo.gameId);
	const idsPlayersinTheGame = playersinTheGame.map((player) => player.id);

	for (let [key, value] of players) {
		if (value.readyState === WebSocket.OPEN && idsPlayersinTheGame.includes(key)) {
			value.send(JSON.stringify({
				type: "create_game",
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

