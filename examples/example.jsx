import React from 'react'
import ReactDOM from 'react-dom'
import { create } from '../src'

const STEP1 = 'step1'
const STEP2 = 'step2'
const STEP3 = 'step3'
const STEP4 = 'step4'
const STEP5 = 'step5'
const PATH = [STEP1, STEP2, STEP3, STEP4, STEP5]

class Example extends React.PureComponent {

  constructor() {
    super()
    this.state = {
      path: create(PATH, {})
    }
  }

  render() {
    const { path } = this.state
    return (
      <div>
        <div>
          { path.matches(STEP1) && this.renderStep(1) }
          { path.matches(STEP2) && this.renderStep(2) }
          { path.matches(STEP3) && this.renderStep(3) }
          { path.matches(STEP4) && this.renderStep(4) }
          { path.matches(STEP5) && this.renderStep(5) }
        </div>
        <div>
          <button onClick={ this.goBack.bind(this) }>Back</button>
          <button onClick={ this.goNext.bind(this) }>Next</button>
          <button onClick={ () => this.goTo(3) }>Go to step 3</button>
        </div>
      </div>
    )
  }

  renderStep(step) {
    return (
      <div>
        <p>Step { step }</p>
      </div>
    )
  }

  goBack(){
    this.setState({
      path: this.state.path.back()
    })
  }

  goNext(){
    this.setState({
      path: this.state.path.next()
    })
  }

  goTo(step) {
    this.setState({
      path: this.state.path.goTo(STEP3)
    })
  }

}

ReactDOM.render(
  <Example />
, document.getElementById('application'))