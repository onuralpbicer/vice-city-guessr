import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    {
        path: 'map',
        loadChildren: () =>
            import('./map-page/map-page.module').then((m) => m.MapPageModule),
    },
    {
        path: '**',
        redirectTo: 'map',
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
