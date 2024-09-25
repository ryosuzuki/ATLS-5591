const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const app = express()
const server = http.Server(app)
const io = socketio(server)

app.use(express.static(__dirname))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
})

server.listen(3000, () => {
  console.log('listening on 3000')
})

io.on('connection', (socket) => {
  console.log('connection start')
  socket.on('message', (message) => {
    io.sockets.emit('message', message)
  })

  socket.on('disconnect', () => {
    console.log('connection end')
  })
})