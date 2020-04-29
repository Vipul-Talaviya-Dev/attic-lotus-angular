import {Compiler, Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public locations: any;
  public cityData = {
    title: '',
    left_text: '',
  };
  public contents: any;
  public properties: any;
  public dataDiv = false;
  public divFalse = true;
  public imgDiv = false;
  public extraDiv = false;
  public city = '';
  public form: FormGroup;
  public submitted: boolean = false;
  public errors = {
    location: false,
    noOfPeople: false,
    date: false,
  };

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder, private router: Router,
    private toaster: ToastrService,
    private _compiler: Compiler,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: Params) => {
      this.city = params['city'];
      this.getProperties(params['city']);
      this.getLocations(params['city']);
    });
    // search form
    this.form = fb.group({
      'location': ['', [Validators.required]],
      'noOfPeople': ['', [Validators.required]],
      'date': ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._compiler.clearCache();
  }

  getLocations(city) {
    this.commonService.getLocations(city).subscribe((res) => {
      try {
        if(res.status) {
          this.locations = res.locations;
          this.cityData = res.city;
          this.contents = res.city.contents;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }

  getProperties(city) {
    this.commonService.searchLocation({city: city}).subscribe((res) => {
      if (res.status === true) {
        this.properties = res.properties;
        this.dataDiv = (res.properties.length > 0) ? true : false;
        this.imgDiv = (res.properties.length > 0) ? false : true;
      } else {
        this.dataDiv = false;
        this.imgDiv = true;
        this.toaster.error(res.message, 'Warning !!!');
      }
    });
  }
  /**
   * Login Call
   */
  public onSubmitSearch() {
    this.submitted = true;
    if (this.form.valid) {
      this.commonService.searchLocation(this.form.value).subscribe((res) => {
        if (res.status === true) {
          this.properties = res.properties;
          this.dataDiv = (res.properties.length > 0) ? true : false;
          this.imgDiv = (res.properties.length > 0) ? false : true;
        } else {
          this.dataDiv = false;
          this.imgDiv = true;
          this.toaster.error(res.message, 'Warning !!!');
        }
      });
    }
  }

}
