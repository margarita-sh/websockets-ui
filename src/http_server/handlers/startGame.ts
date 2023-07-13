import { SHIPS_TYPE } from '../interface/shipType.enum';

export function startGame(req, res) {
	return {
		type: "start_game",
		data:
			{
				ships:
					[
						{
							position: {
								x: <number>,
								y: <number>,
							},
							direction: <boolean>,
							length: <number>,
							type: SHIPS_TYPE.small,
						}
					],
				currentPlayerIndex: <number>, /* id of the player in the current game who have sent his ships */
			},
		id: 0,
	}
}