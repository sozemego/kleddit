import {hashWithSalt, matches} from './utils/password-hash'

describe('password hashing', () => {
    it('Should hash a valid password', () => {
        const password = 'cool password'
        const hash = hashWithSalt(password)
        expect(hash).toBeDefined()
        expect(matches(password, hash)).toBeTruthy()
    })
    it('Should work for an empty password', () => {
        const password = ''
        const hash = hashWithSalt(password)
        expect(hash).toBeDefined()
        expect(matches(password, hash)).toBeTruthy()
    })
    it('Should work for a very long password', () => {
        const password = new Array(500).fill('A').join('')
        const hash = hashWithSalt(password)
        expect(hash).toBeDefined()
        expect(matches(password, hash)).toBeTruthy()
    })
    it('Should hash the same password to different hashes each time', () => {
        const password = 'cool password'
        const hashes = new Set()
        const iterations = 5
        for(let i = 0; i < iterations; i++) {
            hashes.add(hashWithSalt(password))
        }
        expect(hashes.size).toBe(iterations)
        const hashArray = [...hashes]
        for(let i = 0; i < iterations; i++) {
            expect(matches(hashArray[i], password))
        }
    })
    it('should not match hashes from different passwords', () => {
        const password1 = 'pass'
        const password2 = 'pass2'

        const hash1 = hashWithSalt(password1)
        const hash2 = hashWithSalt(password2)
        expect(matches(password1, hash1)).toBeTruthy()
        expect(matches(password2, hash2)).toBeTruthy()
        expect(matches(password1, hash2)).toBeFalsy()
        expect(matches(password2, hash1)).toBeFalsy()

    })

})