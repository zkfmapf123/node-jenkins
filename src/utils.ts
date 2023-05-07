import { DtoParent } from '@src/base/index'
import { dbConn } from '@src/utils/index'
import { failed, passed, Try } from 'huelgo-monad'

/**
 * Database Mapping Logic
 */
export namespace db {
  export async function execute(prepareQuery: string, params: (string | number)[]): Promise<Try<any, null>> {
    const _dbConn = await dbConn.conn().getConnection()

    try {
      await _dbConn.query(prepareQuery, params)
      return passed(null)
    } catch (e) {
      console.error(e)
      return failed(e)
    } finally {
      _dbConn.release()
    }
  }

  export async function retrive<T>(prepareQuery: string, params: (string | number)[], dto: DtoParent<T>): Promise<Try<any, T>> {
    const _dbConn = await dbConn.conn().getConnection()

    try {
      const [result] = (await _dbConn.query(prepareQuery, params)) as unknown[][]
      const { data, error } = dto.process(result[0])

      if (error?.length > 0) {
        throw error
      }

      return passed(data)
    } catch (e) {
      console.error(e)
      return failed(e)
    } finally {
      _dbConn.release()
    }
  }

  export const retriveMapper = async <T>() => {
    throw new Error('must be implementation')
  }
}
