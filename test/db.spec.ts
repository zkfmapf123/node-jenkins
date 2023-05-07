import dayjs from 'dayjs'
import fs from 'fs'
import { failed, isPass, passed } from 'huelgo-monad'
import { UserDto, UserParams } from '../src/base/users.dto'
import { db } from '../src/utils'

jest.mock('../src/utils')

describe('database test', () => {
  const mockUser = JSON.parse(fs.readFileSync(process.cwd() + '/test/mocks/users.json', 'utf-8'))['users']

  beforeEach(() => {
    jest.spyOn(db, 'execute').mockImplementation(async (prepareQuery: string, params: (string | number)[]) => {
      if (prepareQuery.match(/\?/g)?.length === params?.length) {
        return passed(null)
      }

      return failed(null)
    })

    jest.spyOn(db, 'retrive').mockImplementation(async (prepareQuery: string, params: (string | number)[]) => {
      if (prepareQuery.match(/\?/g)?.length !== params?.length) {
        return failed(null)
      }

      return passed({
        countryCode: 'KR',
        name: 'leedonggyu',
        email: 'zkfmapf123@naver.com',
      })
    })
  })

  beforeAll(async () => {
    for (const { name, email } of mockUser) {
      await db.execute(
        `insert into users
        (name, email, password, created_at, updated_at, country_code)
        values(?,?,?,?,?,?)`,
        [name, email, '1234', dayjs().unix(), dayjs().unix(), 'KR']
      )
    }
  })

  afterAll(async () => {
    for (const { name } of mockUser) {
      await db.execute(`delete from users where name in (?)`, [name])
    }
  })

  it('db conn test', async () => {
    const v = await db.retrive<UserParams>('select * from users where name = ?', ['leedonggyu'], new UserDto())

    expect(isPass(v)).toBe(true)

    if (isPass(v)) {
      expect(v.value.countryCode).toBe('KR')
      expect(v.value.name).toBe('leedonggyu')
      expect(v.value.email).toBe('zkfmapf123@naver.com')
    }
  }, 1000)
})
