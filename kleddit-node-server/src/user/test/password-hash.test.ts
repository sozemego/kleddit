import PasswordHash from '../utils/PasswordHash'

const passwordHash = new PasswordHash()

describe('passwordHash', () => {
    it('Should hash a valid password', () => {
        const password = 'cool password'
        const hash = passwordHash.hashWithSalt(password)
        expect(hash).toBeDefined()
        expect(passwordHash.matches(password, hash)).toBeTruthy()
    })
    it('Should work for an empty password', () => {
        const password = ''
        const hash = passwordHash.hashWithSalt(password)
        expect(hash).toBeDefined()
        expect(passwordHash.matches(password, hash)).toBeTruthy()
    })
    it('Should work for a very long password', () => {
        const password = new Array(500).fill('A').join('')
        const hash = passwordHash.hashWithSalt(password)
        expect(hash).toBeDefined()
        expect(passwordHash.matches(password, hash)).toBeTruthy()
    })
    it('Should hash the same password to different hashes each time', () => {
        const password = 'cool password'
        const hashes = new Set()
        const iterations = 5
        for(let i = 0; i < iterations; i++) {
            hashes.add(passwordHash.hashWithSalt(password))
        }
        expect(hashes.size).toBe(iterations)
        const hashArray = [...hashes]
        for(let i = 0; i < iterations; i++) {
            expect(passwordHash.matches(hashArray[i], password))
        }
    })
    it('should not match hashes from different passwords', () => {
        const password1 = 'pass'
        const password2 = 'pass2'

        const hash1 = passwordHash.hashWithSalt(password1)
        const hash2 = passwordHash.hashWithSalt(password2)
        expect(passwordHash.matches(password1, hash1)).toBeTruthy()
        expect(passwordHash.matches(password2, hash2)).toBeTruthy()
        expect(passwordHash.matches(password1, hash2)).toBeFalsy()
        expect(passwordHash.matches(password2, hash1)).toBeFalsy()

    })

})