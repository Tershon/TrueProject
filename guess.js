let players = []
let scores = {}
let currentPlayerIndex = 0
let totalPlayers = 2
let round = 1
let chosenWord = ''

function startGame() {
	document.getElementById('player-setup').style.display = 'block'
}

function setPlayers() {
	totalPlayers = parseInt(document.getElementById('player-count').value)
	document.getElementById('player-setup').style.display = 'none'
	document.getElementById('name-input').style.display = 'block'
	document.getElementById('name-prompt').innerText = 'Введите имя игрока 1:'
}

function saveName() {
	let name = document.getElementById('player-name').value.trim()
	if (name === '') {
		alert('Введите имя!')
		return
	}

	players.push(name)
	scores[name] = 0
	document.getElementById('player-name').value = ''

	if (players.length < totalPlayers) {
		document.getElementById('name-prompt').innerText = `Введите имя игрока ${
			players.length + 1
		}:`
	} else {
		document.getElementById('name-input').style.display = 'none'
		document.getElementById('game-play').style.display = 'block'
		document.getElementById(
			'word-chooser'
		).innerText = `Игрок ${players[0]} должен загадать слово.`
	}
}

function chooseWord() {
	let word = prompt('Введите слово, которое нужно угадать:')
	if (!word) {
		alert('Введите слово!')
		return
	}

	chosenWord = word.toLowerCase()
	document.getElementById('word-chooser').style.display = 'none'
	document.getElementById('question-area').style.display = 'block'
	nextTurn()
}

function nextTurn() {
	document.getElementById('current-player-name').innerText =
		players[currentPlayerIndex]
}

function answerQuestion(isYes) {
	let message = isYes ? 'Да' : 'Нет'
	alert(`Ответ на вопрос: ${message}`)
	currentPlayerIndex = (currentPlayerIndex + 1) % players.length
	nextTurn()
}

function tryGuess() {
	let guess = prompt(
		`${players[currentPlayerIndex]}, введите ваш вариант слова:`
	).toLowerCase()
	if (guess === chosenWord) {
		alert(`🎉 ${players[currentPlayerIndex]} угадал слово! +20 очков!`)
		scores[players[currentPlayerIndex]] += 20
		if (round < 5) {
			round++
			document.getElementById('round-number').innerText = round
			document.getElementById('word-chooser').style.display = 'block'
			document.getElementById('question-area').style.display = 'none'
		} else {
			showResults()
		}
	} else {
		alert('❌ Неправильно! Продолжайте задавать вопросы.')
	}
}

function showResults() {
	document.getElementById('game-play').style.display = 'none'
	document.getElementById('results-screen').style.display = 'block'

	let resultsList = document.getElementById('results-list')
	resultsList.innerHTML = ''

	let sortedPlayers = Object.entries(scores).sort((a, b) => b[1] - a[1])
	sortedPlayers.forEach(([name, score]) => {
		let li = document.createElement('li')
		li.innerText = `${name}: ${score} баллов`
		resultsList.appendChild(li)
	})

	let winner = sortedPlayers[0][0]
	let winnerMessage = document.createElement('h3')
	winnerMessage.innerText = `🏆 Победитель: ${winner}! 🎉`
	resultsList.appendChild(winnerMessage)
}

function restartGame() {
	players = []
	scores = {}
	currentPlayerIndex = 0
	round = 1
	chosenWord = ''

	document.getElementById('results-screen').style.display = 'none'
	document.getElementById('player-setup').style.display = 'block'
}
