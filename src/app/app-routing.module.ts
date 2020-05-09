import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ReadyToMoveComponent} from './pages/readyToMove/readyToMove.component';
import {DetailComponent} from './pages/detail/detail.component';
import {SearchComponent} from './pages/search/search.component';
import {SearchResolve} from './resolve/search.resolve';
import {PropertyResolve} from './resolve/property.resolve';
import {PrivacyPolicyComponent} from './pages/privacyPolicy/privacyPolicy.component';
import {TermConditionComponent} from './pages/termCondition/termCondition.component';
import {MapViewComponent} from './pages/map-view/map-view.component';
import {BlogComponent} from './pages/blog/blog.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'ready-to-move', component: ReadyToMoveComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-condition', component: TermConditionComponent },
  { path: 'map-view', component: MapViewComponent },
  { path: 'blog', component: BlogComponent },
  {
    path: 'property/:slug', component: DetailComponent,
    resolve: {
      property: PropertyResolve
    }
  },
  // { path: 'detail', component: DetailComponent },
  {
    path: ':city', component: SearchComponent,
    resolve: {
      property: SearchResolve
    }
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
