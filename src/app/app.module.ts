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
    PrivacyPolicyComponent,
    TermConditionComponent,
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
    SearchResolve,
    CommonService,
    APP_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
