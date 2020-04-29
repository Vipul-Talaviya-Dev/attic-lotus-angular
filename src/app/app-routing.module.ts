import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ReadyToMoveComponent} from './pages/readyToMove/readyToMove.component';
import {DetailComponent} from './pages/detail/detail.component';
import {SearchComponent} from './pages/search/search.component';
import {SearchResolve} from './resolve/search.resolve';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'ready-to-move', component: ReadyToMoveComponent },
  /*{
    path: 'property/:slug', component: DetailComponent,
    resolve: {
      property: PropertyResolve
    }
  },*/
  { path: 'detail', component: DetailComponent },
  // { path: 'location', component: SearchComponent },
  {
    path: ':city', component: SearchComponent,
    resolve: {
      property: SearchResolve
    }
  }
  /*{
    path: 'property/:slug', component: DetailComponent,
    resolve: {
      property: PropertyResolve
    }
  },
  {
    path: ':city', component: SearchComponent,
    resolve: {
      property: SearchResolve
    }
  },*/
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
