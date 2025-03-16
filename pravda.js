let players = []
let currentPlayerIndex = 0
let punishmentAttempts = 0
let totalPlayers = 1

function startGame() {
	document.querySelector('.play-button').style.display = 'none'
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
	document.getElementById('player-name').value = ''

	if (players.length < totalPlayers) {
		document.getElementById('name-prompt').innerText = `Введите имя игрока ${
			players.length + 1
		}:`
	} else {
		document.getElementById('name-input').style.display = 'none'
		document.getElementById('game-play').style.display = 'block'
		nextTurn()
	}
}

function nextTurn() {
	currentPlayerIndex = (currentPlayerIndex + 1) % players.length
	document.getElementById(
		'game-question'
	).innerText = `${players[currentPlayerIndex]}, выбирай: Правда или Действие?`

	document.getElementById('truth-button').style.display = 'inline-block'
	document.getElementById('dare-button').style.display = 'inline-block'

	document.getElementById('answered-button').style.display = 'none'
	document.getElementById('punish-button').style.display = 'none'
	document.getElementById('next-punish-button').style.display = 'none'
	document.getElementById('continue-button').style.display = 'none'
	document.getElementById('punishment-done-button').style.display = 'none'

	punishmentAttempts = 0
}

function generateQuestion(type) {
	const truths = [
		'Какой твой самый большой секрет?',
		'Кого ты тайно любишь?',
		'Какая у тебя самая глупая привычка?',
		'Какой самый странный сон ты видел?',
		'Когда в последний раз ты притворялся(ась) больным?',
		'Кем ты мечтал(а) стать в детстве?',
		'Ты когда-нибудь врал(а) родителям?',
		'Что самое неловкое случалось с тобой?',
		'Ты когда-нибудь влюблялся(ась) в друга или подругу?',
		'Какой твой самый смешной момент в жизни?',
	]

	const dares = [
		'Сделай 10 приседаний!',
		'Скажи что-то смешное голосом робота!',
		'Станцуй прямо сейчас!',
		'Изобрази мультяшного персонажа!',
		'Позвони другу и спой ему песню!',
		'Изобрази животное, пока кто-то не угадает какое!',
		'Говори в рифму в течение 1 минуты!',
		'Сними носок и положи его на голову на 5 минут!',
		'Попробуй говорить только вопросами в течение 2 минут!',
	]

	let question =
		type === 'truth'
			? truths[Math.floor(Math.random() * truths.length)]
			: dares[Math.floor(Math.random() * dares.length)]

	document.getElementById(
		'game-question'
	).innerText = `${players[currentPlayerIndex]}, твое задание: ${question}`

	document.getElementById('truth-button').style.display = 'none'
	document.getElementById('dare-button').style.display = 'none'

	document.getElementById('answered-button').style.display = 'inline-block'
	document.getElementById('punish-button').style.display = 'inline-block'
}

function givePunishment() {
	const punishments = [
		'Выпей стакан воды с солью!',
		'Отправь случайному человеку в списке контактов «Я тебя люблю!»',
		'Съешь кусочек лимона без эмоций!',
		'Станцуй смешной танец перед всеми!',
		'Сделай селфи с глупым выражением лица и отправь другу!',
	]

	let punishment = punishments[Math.floor(Math.random() * punishments.length)]
	document.getElementById(
		'game-question'
	).innerText = `${players[currentPlayerIndex]}, наказание: ${punishment}`

	document.getElementById('answered-button').style.display = 'none'
	document.getElementById('punish-button').style.display = 'none'
	document.getElementById('next-punish-button').style.display = 'inline-block'
	document.getElementById('punishment-done-button').style.display =
		'inline-block'
}

function giveAnotherPunishment() {
	const punishments = [
		'Сделай 20 приседаний!',
		'Позвони другу и скажи, что ты влюбился(ась) в него!',
		'Съешь кусочек лимона без эмоций!',
	]

	if (punishmentAttempts < 2) {
		let punishment = punishments[Math.floor(Math.random() * punishments.length)]
		document.getElementById(
			'game-question'
		).innerText = `${players[currentPlayerIndex]}, новое наказание: ${punishment}`
		punishmentAttempts++
	} else {
		document.getElementById(
			'game-question'
		).innerText = `${players[currentPlayerIndex]}, ты использовал все попытки! Придётся выполнить наказание!`
		document.getElementById('next-punish-button').style.display = 'none'
		document.getElementById('punishment-done-button').style.display =
			'inline-block'
	}
}
