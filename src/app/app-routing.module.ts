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
import {SupportComponent} from './pages/support/support.component';
import {BlogDetailComponent} from './pages/blog-detail/blog-detail.component';
import {BlogDetailResolve} from './resolve/blog-detail.resolve';
import {CustomBuildComponent} from './pages/customBuild/customBuild.component';
import {LandlordComponent} from './pages/landlord/landlord.component';
import {BrokersComponent} from './pages/brokers/brokers.component';
import {NewsRoomComponent} from './pages/newsRoom/newsRoom.component';
import {NewsRoomDetailResolve} from './resolve/newsRoom-detail.resolve';
import {NewsRoomDetailComponent} from './pages/newsRoom-detail/newsRoom-detail.component';
import {AboutComponent} from './pages/about/about.component';
import {UpcomingPrpertiesComponent} from './pages/upcomingPrperties/upcomingPrperties.component';
import {DemandLocationComponent} from './pages/demandLocation/demandLocation.component';
import {AboutDetailComponent} from './pages/about-detail/about-detail.component';
import {AboutDetailResolve} from './resolve/about-detail.resolve';
import {CookiesComponent} from './pages/cookies/cookies.component';
import {SitemapComponent} from './pages/sitemap/sitemap.component';
import {NotFoundComponent} from './pages/notFound/notFound.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'ready-to-use', component: ReadyToMoveComponent },
  { path: 'custom-build', component: CustomBuildComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'terms', component: TermConditionComponent },
  { path: 'cookies', component: CookiesComponent },
  { path: 'sitemap', component: SitemapComponent },
  { path: 'all-locations', component: MapViewComponent },
  { path: 'landlord', component: LandlordComponent },
  { path: 'brokers', component: BrokersComponent },
  { path: 'ideas', component: BlogComponent },
  {
    path: 'ideas/:slug', component: BlogDetailComponent,
    resolve: {
      blog: BlogDetailResolve
    }
  },
  { path: 'newsroom', component: NewsRoomComponent },
  {
    path: 'newsroom/:slug', component: NewsRoomDetailComponent,
    resolve: {
      newsroom: NewsRoomDetailResolve
    }
  },
  {
    path: 'about/:slug', component: AboutDetailComponent,
    resolve: {
      about: AboutDetailResolve
    }
  },
  { path: 'support', component: SupportComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'upcoming-properties', component: UpcomingPrpertiesComponent },
  { path: 'on-demand-location', component: DemandLocationComponent },
  {
    path: 'office-space/:locationName/:slug', component: DetailComponent,
    resolve: {
      property: PropertyResolve
    }
  },
  {
    path: 'Bangalore', component: SearchComponent,
    resolve: {
      property: SearchResolve
    }
  },
  {
    path: 'Hyderabad', component: SearchComponent,
    resolve: {
      property: SearchResolve
    }
  },
  /*{
    path: ':city', component: SearchComponent,
    resolve: {
      property: SearchResolve
    }
  },*/
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
