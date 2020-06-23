import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppState} from './app-service';
import {GlobalState} from './global.state';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {ConfigService} from './services/config.service';
import {MenuComponent} from './pages/menu/menu.component';
import {FooterComponent} from './pages/footer/footer.component';
import {CommonService} from './services/common.service';
import {ImageLoaderService} from './services/imageLoader.service';
import {ThemePreloader} from './services/themePreloader.service';
import {ThemeSpinner} from './services/themeSpinner.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {PropertyResolve} from './resolve/property.resolve';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchResolve} from './resolve/search.resolve';
import {ReadyToMoveComponent} from './pages/readyToMove/readyToMove.component';
import {DetailComponent} from './pages/detail/detail.component';
import {SearchComponent} from './pages/search/search.component';
import {PrivacyPolicyComponent} from './pages/privacyPolicy/privacyPolicy.component';
import {TermConditionComponent} from './pages/termCondition/termCondition.component';
import {MapViewComponent} from './pages/map-view/map-view.component';
import {BlogComponent} from './pages/blog/blog.component';
import {SupportComponent} from './pages/support/support.component';
import {BlogDetailComponent} from './pages/blog-detail/blog-detail.component';
import {FooterSearchService} from './services/footer-search.service';
import {BlogDetailResolve} from './resolve/blog-detail.resolve';
import {CustomBuildComponent} from './pages/customBuild/customBuild.component';
import {LandlordComponent} from './pages/landlord/landlord.component';
import {BrokersComponent} from './pages/brokers/brokers.component';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReadyToMoveComponent,
    DetailComponent,
    SearchComponent,
    MapViewComponent,
    BlogComponent,
    BlogDetailComponent,
    SupportComponent,
    PrivacyPolicyComponent,
    TermConditionComponent,
    CustomBuildComponent,
    LandlordComponent,
    BrokersComponent,
    MenuComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    CommonModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    ConfigService,
    ImageLoaderService,
    ThemePreloader,
    ThemeSpinner,
    PropertyResolve,
    BlogDetailResolve,
    SearchResolve,
    CommonService,
    FooterSearchService,
    APP_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
