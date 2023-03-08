import { Component, OnInit } from '@angular/core'
import { IdService } from './id/id.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private idService: IdService) {}

    ngOnInit(): void {
        this.idService.createUserIDIfNotExists()
    }
}
