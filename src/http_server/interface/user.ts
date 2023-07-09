import { generateID } from '../helpers/generateId';

export class User {
	name: string;
	password: string;
	id: string;
	roomId?: number;
	constructor(params: any) {
		console.log('!!!User params constructor', params)
		this.name = params.name;
		this.password = params.password;
		this.id = params.id
		this.roomId = params.idRoom
	}
}


