import resetGame from './boardLogics'

function createGameBoards() {
  const player = document.createElement('div')
  const computer = document.createElement('div')

  player.classList.add('main__player-board')
  computer.classList.add('main__computer-board')

  for (let i = 1; i <= 100; i++) {
    const square = document.createElement('div')
    square.dataset.coords = i
    square.classList.add('square')
    player.append(square)
    computer.append(square.cloneNode(true))
  }

  return [player, computer]
}

function createHeadings(main) {
  ;["Enemy's Board", "Your's Board"].forEach((str) => {
    const heading = document.createElement('h2')
    heading.textContent = str
    main.append(heading)
  })
}

async function instantiateNotifier(result) {
  const notifier = document.querySelector('.header__notifier')
  notifier.innerHTML = result

  notifier.parentElement.classList.add('header--active')

  await new Promise((resolve) => setTimeout(resolve, 500))
  notifier.parentElement.children[0].style.transform = `translateX(${getWindowWidth()}px)`

  await new Promise((resolve) => setTimeout(resolve, 700))
  notifier.classList.add('notifier--active')

  await new Promise((resolve) => setTimeout(resolve, 3000))
  notifier.classList.remove('notifier--active')
  notifier.parentElement.children[0].style.transform = ''
  resetGame()

  await new Promise((resolve) => setTimeout(resolve, 1250))
  notifier.parentElement.classList.remove('header--active')

  await new Promise((resolve) => setTimeout(resolve, 600))
  notifier.innerHTML = ''
}

function instantiateAppWithSalaam() {
  instantiateNotifier('Salaam <span class="break"></span> Alaikum!')
}

function getWindowWidth() {
  return window.innerWidth - 162
}

export { instantiateAppWithSalaam, createGameBoards, createHeadings, instantiateNotifier }
