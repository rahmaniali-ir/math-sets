import { GlobalProvider } from "./providers/global"

import Collections from "./components/collections/Collections"
import Relations from "./components/relations/Relations"
import Icon from "./components/icon/Icon"

function App() {
  return (
    <GlobalProvider>
      <div className='app'>
        <Collections />
        <Relations />

        <footer>
          With
          <span className='love'>
            <Icon name='heart' />
          </span>
          By
          <strong>
            <a href='https://rahmaniali.ir' target='_blank' rel='noreferrer'>
              Ali Rahmani
            </a>
          </strong>
        </footer>
      </div>
    </GlobalProvider>
  )
}

export default App
