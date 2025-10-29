import { useState, useEffect } from 'react'

const useTerminal = () => {
  const [terminalOutput, setTerminalOutput] = useState([
    { type: 'system', content: 'SurakshaNet Terminal v1.0' },
    { type: 'system', content: 'Type "help" for available commands.' },
    { type: 'output', content: '' }
  ])

  const executeCommand = (command) => {
    // Add command to output
    setTerminalOutput(prev => [...prev, { type: 'command', content: `$ ${command}` }])
    
    // Process command and add result
    const result = processCommand(command)
    setTerminalOutput(prev => [...prev, ...result])
  }

  const clearTerminal = () => {
    setTerminalOutput([
      { type: 'system', content: 'Terminal cleared.' },
      { type: 'output', content: '' }
    ])
  }

  const processCommand = (command) => {
    const cmd = command.trim().toLowerCase()
    const result = []
    
    switch (cmd) {
      case 'help':
        result.push({ type: 'system', content: 'Available commands:' })
        result.push({ type: 'output', content: 'help    - Show this help message' })
        result.push({ type: 'output', content: 'scan    - Run security scan' })
        result.push({ type: 'output', content: 'update  - Check for updates' })
        result.push({ type: 'output', content: 'status  - Show system status' })
        result.push({ type: 'output', content: 'threats - List detected threats' })
        result.push({ type: 'output', content: 'logs    - View system logs' })
        result.push({ type: 'output', content: 'clear   - Clear terminal' })
        break
        
      case 'scan':
        result.push({ type: 'system', content: 'Initializing security scan...' })
        result.push({ type: 'output', content: 'Scanning network infrastructure...' })
        result.push({ type: 'output', content: 'Analyzing endpoint security...' })
        result.push({ type: 'success', content: 'Scan complete. No threats detected.' })
        break
        
      case 'update':
        result.push({ type: 'system', content: 'Checking for updates...' })
        result.push({ type: 'output', content: 'Current version: v1.0.0' })
        result.push({ type: 'output', content: 'Latest version: v1.2.3' })
        result.push({ type: 'warning', content: 'Updates available. Run "update install" to apply.' })
        break
        
      case 'status':
        result.push({ type: 'system', content: 'System Status:' })
        result.push({ type: 'success', content: 'Network Security: Protected' })
        result.push({ type: 'success', content: 'Endpoint Protection: Active' })
        result.push({ type: 'success', content: 'Threat Detection: Monitoring' })
        result.push({ type: 'warning', content: 'System Updates: Pending' })
        break
        
      case 'threats':
        result.push({ type: 'system', content: 'Detected Threats (0):' })
        result.push({ type: 'success', content: 'No active threats detected.' })
        break
        
      case 'logs':
        result.push({ type: 'system', content: 'Recent System Logs:' })
        result.push({ type: 'output', content: '[2025-06-15 10:23:45] System scan completed successfully' })
        result.push({ type: 'output', content: '[2025-06-15 09:45:12] User authentication: admin@surakshanet.com' })
        result.push({ type: 'warning', content: '[2025-06-15 08:30:05] Failed login attempt from IP: 192.168.1.105' })
        break
        
      case 'clear':
        // This is handled separately
        break
        
      default:
        result.push({ type: 'error', content: `Command not found: ${cmd}` })
        result.push({ type: 'output', content: 'Type "help" for available commands.' })
    }
    
    // Always add an empty line for spacing
    result.push({ type: 'output', content: '' })
    
    return result
  }

  return {
    terminalOutput,
    executeCommand,
    clearTerminal
  }
}

export default useTerminal