const encrypt= require('./modules/encrypt')

const decrypt  = require('./modules/decrypt')


const TEXT = 'HELLO1211'

const KEY = 'testTest'

const encrypted = encrypt(KEY, TEXT)

console.log('Initial text: ', TEXT)

console.log('Encrypted text: ', encrypted)

const decrypted = decrypt(KEY, encrypted)

console.log('Decrypted text: ', decrypted)

