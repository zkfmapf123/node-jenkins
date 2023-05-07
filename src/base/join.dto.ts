import { szModel, szParam } from 'huelgo-sz'
import { DtoParent } from './dto'

export interface JoinParmas {
  name: string
  email: string
  password: string
  rePassword: string
  countryCode: string
}

class JoinDto<T> extends DtoParent<T> {
  override process(_data?: any): { data: T; error: string[] } {
    return szModel<JoinParmas>({
      name: szParam().set(_data?.name, 'name').required(),
      email: szParam().set(_data?.email, 'email').required(),
      password: szParam().set(_data?.password, 'password').required(),
      rePassword: szParam().set(_data?.re_password, 're_password').required(),
      countryCode: szParam().set(_data?.country_code, 'country_code').required(),
    }).validate()
  }
}

export const joinDto = new JoinDto<JoinParmas>()
