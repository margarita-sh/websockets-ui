import { ROOMS_DATABASE} from '../database';
import { Room } from '../interface/room';
import { SOCKET_MESSAGE_TYPE } from '../interface/socketMessages';
import { User } from '../interface/user';

export const updateRoom = (playerId: number) => {
	let room!: Room | undefined; 
		room = ROOMS_DATABASE.find((r: Room) => {
			return r.roomUsers.find((user) => {
				if (user.id === playerId) {
					return true
				} else {
					return false;
				}
			})
		});


	return {
		type: SOCKET_MESSAGE_TYPE.UPDATE_ROOM,
		data:
		JSON.stringify([
				{
					roomId: room?.roomId,
					roomUsers: room?.roomUsers.map((user:User) => {
						return {name: user.name, index: user.id}
					}),
				},
			]),
		id: 0,
	}
}