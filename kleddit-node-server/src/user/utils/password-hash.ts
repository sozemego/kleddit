import * as bcryptjs from 'bcryptjs'

export const hashWithSalt = (password: string): string => {
    const salt = bcryptjs.genSaltSync(10)
    return bcryptjs.hashSync(password, salt)
}

export const matches = (password: string, hash: string): boolean => {
    return bcryptjs.compareSync(password, hash)
}
