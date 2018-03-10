import Arc from './src'

class XButton extends Arc {
  render () {
    let button = document.createElement('button')
    button.innerText = 'Test success'
    return button
  }
}

customElements.define('x-button', XButton)
