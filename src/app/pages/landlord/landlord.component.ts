import {Compiler, Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Meta, Title} from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.css']
})
export class LandlordComponent implements OnInit {
  public landLoads: any;
  public step1 = {
    title: '',
    sub_title: '',
  };
  public step2 = {
    title: '',
    sub_title: '',
  };
  public contactFormDivMessage = false;
  public contactFormDiv = true;
  public contactMessage = '';
  public form: FormGroup;
  public termsText = '';
  public submitted: boolean = false;
  public errors = {
    name: false,
    email: false,
    mobile: false,
    city: false,
    area: false,
    landmark: false,
    zipcode: false,
    checkbox: false,
  };

  constructor(
    private commonService: CommonService,
    private toaster: ToastrService,
    private fb: FormBuilder,
    private _compiler: Compiler,
    private titleService: Title,
    private meta: Meta) {
    this.jsData();

    // search form
    this.form = fb.group({
      'name': ['', [Validators.required]],
      'email': ['', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]
      ],
      'mobile': ['', [Validators.required]],
      'city': ['', [Validators.required]],
      'area': ['', [Validators.required]],
      'landmark': ['', [Validators.required]],
      'zipcode': ['', [Validators.required]],
      'checkbox': ['', [Validators.required]],
      'type': [2, [Validators.required]],
    });
  }

  ngOnInit(): void {
    window.scroll(0,0);
    this._compiler.clearCache();
    this.pageContent();
    this.getLandLoadData();
  }

  getLandLoadData() {
    this.commonService.getLandLoads().subscribe((res) => {
      try {
        if(res.status) {
          this.landLoads = res.landlords;
          this.step1 = res.landlordContent1;
          this.step2 = res.landlordContent2;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }

  jsData() {
    $(document).ready(function() {
      $('.mobile').keypress(function (event) {
        var keycode = event.which;
        if (!(event.shiftKey == false && (keycode == 46 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
          event.preventDefault();
        }
      });
    });
  }

  public pageContent() {
    this.commonService.getPageContent(10).subscribe((res) => {
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
      this.commonService.brokerLandlordFormData(this.form.value).subscribe((res) => {
        if (res.status === true) {
          this.form.reset();
          this.contactMessage = res.message;
          this.contactFormDiv = false;
          this.contactFormDivMessage = true;
        } else {
          this.toaster.error(res.message, 'Error !!!');
        }
      });
    }
  }

}
