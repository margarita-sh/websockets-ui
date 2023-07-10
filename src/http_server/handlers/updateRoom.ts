import { ROOMS_DATABASE} from '../database';
import { Room } from '../interface/room';
import { User } from '../interface/user';
import { players } from '../server';

export const updateRoom = () => {
	let room!: Room | undefined;
	for (let [key, value] of players) {
		room = ROOMS_DATABASE.find((r: Room) => {
			return r.roomUsers.find((user) => {
				if (user.id === key) {
					return true
				} else {
					return false;
				}
			})
		});
	};


	return {
		type: "update_room",
		data:
			[
				JSON.stringify({
					roomId: room?.roomId,
					roomUsers: room?.roomUsers.map((user:User) => {
						return {name: user.name, index: user.id}
					}),
				}),
			],
		id: 0,
	}
}