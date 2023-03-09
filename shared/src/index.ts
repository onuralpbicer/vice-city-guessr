export enum ClientMessages {
    Connected = 'connection',
    Disconnect = 'disconnect',
}

export enum ServerMessages {
    Disconnect = 'disconnect',
    ConnectError = 'connect_error',
    StartedGame = 'StartedGame',
}

export interface LatLng {
    lat: number
    lng: number
}

export interface GameLocation {
    id: string
    actualLatLng: LatLng
    score?: number
}

export interface Game {
    locations: GameLocation[]
    maxScorePerRound: number
}

export interface GamePayload extends Pick<Game, 'maxScorePerRound'> {
    locations: GameLocation['id'][]
}

export type ILocation = Omit<GameLocation, 'actualLatLng'>
