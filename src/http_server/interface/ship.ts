import { SHIPS_TYPE } from './shipType.enum';
import { STATUS_SHIP } from './statusShip';

export interface Ship {
	position: { x: number; y: number };
	direction: boolean;
	type: SHIPS_TYPE;
	length: number;
	hit?: (number | undefined)[];
	status: STATUS_SHIP
}