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

  getReadyToUse(): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'readyToUsePage';

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

  getCities(propertyLimit = 0): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'cities?propertyLimit='+propertyLimit;

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
  getHeaderCities(propertyLimit = 0): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'headerCities?propertyLimit='+propertyLimit;

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
  getPageContent(id): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'pageDetail/'+id;

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
  getaboutPage(): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'aboutPage';

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

  getCustomPage(): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'customPage';

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
  getQuestions(questionPage): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'questions?questionPage='+questionPage;

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

  getTestimonials(city): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'testimonials?city='+city;

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

  getCookies(): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'cookies';

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

  getSitemap(): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'sitemap';

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

  footerForm(data): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    const endPoint = environment.api;
    const apiURL = endPoint + 'footerForm';

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

  footerUpcomingLocation(data): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    const endPoint = environment.api;
    const apiURL = endPoint + 'upcoming-location';

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

  calculation(data): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    const endPoint = environment.api;
    const apiURL = endPoint + 'calculate';

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

  subscribe(data): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    const endPoint = environment.api;
    const apiURL = endPoint + 'subscribe';

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

  brokerLandlordFormData(data): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    const endPoint = environment.api;
    const apiURL = endPoint + 'brokerLandlordFormData';

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

  getNewsRooms(): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'newsRooms';

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

  getSupports(search = ''): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'supports?search='+search;

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

  getBlogDetail(slug) {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'blog/'+slug;

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

  getAboutDetail(slug) {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'about/'+slug;

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

  getNewsRoomDetail(slug) {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'newsRoom/'+slug;

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

  getLandLoads(): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'landlordPage';

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

  getDemandLocation(): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'demandLocationPage';

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

  getBrokers(): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'brokerPage';

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

  getUpcomingPropertiesPageData(): Observable<any> {
    this.configService.notifyLoaderEmitter(true);
    let endPoint = environment.api;
    let apiURL = endPoint + 'upcomingPrperties';

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
