import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { ClientMessages } from 'shared/src'
import { v4 as uuid } from 'uuid'

const io = new Server(3000)

io.on('connection', (socket) => {
    console.log(socket)
})
