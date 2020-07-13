import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../services/common.service';

@Injectable()
export class AboutDetailResolve implements Resolve<any> {
  constructor(
    public http: HttpClient, public router: Router,
    public toaster: ToastrService,
    public commonService: CommonService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    try {
      return this.commonService.getAboutDetail(route.params['slug']).pipe(
        map(res => { return this.aboutDetail(res); }),
        catchError(error => {
          return this.handleError(error);
        }),
      );
    } catch (e) {
      console.log('About Resolver data called');
    }
  }

  private aboutDetail(res) {
    if (res.status === false) {
      this.router.navigate(['/']).then(() => {
        this.toaster.error('Oop, Property Not Found...!!', 'Warning !!!');
      });
    }
    return res || {};
  }

  private handleError(error: any) {
    let errMsg = error.message || 'Server error';
    return throwError(errMsg);
  }
}
