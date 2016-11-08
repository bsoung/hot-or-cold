const CHECK_NUMBER = 'CHECK_NUMBER'
const checkNumber = (number) => {
    return {
        type: CHECK_NUMBER,
        number: number

    }
}

const RESTART_GAME = 'RESTART_GAME'
const restartGame = (numbers) => {
	return {
		type: RESTART_GAME,
		numbers: numbers
	}
}

exports.CHECK_NUMBER = CHECK_NUMBER
exports.checkNumber = checkNumber

exports.RESTART_GAME = RESTART_GAME
exports.restartGame = restartGame






