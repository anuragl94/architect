import Arc, { generateModel } from './src'

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
    this.shadowroot.children.length && console.warn('Entire tree rendered')
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

let button = document.querySelector('x-button')

let model = generateModel(button, { disabled: false })
// Click to test how the model works
button.onclick = e => { model.disabled = true }
window.model = model
