import { ROOMS_DATABASE, USERS_DATABASE } from '../database';
import { Room } from '../interface/room';

export const createRoom = () => {
	const room = new Room();
	return room;
}