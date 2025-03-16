let players = []
let activePlayers = []
let currentPlayerIndex = 0
let totalPlayers = 2
let currentCategory = 'Города'
let timer
let timeLeft = 20
let cities = []

async function loadCities() {
	const response = await fetch('cities.json')
	const data = await response.json()
	cities = data.cities.map(city => city.toLowerCase()) // Преобразуем в нижний регистр
}

function startGame() {
	document.getElementById('player-setup').style.display = 'block'
	loadCities() // Загружаем список городов перед началом игры
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
	document.getElementById('player-name').value = ''

	if (players.length < totalPlayers) {
		document.getElementById('name-prompt').innerText = `Введите имя игрока ${
			players.length + 1
		}:`
	} else {
		activePlayers = [...players]
		document.getElementById('name-input').style.display = 'none'
		document.getElementById('game-play').style.display = 'block'
		nextTurn()
	}
}

function nextTurn() {
	if (activePlayers.length === 1) {
		endGame()
		return
	}

	currentPlayerIndex = (currentPlayerIndex + 1) % activePlayers.length
	document.getElementById(
		'current-player'
	).innerText = `Ход игрока: ${activePlayers[currentPlayerIndex]}`
	document.getElementById('word-input').value = ''
	resetTimer()
}

function resetTimer() {
	clearInterval(timer)
	timeLeft = 20
	document.getElementById('timer').innerText = timeLeft

	timer = setInterval(() => {
		timeLeft--
		document.getElementById('timer').innerText = timeLeft
		if (timeLeft === 0) {
			removePlayer()
		}
	}, 1000)
}

function submitWord() {
	let word = document.getElementById('word-input').value.trim().toLowerCase()

	if (word === '') {
		alert('Введите слово!')
		return
	}

	if (!cities.includes(word)) {
		alert('❌ Ошибка! Это не город!')
		return
	}

	nextTurn()
}

function removePlayer() {
	alert(`💥 Бомба взорвалась! ${activePlayers[currentPlayerIndex]} выбыл!`)
	activePlayers.splice(currentPlayerIndex, 1)
	if (currentPlayerIndex >= activePlayers.length) {
		currentPlayerIndex = 0
	}
	nextTurn()
}

function endGame() {
	document.getElementById('game-play').style.display = 'none'
	document.getElementById('results-screen').style.display = 'block'
	document.getElementById(
		'winner'
	).innerText = `🏆 Победитель: ${activePlayers[0]}! 🎉`
}

function restartGame() {
	players = []
	activePlayers = []
	currentPlayerIndex = 0
	totalPlayers = 2
	timeLeft = 20

	document.getElementById('results-screen').style.display = 'none'
	document.getElementById('player-setup').style.display = 'block'
}
