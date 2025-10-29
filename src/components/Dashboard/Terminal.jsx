import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import useTerminal from '../../hooks/useTerminal.js'
import commandProcessor from '../../utils/commandProcessor.js'

const Terminal = forwardRef((props, ref) => {
  const [inputValue, setInputValue] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef(null)
  const outputRef = useRef(null)
  
  const { 
    terminalOutput, 
    executeCommand, 
    clearTerminal 
  } = useTerminal()

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }))

  useEffect(() => {
    // Auto-scroll to bottom when new output is added
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [terminalOutput])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (inputValue.trim() === '') return
    
    // Add to command history
    setCommandHistory(prev => [...prev, inputValue])
    setHistoryIndex(-1)
    
    // Execute command
    executeCommand(inputValue)
    
    // Clear input
    setInputValue('')
  }

  const handleKeyDown = (e) => {
    // Handle up/down arrow keys for command history
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < 0 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInputValue(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex >= 0) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1)
        setHistoryIndex(newIndex)
        setInputValue(commandHistory[newIndex])
      } else if (historyIndex === -1 && commandHistory.length > 0) {
        setHistoryIndex(commandHistory.length)
        setInputValue('')
      }
    }
  }

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-title">SurakshaNet Terminal v1.0</div>
        <div className="terminal-controls">
          <button className="terminal-control" onClick={clearTerminal}>Clear</button>
        </div>
      </div>
      
      <div className="terminal-output" ref={outputRef}>
        {terminalOutput.map((line, index) => (
          <div 
            key={index} 
            className={`terminal-line ${line.type}`}
          >
            {line.content}
          </div>
        ))}
      </div>
      
      <form className="terminal-input-container" onSubmit={handleSubmit}>
        <span className="terminal-prompt">$</span>
        <input
          ref={inputRef}
          type="text"
          className="terminal-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck="false"
        />
      </form>
    </div>
  )
})

export default Terminal