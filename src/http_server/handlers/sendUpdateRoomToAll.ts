import WebSocket from 'ws';
import { players } from '../server';

export function sendUpdateRoomToAll(createdRoom: any) {
	players.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(createdRoom));
		}
	});
}