export enum ClientMessages {
    Connected = 'connection',
    Disconnect = 'disconnect',
    MakeGuess = 'MakeGuess',
}

export enum ServerMessages {
    Disconnect = 'disconnect',
    ConnectError = 'connect_error',
    StartedGame = 'StartedGame',
    GuessResult = 'GuessResult',
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

export type ILocation = Omit<GameLocation, 'actualLatLng'> &
    Partial<Pick<GameLocation, 'actualLatLng'>>
