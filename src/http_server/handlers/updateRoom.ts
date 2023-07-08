import { Room } from '../interface/room';
import { createRoom } from './createRoom';

export const updateRoom = (params: any) => {
	console.log('params', params);
	const room = createRoom();
	return {
		type: "update_room",
		data:
			[
				JSON.stringify({
					roomId: params.index,
					roomUsers:
						[
							JSON.stringify({
								name: room.roomUsers[0].name,
								index: params.index,
							})
						],
				}),
			],
		id: 0,
	}
}