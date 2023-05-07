export class UserRepository {
  async verifyName(name: string) {}

  async verifyEmail(email: string) {}

  async verifyPassword(password: string, rePassword: string) {
    return password === rePassword
  }
}
