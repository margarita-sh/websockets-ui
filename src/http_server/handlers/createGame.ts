import { ROOMS_DATABASE, USERS_DATABASE } from '../database';
import { Game } from '../interface/game';
import { User } from '../interface/user';

export function createGame(params: any, playerId: number) {
	const game = new Game();

	const userWhoInvites = USERS_DATABASE.find((user) => user.id === playerId);
	if (userWhoInvites) {
		game.addUserToGame(userWhoInvites);
		userWhoInvites.gameId=game.gameId;
	}

	const indexRoom = JSON.parse(params).indexRoom;

	const invitedPlayer: User | undefined = USERS_DATABASE.find((player) => player.roomId === indexRoom);
	if (invitedPlayer) {
		game.addUserToGame(invitedPlayer);
		invitedPlayer.gameId=game.gameId;
	}

// remove room
	const indexRoomForRemoving = ROOMS_DATABASE.findIndex((room) => room.roomId === indexRoom);
	ROOMS_DATABASE.splice(indexRoomForRemoving, 1);

	return game;
	
}