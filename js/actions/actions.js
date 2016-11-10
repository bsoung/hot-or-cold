/** 
 * CHECK_NUMBER 
 * redux for checking user input against randomly generated number
 * 
 */
const CHECK_NUMBER = 'CHECK_NUMBER'
const checkNumber = (number) => {
    return {
        type: CHECK_NUMBER,
        number: number

    }
}

/** 
 * RESTART_GAME 
 * redux action for restarting the game with the default state
 * 
 */
const RESTART_GAME = 'RESTART_GAME'
const restartGame = () => {
	return {
		type: RESTART_GAME,
		numbers: []
	}
}

exports.CHECK_NUMBER = CHECK_NUMBER
exports.checkNumber = checkNumber

exports.RESTART_GAME = RESTART_GAME
exports.restartGame = restartGame






