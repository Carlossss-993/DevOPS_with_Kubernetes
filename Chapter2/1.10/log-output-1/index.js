const fs = require('fs')
const path = require('path')

const crypto = require('crypto')

const directory = path.join('/', 'app', 'files')

const randomString = crypto.randomUUID()

const filePath = path.join(directory, 'random-string.txt')

const writeFile = async () => new Promise(res => {
  const message = `[${new Date().toISOString()}]: ${randomString}`
  fs.writeFile(filePath, message, (err) => {
    if (err) return console.log('FAILED TO WRITE FILE', '----------------', err)
    res()
  })
})

setInterval(writeFile, 5000)