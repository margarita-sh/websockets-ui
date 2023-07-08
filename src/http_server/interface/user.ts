import { generateID } from '../helpers/generateId';

export class User {
	name: string;
	password: string;
	id: string;
	constructor(params: any) {
		this.name = params.name;
		this.password = params.password;
		this.id = generateID();
	}
}


