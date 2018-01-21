import * as fs from 'fs'
import { PathLike } from 'fs'

const defaultOptions = {
    encoding: 'utf-8',
}

export const readFile = async (path: PathLike, options = defaultOptions): Promise<any> => {

    return new Promise((resolve, reject) => {
        fs.readFile(path, options, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })

}