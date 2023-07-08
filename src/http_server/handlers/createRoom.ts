import { ROOMS_DATABASE, USERS_DATABASE } from '../database';
import { Room } from '../interface/room';

export const createRoom = () => {
const user = USERS_DATABASE.splice(0, 1)[0];
const room = new Room(user);
ROOMS_DATABASE.push(room);
return room;
}