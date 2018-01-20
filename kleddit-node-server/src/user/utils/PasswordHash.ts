import * as bcryptjs from 'bcryptjs'

class PasswordHash {

    public hashWithSalt(password: string): string {
        const salt = bcryptjs.genSaltSync(10)
        return bcryptjs.hashSync(password, salt)
    }

    public matches(password: string, hash: string): boolean {
        return bcryptjs.compareSync(password, hash)
    }

}

export default PasswordHash