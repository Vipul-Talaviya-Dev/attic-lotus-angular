import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../services/common.service';

@Injectable()
export class SearchResolve implements Resolve<any> {
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
      return route.params['city'];
    } catch (e) {
      console.log('OrderResolve data called');
    }
  }
}
