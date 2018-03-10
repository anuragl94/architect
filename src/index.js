export default class Arc extends HTMLElement {
  constructor () {
    super()
    this.shadowroot = this.attachShadow({ mode: 'open' })
    // TODO: Split render functionality into 2 separate sections:
    // 1. Rendering DOM
    // 2. Rendering Shadow DOM

    // Define properties
    const attributes = this.constructor.properties || {}
    Object.keys(attributes).map(attribute => {
      const get = (
        attributes[attribute].type === Boolean
          ? () => this.hasAttribute(attribute)
          : () => this.getAttribute(attribute)
      )
      const set = newValue => {
        const oldValue = this[attribute]
        if (attributes[attribute].type === Boolean) {
          newValue ? this.setAttribute(attribute, '') : this.removeAttribute(attribute)
        } else {
          this.setAttribute(attribute, newValue)
        }
        this.__renderChanges({ [attribute]: oldValue }, { [attribute]: newValue })
      }
      Object.defineProperty(this, attribute, { get, set })
    })
  }
  static get observedAttributes () {
    return Object.keys(this.properties || {})
  }
  connectedCallback () {
    this.shadowroot.appendChild(this.render())
  }
  disconnectedCallback () {
    this.shadowroot.removeChild(this.shadowroot.lastChild)
  }
  attributeChangedCallback (name, oldValue, newValue) {
    // TODO: Provide an abstracted hook
  }
  __renderChanges (prevState, nextState) {
    // When attributes change and view needs to be re-rendered
    let currentTree = this.shadowroot.lastChild
    if (!currentTree) {
      return
    }
    console.debug('Reconciliation', {
      dom: currentTree,
      prevState,
      nextState
    })
    const reconciliation = this.reconcile(currentTree, prevState, nextState)
    if (reconciliation instanceof Node) {
      this.shadowroot.replaceChild(reconciliation, currentTree)
    } else if (reconciliation === false) {
      this.shadowroot.replaceChild(this.render())
    }
  }
  reconcile (dom, prevState, nextState) {
    // Make changes to the DOM directly instead of re-rendering the component again
    // If this method returns false, the entire DOM will be reconstructed
    // If this method returns true, render cycle will not execute
    // If this method returns a Node, tree will be replaced with the Node
    // By default, changes in data will re-construct the entire DOM tree
    // TODO: Use a reconciliation logic similar to React to only make necessary changes
    return this.render()
  }
  render () {
    // Render should return a DOM tree
    throw new Error('Cannot initialize Component with no render method')
  }
}
