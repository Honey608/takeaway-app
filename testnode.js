const path = require('path')
const express = require('express')
const app = express()

let myPath3 = path.resolve('/foo/bar', '/baz')
let myPath4 = path.resolve('/foo/bar', './tmp/file/')
console.log(myPath3)
console.log(myPath4)
console.log(__dirname)
app.listen(5000)
