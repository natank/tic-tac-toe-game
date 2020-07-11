import './styles/styles.scss'
import GameControler from './js/controller/Controller'

document.addEventListener('DOMContentLoaded', () => {
  console.log(`local Storage : ${JSON.stringify(localStorage)}`)
  GameControler();
});
if (module.hot) {
  module.hot.accept()
}