import WebSocket from 'ws';
import { players } from '../server';
import { updateWinners } from './updateWinners';

export function updateWinnersToAll() {
	players.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(updateWinners()));
		}
	});
}