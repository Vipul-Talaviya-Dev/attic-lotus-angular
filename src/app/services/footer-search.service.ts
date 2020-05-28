import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class FooterSearchService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
  }

  getProperties(name): Observable<any> {
    this.configService.notifyLoaderEmitter(false);
    let endPoint = environment.api;
    let apiURL = endPoint + 'properties?name='+name;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let requestOptions:object = {
      headers: headers,
      responseType: 'json'
    };

    return this.http.get(apiURL, requestOptions).pipe(
      map(res => { return this.extractData(res); }),
      catchError(error => {
        return this.handleError(error);
      }),
    );
  }

  getBlogSearch(name): Observable<any> {
    this.configService.notifyLoaderEmitter(false);
    let endPoint = environment.api;
    let apiURL = endPoint + 'getBlogSearch?name='+name;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let requestOptions:object = {
      headers: headers,
      responseType: 'json'
    };

    return this.http.get(apiURL, requestOptions).pipe(
      map(res => { return this.extractData(res); }),
      catchError(error => {
        return this.handleError(error);
      }),
    );
  }

  private extractData(res) {
    this.configService.notifyLoaderEmitter(false);
    return res || {};

  }

  private handleError(error: any) {
    this.configService.notifyLoaderEmitter(false);
    let errMsg = error.message || 'Server error';
    return throwError(errMsg);
  }

}
