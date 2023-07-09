import WebSocket, { WebSocketServer } from 'ws';
import { login } from './handlers/login';
import { updateRoom } from './handlers/updateRoom';
import { generateID } from './helpers/generateId';

export const wss = new WebSocketServer({ port: 3000 });

const players = new Map();

wss.on('connection', function connection(socket: WebSocket.WebSocket) {
	const playerId = generateID();

	players.set(playerId, socket);



	socket.on('message', function message(data) {

		const obj = JSON.parse(data as any);
		console.log('obj', obj)
		const type = obj.type;
		const params = obj.data;

		switch (type) {
			case 'reg':
				const response = login(params);
				socket.send(JSON.stringify(response));
				break;
			case 'create_room':
				const createdRoom = updateRoom(params);
				// const updatedWinners = updateWinners(params);
				socket.send(JSON.stringify(createdRoom));
			// socket.send(JSON.stringify(updatedWinners))
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

