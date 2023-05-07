import { Request, Response } from 'express'
import { joinDto } from './base/join.dto'
import { validBody } from './utils/decorator'

class AuthRouter {
  async healthCheck(req: Request, res: Response): Promise<Response> {
    return res.status(200).send('success')
  }

  // validToken
  async home(req: Request, res: Response): Promise<Response> {
    return res.status(200).send('Simple Authentication Server')
  }

  @validBody(joinDto)
  async join(req: Request, res: Response): Promise<Response> {
    return res.status(200).send('join')
  }

  // validToken
  async login(req: Request, res: Response): Promise<Response> {
    return res.status(200).send('login')
  }

  // validBody
  async findEmail(req: Request, res: Response): Promise<Response> {
    return res.status(200).send('findEmail')
  }

  // validBody
  async findPassword(req: Request, res: Response): Promise<Response> {
    return res.status(200).send('findEmail')
  }
}

export const authRouter = new AuthRouter()
