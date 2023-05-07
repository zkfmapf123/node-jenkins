export class DtoParent<T> {
  constructor() {}

  process(_data: any = {}): { data: T; error: string[] } {
    throw new Error('must be override')
  }
}
