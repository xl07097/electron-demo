import logger from 'electron-log'

logger.transports.console.level = false
logger.transports.console.level = 'silly'

export default logger
