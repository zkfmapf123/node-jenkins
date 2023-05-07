import express from 'express'
import { authRouter } from './src/router'

enum Router {
  HEALTH_CHECK = '/healthCheck',
  LOGIN = '/login',
  JOIN = '/join',
  FIND_EMAIL = '/findEmail',
  FIND_PASSWORD = '/findPassword',
  LOGOUT = '/logout',
}

// Router
const router = express
  .Router()
  .get('/', (req, res) => res.send('hello world'))
  .get(Router.HEALTH_CHECK, authRouter.healthCheck)
  .post(Router.LOGIN, authRouter.login)
  .post(Router.JOIN, authRouter.join)
  .post(Router.FIND_EMAIL, authRouter.findEmail)
  .post(Router.FIND_PASSWORD, authRouter.findPassword)

// Server
express()
  .use(express.json())
  .use('/v1', router)
  .listen(process.env.PORT, () => console.log(`localhost connect to ${process.env.PORT}`))
