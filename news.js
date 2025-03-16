document.addEventListener('DOMContentLoaded', function () {
	const news = [
		{
			title: "🎮 Добавлена игра 'Правда или действие'",
			description: 'Теперь можно играть с друзьями и получать баллы!',
		},
		{
			title: "🧠 Добавлена игра 'Угадай слово'",
			description: 'Игрок загадывает слово, а другие пытаются его отгадать!',
		},
		{
			title: "💣 Добавлена игра 'Бомба замедленного действия'",
			description:
				"Игроки должны быстро называть слова, пока 'бомба' не взорвётся!",
		},
		{
			title: '⏳ Увеличен таймер',
			description: "Теперь у игроков есть 20 секунд на ответ в игре 'Бомба'!",
		},
		{
			title: '📍 Добавлен список городов',
			description:
				'Теперь можно вводить только настоящие города из списка (200+ городов)!',
			link: 'contact.html',
		},
	]

	const container = document.getElementById('news-container')

	if (!container) {
		console.error('Ошибка: контейнер для новостей не найден!')
		return
	}

	news.forEach(update => {
		const card = document.createElement('div')
		card.classList.add('news-card')

		card.innerHTML = `
            <div class="news-title">${update.title}</div>
            <div class="news-description">${update.description}</div>
        `

		container.appendChild(card)
	})
})

// Функция перехода на главную (она должна быть глобальной)
