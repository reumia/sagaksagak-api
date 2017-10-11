import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import orm from 'orm'
import cors from 'cors'
import session from 'express-session'
import auth from './routes/auth'
import users from './routes/users'
import comics from './routes/comics'
import cuts from './routes/cuts'
import upload from './routes/upload'
import databaseConfig from './configs/database'

const app = express()

app.use(cors({
    origin: [ 'http://127.0.0.1:8080', 'https://sagaks.com', 'https://www.sagaks.com' ],
    credentials: true
}))

app.use(session({
    secret: '@#@$SAGAKSSECRET#@$#$',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
        domain: '127.0.0.1'
    }
}));

app.use(orm.express(databaseConfig, {
    define: (db, models, next) => {
        db.load('./models', (err) => {
            if (err) throw err
        })
        next()
    }
}))

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/auth', auth)
app.use('/users', users)
app.use('/comics', comics)
app.use('/cuts', cuts)
app.use('/upload', upload)

app.set('port', (process.env.PORT || 3001))

app.listen(app.get('port'), () => {
    console.log(`Listening on ${app.get('port')}`)
})