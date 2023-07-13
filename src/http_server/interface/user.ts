export class User {
	name: string;
	password: string;
	id: number;
	roomId?: number;
	gameId?: number;
	wins = 0;
	constructor(params: any) {
		this.name = params.name;
		this.password = params.password;
		this.id = params.id
		this.roomId = params.idRoom;
	}
	updateWins(){
		this.wins = this.wins ? this.wins + 1 : 1;
	}
}


