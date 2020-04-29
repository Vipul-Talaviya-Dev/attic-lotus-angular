import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ConfigService {
  public loaderEmitter: EventEmitter<any> = new EventEmitter();

  constructor (public http: HttpClient) {
  }

  public getGtlApiEndPoint() {
    return '';
  }

  public notifyLoaderEmitter(arg) {
    this.loaderEmitter.next(arg);
  }
}
