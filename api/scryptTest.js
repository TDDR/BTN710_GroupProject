const scrypt = require('../node-scrypt')
const scryptParams = {N: 1, r:1, p:1}

let pass = Buffer.from('password', 'ascii')
let wrong = Buffer.from('pass', 'ascii')

var h, t, f

scrypt.kdf(pass, scryptParams)
    .then((res) =>{
        //scrypt.verifyKdf(res, pass)
        scrypt.verifyKdf(res, wrong)
        .then((res) =>{
        t = res
        console.log(t)
    })
})

