export class UserRepository {
  async verifyName(name: string) {}

  async verifyEmail(email: string) {}

  verifyPassword(password: string, rePassword: string): boolean {
    return password === rePassword
  }
}
