import { szModel, szParam } from 'huelgo-sz'
import { DtoParent } from './index'

export interface UserParams {
  id: string
  name: string
  email: string
  password: string
  createdAt: number
  updatedAt: number
  countryCode: string
}

export class UserDto<T> extends DtoParent<T> {
  override process(_data: any = {}): { data: T; error: string[] } {
    return szModel<UserParams>({
      id: szParam().set(_data?.id, 'id'),
      name: szParam().set(_data?.name, 'name'),
      email: szParam().set(_data?.email, 'email'),
      password: szParam().set(_data?.password, 'password'),
      createdAt: szParam().set(_data?.created_at, 'created_at'),
      updatedAt: szParam().set(_data?.updated_at, 'updated_at'),
      countryCode: szParam().set(_data?.country_code, 'country_code'),
    }).validate()
  }
}
