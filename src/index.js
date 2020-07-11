import './styles/styles.scss'
import GameControler from './js/controller/Controller'

document.addEventListener('DOMContentLoaded', () => {
  GameControler();
});
if (module.hot) {
  module.hot.accept()
}