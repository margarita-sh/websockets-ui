import { GAME_DATABASE } from '../database';
import { attack } from '../handlers/attack';
import { Ship } from './ship';

import { STATUS_SHIP } from './statusShip';

export class User {
	name: string;
	password: string;
	id: number;
	roomId?: number;
	gameId?: number;
	wins = 0;
	ships: Ship[] = [];
	grid: string[][] = [];

	constructor(params: any) {
		this.name = params.name;
		this.password = params.password;
		this.id = params.id
		this.roomId = params.idRoom;
		this.initializeGrid();
	}
	updateWins() {
		this.wins = this.wins ? this.wins + 1 : 1;
	}

	initializeGrid() {
		this.grid = [];
		for (let i = 0; i < 10; i++) {
			this.grid[i] = [];
			for (let j = 0; j < 10; j++) {
				this.grid[i][j] = '';
			}
		}
	}

	markShotResult(targetX: number, targetY: number, result: string) {
		if (result === 'miss') {
			this.grid[targetY][targetX] = STATUS_SHIP.miss;
		} else {
			this.grid[targetY][targetX] = STATUS_SHIP.shot;
		}
	}

	markKilledShip(ship: Ship) {
		const { position, direction, length } = ship;
		const { x, y } = position;

		if (direction === false) {
			// Horizontal ship
			for (let i = x; i < x + length; i++) {
				this.grid[y][i] = STATUS_SHIP.killed;
				this.markAdjacentCells(i, y);
			}
		} else {
			// Vertical ship
			for (let i = y; i < y + length; i++) {
				this.grid[i][x] = STATUS_SHIP.killed;
				this.markAdjacentCells(x, i);
			}
		}
	}


	markAdjacentCells(x: number, y: number) {
		for (let i = y - 1; i <= y + 1; i++) {
			for (let j = x - 1; j <= x + 1; j++) {
				if (i >= 0 && i < 10 && j >= 0 && j < 10) {
					if (this.grid[i][j] === '') {
						this.grid[i][j] = STATUS_SHIP.miss;
						attack({
							x: j,
							y: i,
							gameId: this.gameId,
							indexPlayer: GAME_DATABASE.find(game=> game.gameId === this.gameId)?.currentAttacker
						})
					}
				}
			}
		}
	}

}


