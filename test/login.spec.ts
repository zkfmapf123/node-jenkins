import { UserRepository } from '../src/repository'

describe('loginRouter Test', () => {
  const userRepository = new UserRepository()

  // it('[TEST] already exitst email', () => {})

  // it('[TEST] already existe name', () => {})

  it('[TEST] not matched password', (done) => {
    expect(userRepository.verifyPassword('XXXX', '1234')).toEqual(false)
    done()
  })

  it('[TEST] matched password', (done) => {
    expect(userRepository.verifyPassword('1234', '1234')).toEqual(true)
    done()
  })
})
