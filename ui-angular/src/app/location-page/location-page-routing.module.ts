import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LocationPageComponent } from './location-page.component'

const routes: Routes = [
    {
        path: ':id',
        component: LocationPageComponent,
    },
    {
        path: '**',
        redirectTo: '/',
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LocationPageRoutingModule {}
