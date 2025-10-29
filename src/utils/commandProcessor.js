const commandProcessor = {
  processCommand: (command) => {
    const cmd = command.trim().toLowerCase()
    
    switch (cmd) {
      case 'help':
        return {
          type: 'system',
          content: 'Available commands: help, scan, update, status, threats, logs, clear'
        }
        
      case 'scan':
        return {
          type: 'success',
          content: 'Security scan completed. No threats detected.'
        }
        
      case 'update':
        return {
          type: 'warning',
          content: 'Updates available. Please run system update.'
        }
        
      case 'status':
        return {
          type: 'success',
          content: 'All systems operational. Security status: GREEN'
        }
        
      case 'threats':
        return {
          type: 'success',
          content: 'No active threats detected.'
        }
        
      case 'logs':
        return {
          type: 'system',
          content: 'Displaying recent system logs...'
        }
        
      default:
        return {
          type: 'error',
          content: `Unknown command: ${cmd}. Type "help" for available commands.`
        }
    }
  }
}

export default commandProcessor