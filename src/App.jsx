import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter'
import LogsTerminal from './components/common/LogsTerminal'
import './App.css'

function App() {
  const [isLogsOpen, setIsLogsOpen] = useState(false)

  return (
    <BrowserRouter>
      <div className="relative">
        <AppRouter />
        <LogsTerminal 
          isOpen={isLogsOpen} 
          onClose={() => setIsLogsOpen(false)} 
        />
        
        {/* Botón flotante para abrir logs */}
        <button
          onClick={() => setIsLogsOpen(true)}
          className="fixed bottom-4 right-4 z-40 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
          title="Abrir logs del sistema"
        >
          📄
        </button>
      </div>
    </BrowserRouter>
  )
}

export default App
