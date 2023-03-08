import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { ClientMessages, ServerMessages } from 'shared'
import { v4 as uuid } from 'uuid'
import { promises as fs } from 'fs'
import path from 'path'

const io = new Server(3000, {
    cors: {
        origin: '*',
        methods: '*',
    },
})

interface LatLng {
    lat: number
    lng: number
}

interface GameLocation {
    id: string
    actualLatLng: LatLng
    score?: number
}

interface Game {
    locations: GameLocation[]
    maxScorePerRound: number
}

interface GamePayload extends Pick<Game, 'maxScorePerRound'> {
    locations: GameLocation['id'][]
}

const ongoingGames: {
    [key: string]: Game
} = {}

const locationsDir = '../locations'
const coordsDir = path.join(locationsDir, 'coords')

function getRandomIndex(length: number) {
    return Math.floor(Math.random() * length)
}

async function initializeLocations(count = 5): Promise<GameLocation[]> {
    const allLocations = await fs.readdir(coordsDir)

    const availableLocations: GameLocation[] = await Promise.all(
        allLocations.map(async (id) => {
            const latlngStr = (
                await fs.readFile(path.join(coordsDir, id))
            ).toString()
            const [lat, lng] = latlngStr.split('-').map((i) => Number(i))
            return { id, actualLatLng: { lat, lng } }
        }),
    )

    const locationList: GameLocation[] = []

    let i = 0
    while (i < 5) {
        locationList.push(
            ...availableLocations.splice(
                getRandomIndex(availableLocations.length),
                1,
            ),
        )

        i++
    }

    return locationList
}

async function initialiseGame(): Promise<Game> {
    return {
        locations: await initializeLocations(),
        maxScorePerRound: 500,
    }
}

function getUIPayloadOfGame(game: Game): GamePayload {
    return {
        maxScorePerRound: game.maxScorePerRound,
        locations: game.locations.map((location) => location.id),
    }
}

io.on(ClientMessages.Connected, (socket) => {
    socket.on(ClientMessages.Disconnect, () => {
        delete ongoingGames[socket.id]
    })

    initialiseGame().then((game) => {
        ongoingGames[socket.id] = game

        socket.emit(ServerMessages.StartedGame, getUIPayloadOfGame(game))
    })
})
