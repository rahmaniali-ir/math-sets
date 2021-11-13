import { GlobalProvider } from "./providers/global"

import Collections from "./components/collections/Collections"
// import Matrix from "./components/matrix/Matrix"

function App() {
  return (
    <GlobalProvider>
      <div className='app'>
        <Collections />

        {/* <Matrix name='R' domain={a} range={b} relation={r} changed={toggleR} /> */}
      </div>
    </GlobalProvider>
  )
}

export default App
