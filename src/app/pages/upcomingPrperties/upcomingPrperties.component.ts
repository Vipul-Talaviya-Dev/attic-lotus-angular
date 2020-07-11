import {Compiler, Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Meta, Title} from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-upcoming-properties',
  templateUrl: './upcomingPrperties.component.html',
  styleUrls: ['./upcomingPrperties.component.css']
})
export class UpcomingPrpertiesComponent implements OnInit {
  public cities: any;
  public form: FormGroup;
  public submitted: boolean = false;
  public msgDiv = false;
  public formDiv: boolean = true;
  public message = '';
  public termsText = '';
  public errors = {
    email: false,
    mobile: false,
    cityId: false,
    checkbox: false,
  };
  public step7 = {
    title: '',
    sub_title: '',
  };

  constructor(private commonService: CommonService, private toaster: ToastrService, private fb: FormBuilder, private _compiler: Compiler, private titleService: Title, private meta: Meta) {
    // search form
    this.form = fb.group({
      'email': ['', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]
      ],
      'mobile': ['', [Validators.required]],
      'cityId': ['', [Validators.required]],
      'checkbox': ['', [Validators.required]],
    });

    this.jsData();
  }

  ngOnInit(): void {
    window.scroll(0,0);
    this._compiler.clearCache();
    this.pageContent();
    this.getData();
    this.getCities();
  }

  getCities() {
    this.commonService.getCities(2).subscribe((res) => {
      try {
        if(res.status) {
          this.cities = res.cities;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }

  onItemChange(e) {
    if(e.target.checked) {
      this.form.patchValue({'checkbox': 1});
    } else {
      this.form.patchValue({'checkbox': ""});
      this.form.get('checkbox').setValidators(Validators.required);
    }
  }

  public onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.commonService.footerUpcomingLocation(this.form.value).subscribe((res) => {
        if (res.status === true) {
          this.form.reset();
          this.message = res.message;
          this.msgDiv = true;
          this.formDiv = false;
        } else {
          this.toaster.error(res.message, 'Error !!!');
        }
      });
    }
  }

  jsData() {
    $(document).ready(function() {
      $('.contact').keypress(function (event) {
        var keycode = event.which;
        if (!(event.shiftKey == false && (keycode == 46 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
          event.preventDefault();
        }
      });
    });
  }

  public pageContent() {
    this.commonService.getPageContent(12).subscribe((res) => {
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

  public getData() {
    this.commonService.getUpcomingPropertiesPageData().subscribe((res) => {
      try {
        if(res.status) {
          this.step7 = res.step11;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }
}
