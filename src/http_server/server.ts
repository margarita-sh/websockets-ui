import WebSocket, { WebSocketServer } from 'ws';
import { login } from './handlers/login';
import { updateRoom } from './handlers/updateRoom';
import { generateID } from './helpers/generateId';
import { updateWinners } from './handlers/updateWinners';


export const wss = new WebSocketServer({ port: 3000 });

export const players = new Map();



wss.on('connection', function connection(socket: WebSocket.WebSocket) {
	const playerId = generateID();
	players.set(playerId, socket);

	socket.on('message', function message(data) {

		const obj = JSON.parse(data as any);

		const type = obj.type;
		const params = obj.data;
		const createdRoom = updateRoom();
		switch (type) {
			case 'reg':
				const response = login(params, playerId);
				socket.send(JSON.stringify(response));
				sendUpdateRoomToAll(createdRoom);
				// updateWinnersToAll();
				break;
			case 'create_room':
				// const createdRoom = updateRoom();
				// socket.send(JSON.stringify(createdRoom));
				sendUpdateRoomToAll(createdRoom);
				// updateWinnersToAll();
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
		// Check if the connection is still open
		if (client.readyState === WebSocket.OPEN) {
			// console.log('ROOMS_DATABASE', ROOMS_DATABASE[0].roomUsers);
			console.log('createdRoom', createdRoom);
			client.send(JSON.stringify(createdRoom));
		}
	});
}


function updateWinnersToAll() {
	players.forEach(function each(client) {
		// Check if the connection is still open
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(updateWinners()));
		}
	});
}

