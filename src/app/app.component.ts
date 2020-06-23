import {Component, OnInit, ViewContainerRef, AfterContentInit, ChangeDetectorRef} from '@angular/core';
import {ConfigService} from './services/config.service';
import {GlobalState} from './global.state';
import {ThemeSpinner} from './services/themeSpinner.service';
import {ImageLoaderService} from './services/imageLoader.service';
import {ThemePreloader} from './services/themePreloader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit, OnInit {
  title = 'attic-lotus-angular';
  private loaderEmitter = null;
  public isLoader = false;
  constructor(
    private _state: GlobalState, private viewContainerRef: ViewContainerRef, public configService: ConfigService,
    private _imageLoader: ImageLoaderService,
    private _spinner: ThemeSpinner,
    readonly cd: ChangeDetectorRef
  ) {
    // console.log("call app");
  }

  ngOnInit(): void {
    this.loaderEmitter = this.configService.loaderEmitter.subscribe((data) => {
      try {
        // console.log('loaderEmitter called=====', data);
        if (data === true) {
          this.isLoader = true;
        } else {
          this.isLoader = false;
        }
        this.cd.detectChanges();
      } catch (e) {
        console.log('eception caught in loaderEmitter');
      }
    });
  }

  public ngAfterContentInit(): void {
    // hide spinner once all loaders are completed
    ThemePreloader.load().then((values) => {
      this._spinner.hide();
    });

  }


}
