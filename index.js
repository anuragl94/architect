import Arc from './src'

class XButton extends Arc {
  static get properties () {
    return {
      'disabled': { type: Boolean }
    }
  }
  reconcile (dom, prevState, nextState) {
    if (prevState.disabled === nextState.disabled) {
      return true
    }
    let button = dom.querySelector('button')
    nextState.disabled
      ? button.setAttribute('disabled', '')
      : button.removeAttribute('disabled')
  }
  render () {
    console.warn('Entire tree rendered')
    let container = document.createElement('span')
    let button = document.createElement('button')
    button.innerText = 'Test success'
    this.getAttribute('disabled') === ''
      ? button.setAttribute('disabled', '')
      : button.removeAttribute('disabled')
    container.appendChild(button)
    return container
  }
}

customElements.define('x-button', XButton)
