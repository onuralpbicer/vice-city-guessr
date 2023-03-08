import { Injectable } from '@angular/core'
import { v4 as uuid } from 'uuid'

@Injectable()
export class IdService {
    private userID!: string
    private readonly userID_key = 'user_id'

    constructor() {}

    public createUserIDIfNotExists(): void {
        const id = localStorage.getItem(this.userID_key)
        if (id) {
            this.userID = id
        } else {
            this.userID = uuid()
            localStorage.setItem(this.userID_key, this.userID)
        }
    }

    public getUserID(): string {
        return this.userID
    }
}
