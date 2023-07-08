import { User } from './user';

export class Room {
	public roomId: number;
	public roomUsers: { name: string, index: number }[]=[];
	constructor(user:User) {
		this.roomId = Math.floor(Math.random() * 1000000);
		this.roomUsers.push({name: user.name, index: 0});
	}
}