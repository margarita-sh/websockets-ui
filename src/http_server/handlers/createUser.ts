import { User } from '../interface/user';

export const createUser = (params: any) => {
	return new User(params);
}