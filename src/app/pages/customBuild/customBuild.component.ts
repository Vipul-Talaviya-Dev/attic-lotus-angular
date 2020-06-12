import {Compiler, Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Meta, Title} from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-custom-build',
  templateUrl: './customBuild.component.html',
  styleUrls: ['./customBuild.component.css']
})
export class CustomBuildComponent implements OnInit {
  selectedIndex: number = null;
  public customWorks: any;
  public categories: any;
  public properties: any;
  public slug: any;
  public form: FormGroup;
  public submitted: boolean = false;
  public msgDiv = false;
  public formDiv: boolean = true;
  public message = '';
  public divData: boolean = false;
  public errors = {
    name: false,
    email: false,
    phone: false,
    seat: false,
  };
  public step7 = {
    title: '',
    sub_title: '',
    description: ''
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
      'phone': ['', [Validators.required]],
      'seat': ['', [Validators.required]],
      'type': ['2'],
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
    this.getData();
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

  public onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.commonService.subscribe(this.form.value).subscribe((res) => {
        if (res.status === true) {
          this.form.reset();
          this.message = res.message;
          this.msgDiv = true;
          this.formDiv = false;
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
      $('.contact').keypress(function (event) {
        var keycode = event.which;
        if (!(event.shiftKey == false && (keycode == 46 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
          event.preventDefault();
        }
      });
    });
  }

  public pageContent() {
    this.commonService.getPageContent(8).subscribe((res) => {
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

  public getData() {
    this.commonService.getCustomPage().subscribe((res) => {
      try {
        if(res.status) {
          this.step7 = res.step7;
          this.customWorks = res.customWorks;
          this.categories = res.categories;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }
}
