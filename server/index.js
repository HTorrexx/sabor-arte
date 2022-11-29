import app from './app.js'
import {connectDB} from './db.js'
import {desconectDb} from './db.js'
import {PORT} from './config.js'

connectDB()

/*   desconectDb()  */ 

app.listen(PORT)
console.log('Server is ready')                                                                                                                                                                                                                                                                                                                                  