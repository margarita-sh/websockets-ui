import { STATUS_SHIP } from '../interface/statusShip';
import { User } from '../interface/user';

export let CURRENT_SHOT: STATUS_SHIP;

export function handleShot(currentPlayer: User, enemyPlayer: User, targetX: number, targetY: number): string {

	let result = STATUS_SHIP.miss;
  
	for (const ship of enemyPlayer.ships) {
	  if (ship.direction === false) {
		// Horizontal ship
		const start = ship.position.x;
		const end = start + ship.length - 1;
		if (targetX >= start && targetX <= end && targetY === ship.position.y) {
		  result = STATUS_SHIP.shot;
		  ship.hit = ship.hit || [];
		  ship.hit.push(targetX - start);
		  if (ship.hit.length === ship.length) {
			result = STATUS_SHIP.killed;
			enemyPlayer.markKilledShip(ship);
		  }
		  break;
		}
	  } else {
		// Vertical ship
		const start = ship.position.y;
		const end = start + ship.length - 1;
		if (targetY >= start && targetY <= end && targetX === ship.position.x) {
		  result = STATUS_SHIP.shot;
		  ship.hit = ship.hit || [];
		  ship.hit.push(targetY - start);
		  if (ship.hit.length === ship.length) {
			result = STATUS_SHIP.killed;
			enemyPlayer.markKilledShip(ship);
		  }
		  break;
		}
	  }
	}

	currentPlayer.markShotResult(targetX, targetY, result);
	CURRENT_SHOT = result;
	return result;
  }