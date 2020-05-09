import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class CommonService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
  }

  getIndex(): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'index';

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

  getAmenities(): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'amenities';

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

  getCities(): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'cities';

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

  getQuestions(): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'questions';

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

  getLocations(city): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'locations?city='+city;

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

  getOfficeContact(): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'office-contact';

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

  getPolicy(): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'privacy-policy';

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

  getTermCondition(): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'term-condition';

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

  searchLocation(data): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    const endPoint = environment.api;
    const apiURL = endPoint + 'location-search';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const requestOptions: object = {
      headers: headers,
      responseType: 'json'
    };
    const body = JSON.stringify(data);

    return this.http.post(apiURL, body, requestOptions).pipe(
      map(res => {
        return this.extractData(res);
      }),
      catchError(error => {
        return this.handleError(error);
      }),
    );
  }

  contact(data): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    const endPoint = environment.api;
    const apiURL = endPoint + 'contact';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const requestOptions: object = {
      headers: headers,
      responseType: 'json'
    };
    const body = JSON.stringify(data);

    return this.http.post(apiURL, body, requestOptions).pipe(
      map(res => {
        return this.extractData(res);
      }),
      catchError(error => {
        return this.handleError(error);
      }),
    );
  }
  inquiry(data): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    const endPoint = environment.api;
    const apiURL = endPoint + 'inquiry';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const requestOptions: object = {
      headers: headers,
      responseType: 'json'
    };
    const body = JSON.stringify(data);

    return this.http.post(apiURL, body, requestOptions).pipe(
      map(res => {
        return this.extractData(res);
      }),
      catchError(error => {
        return this.handleError(error);
      }),
    );
  }
  getProperties(city): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'properties?city='+city;

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

  getBlogs(): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'blogs';

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

  getArticles(tagId): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'articles?tag='+tagId;

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
  /**
   * get single Record
   * @param slug
   * @returns {Observable<any>}
   */
  getPropertyDetail(slug) {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'property/'+slug;

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

  getCommon(): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'common';

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
