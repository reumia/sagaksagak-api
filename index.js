import bodyParser from 'body-parser'
import express from 'express'
import users from './routes/users'
import comics from './routes/comics'
import cuts from './routes/cuts'

const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/users', users)
app.use('/comics', comics)
app.use('/cuts', cuts)

app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
    console.log(`Listening on ${app.get('port')}`)
})