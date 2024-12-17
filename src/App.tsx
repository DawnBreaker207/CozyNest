import Router from './routes'
import Token from './services/check'

const App = () => {
  return (
    <>
      <Token />
      <Router />
    </>
  )
}

export default App
