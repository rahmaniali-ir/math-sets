import { GlobalProvider } from "./providers/global"

import Collections from "./components/collections/Collections"
import Relations from "./components/relations/Relations"

function App() {
  return (
    <GlobalProvider>
      <div className='app'>
        <Collections />
        <Relations />
      </div>
    </GlobalProvider>
  )
}

export default App
