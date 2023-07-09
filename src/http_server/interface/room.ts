import { User } from './user';
import { createRoom } from '../handlers/createRoom';
import { USERS_DATABASE } from '../database';
export class Room {
	public roomId: number;
	public roomUsers: User[]=[];
	public isOpen!: boolean; 
	constructor() {
		this.roomId = Math.floor(Math.random() * 1000000);
		this.isOpen = this.roomUsers.length < 2 ? true : false;
	}

	addUserToRoom(user: User){
		if(this.isOpen && user.roomId === undefined){
			this.roomUsers.push(user);
			const player = USERS_DATABASE.find((player: User) =>  player.id === user.id);
			if(player) player.roomId = this.roomId;
		}else{
			createRoom()
		}
	}
}