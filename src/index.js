import 'babel-polyfill'
import ReactDOM from 'react-dom'
import React from 'react'

class App extends React.Component {

  render() {
    return <h1>hello react</h1>
  }

}

ReactDOM.render(<App/>, document.getElementById('root'))
