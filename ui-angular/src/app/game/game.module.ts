import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GameService } from './game.service'
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io'

const socketIOConfig: SocketIoConfig = {
    url: 'http://localhost:3000',
    options: {
        autoConnect: false,
        transports: ['websocket'],
    },
}

@NgModule({
    declarations: [],
    imports: [CommonModule, SocketIoModule.forRoot(socketIOConfig)],
    providers: [GameService],
})
export class GameModule {}
