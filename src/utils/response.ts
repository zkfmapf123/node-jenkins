export const passResponse = <T>(res: any, status: number, data: T) => res.status(status).json({ data })

export const failResponse = <T>(res: any, status: number, type: string, data: T) =>
  res.status(status).json({
    status,
    exception: {
      type,
      data,
    },
  })

export const exResponse = <T, R>(value: T, isPassCond: (v: T) => boolean, passResponse: () => R, failResponse: () => R) => {
  if (isPassCond(value)) {
    return passResponse()
  }

  return failResponse()
}
