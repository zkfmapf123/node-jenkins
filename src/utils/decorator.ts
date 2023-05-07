import { DtoParent } from '@src/base'
import { NextFunction, Request, Response } from 'express'
import { failResponse } from './response'

/**
 * @desc req.body
 */
export function validBody<T>(dto: DtoParent<T>) {
  return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
    const originMethod = descriptor.value

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      const { data, error } = dto.process(req?.body)

      if (error?.length > 0) {
        return failResponse(res, 400, 'invalid paramters', error)
      }

      return await originMethod.apply(this, [
        {
          ...req,
          body: data,
        },
        res,
        next,
      ])
    }

    return descriptor
  }
}

/**
 * @desc verify token
 */
export function validHeader(message: string) {
  return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
    const originMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
      return originMethod.apply(this, args)
    }

    return descriptor
  }
}
