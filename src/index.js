export default class Arc extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.appendChild(this.render())
  }
  getPublicAttributes () {
    return null
  }
  reconcile (dom, prevState, nextState) {
    // Make changes to the DOM directly instead of re-rendering the component again
    // If this method returns false, the entire DOM will be reconstructed
    // If this method returns true, render cycle will not execute
    // By default, changes in data will re-construct the entire DOM tree
    // TODO: Use a reconciliation logic similar to React to only make necessary changes
    return this.render()
  }
  render () {
    // Render should return a DOM tree
    throw new Error('Cannot initialize Component with no render method')
  }
}
