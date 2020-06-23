import {Compiler, Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Meta, Title} from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-ready-to-move',
  templateUrl: './readyToMove.component.html',
  styleUrls: ['./readyToMove.component.css']
})
export class ReadyToMoveComponent implements OnInit {
  selectedIndex: number = null;
  public locations: any;
  public cities: any;
  public properties: any;
  public questions: any;
  public slug: any;
  public days: any;
  public time: any;
  public termsText = '';
  public form: FormGroup;
  public submitted: boolean = false;
  public msgDiv = false;
  public formDiv: boolean = true;
  public errors = {
    name: false,
    email: false,
    mobile: false,
    propertyId: false,
    day: false,
    time: false,
    checkboxs: false
  };

  constructor(private commonService: CommonService, private toaster: ToastrService, private fb: FormBuilder, private _compiler: Compiler, private titleService: Title, private meta: Meta) {
    // search form
    this.form = fb.group({
      'name': ['', [Validators.required]],
      'email': ['', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]
      ],
      'mobile': ['', [Validators.required]],
      'day': ['', [Validators.required]],
      'time': ['', [Validators.required]],
      'propertyId': ['', [Validators.required]],
      'checkboxs': ['', [Validators.required]],
    });

    this.jsData();
  }

  setIndex(index: number, propertyId) {
    this.form.patchValue({'propertyId': propertyId});
    this.selectedIndex = index;
  }
  ngOnInit(): void {
    window.scroll(0,0);
    this._compiler.clearCache();
    this.pageContent();
    this.getCommon();
    this.getProperties('');
    this.getCities();
  }
  onItemChange(e) {
    if(e.target.checked) {
      this.form.patchValue({'checkboxs': 1});
    } else {
      this.form.patchValue({'checkboxs': ""});
      this.form.get('checkboxs').setValidators(Validators.required);
    }
  }

  getProperties(city) {
    this.commonService.getProperties(city).subscribe((res) => {
      if (res.status === true) {
        this.properties = res.properties;
      } else {
        this.toaster.error(res.message, 'Warning !!!');
      }
    });
  }

  getLocations(city) {
    this.commonService.getLocations(city).subscribe((res) => {
      try {
        if(res.status) {
          this.locations = res.locations;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }

  getCommon() {
    this.commonService.getCommon().subscribe((res) => {
      if (res.status === true) {
        this.days = res.days;
        this.time = res.time;
      } else {
        this.toaster.error(res.message, 'Warning !!!');
      }
    });
  }

  getCities() {
    this.commonService.getCities().subscribe((res) => {
      try {
        if(res.status) {
          this.cities = res.cities;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }

  public onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.commonService.inquiry(this.form.value).subscribe((res) => {
        if (res.status === true) {
          this.form.reset();
          this.msgDiv = true;
          this.formDiv = false;
          // this.toaster.success(res.message, 'Success !!!');
        } else {
          this.toaster.error(res.message, 'Error !!!');
        }
      });
    } else {
      this.toaster.error("Please select property", 'Error !!!');
    }
  }

  jsData() {
    $(document).ready(function() {
      $('.mobile').keypress(function (event) {
        var keycode = event.which;
        if (!(event.shiftKey == false && (keycode == 46 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
          event.preventDefault();
        }
      });
      $(".sliderImage").on("click", function() {
        $(".sliderImage").find("p").removeClass("highlighted");
        $(this).find("p").addClass("highlighted");
      });
    });
  }

  public pageContent() {
    this.commonService.getPageContent(4).subscribe((res) => {
      try {
        if(res.status) {
          this.termsText = res.page.termsText;
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
