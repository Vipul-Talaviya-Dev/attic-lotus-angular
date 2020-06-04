import {Compiler, Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Meta, Title} from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public locations: any;
  public testimonials: any;
  public cityData = {
    title: '',
    left_text: '',
  };
  public locationName = '';
  public contents: any;
  public properties: any;
  public oneSliders: any;
  public twoSliders: any;
  public threeSliders: any;
  public fourSliders: any;
  public dataDiv = false;
  public divFalse = true;
  public imgDiv = false;
  public extraDiv = false;
  public twoDiv = false;
  public threeDiv = false;
  public fourDiv = false;
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
    private route: ActivatedRoute,
    private titleService: Title, private meta: Meta
  ) {
    this.route.params.subscribe((params: Params) => {
      this.city = params['city'];
      this.pageContent((params['city'] == "Bangalore") ? 2 : 3)
      this.getProperties(params['city']);
      this.getLocations(params['city']);
      this.getTestimonials(params['city']);
    });
    // search form
    this.form = fb.group({
      'location': ['', [Validators.required]],
      'noOfPeople': ['', [Validators.required]],
      'date': ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    window.scroll(0,0);
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

  getTestimonials(city) {
    this.commonService.getTestimonials(city).subscribe((res) => {
      try {
        if(res.status) {
          this.testimonials = res.testimonials;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }

  getProperties(city) {
    this.commonService.searchLocation({city: city}).subscribe((res) => {
      if (res.status === true) {
        this.locationName = res.properties.locationName;
        this.oneSliders = res.properties.oneSliders;
        this.twoSliders = res.properties.twoSliders;
        this.threeSliders = res.properties.threeSliders;
        this.fourSliders = res.properties.fourSliders;
        this.dataDiv = (this.oneSliders.length > 0) ? true : false;
        this.imgDiv = (this.oneSliders.length > 0) ? false : true;
        this.twoDiv = (this.twoSliders.length > 0) ? true : false;
        this.threeDiv = (this.threeSliders.length > 0) ? true : false;
        this.fourDiv = (this.fourSliders.length > 0) ? true : false;
      } else {
        this.dataDiv = this.twoDiv = this.threeDiv = this.fourDiv = false;
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
          this.locationName = res.properties.locationName;
          this.oneSliders = res.properties.oneSliders;
          this.twoSliders = res.properties.twoSliders;
          this.threeSliders = res.properties.threeSliders;
          this.fourSliders = res.properties.fourSliders;
          this.dataDiv = (this.oneSliders.length > 0) ? true : false;
          this.imgDiv = (this.oneSliders.length > 0) ? false : true;
          this.twoDiv = (this.twoSliders.length > 0) ? true : false;
          this.threeDiv = (this.threeSliders.length > 0) ? true : false;
          this.fourDiv = (this.fourSliders.length > 0) ? true : false;
        } else {
          this.dataDiv = this.twoDiv = this.threeDiv = this.fourDiv = false;
          this.imgDiv = true;
          this.toaster.error(res.message, 'Warning !!!');
        }
      });
    }
  }

  public pageContent(id) {
    this.commonService.getPageContent(id).subscribe((res) => {
      try {
        if(res.status) {
          this.titleService.setTitle(res.page.title);
          this.meta.addTag({name: 'keywords', content: res.page.keywords});
          this.meta.addTag({name: 'description', content: res.page.decription});
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }
}
