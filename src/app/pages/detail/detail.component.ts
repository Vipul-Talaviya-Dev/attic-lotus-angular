import {Compiler, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../services/common.service';
declare var $: any;
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public property: any;
  public days: any;
  public time: any;
  public propertyFeatures: any;
  public enquiryDiv = true;
  public msgDiv = false;
  public propertyFeature = {
    label: '',
    value: '',
    image: ''
  };
  public properties: any;
  public slug: any;
  public form: FormGroup;
  public enquiryForm: FormGroup;
  public submitted: boolean = false;
  public enquiryErrors = {
    firstName: false,
    lastName: false,
    mobile: false,
    propertyId: false,
    product_of_interest: false
  };
  public errors = {
    name: false,
    email: false,
    mobile: false,
    propertyId: false,
    day: false,
    time: false,
  };

  constructor(
    private commonService: CommonService,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _compiler: Compiler,
  ) {
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
      'day': ['', [Validators.required]],
      'time': ['', [Validators.required]],
      'propertyId': [''],
    });
    // enquiry form
    this.enquiryForm = fb.group({
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'mobile': ['', [Validators.required]],
      'product_of_interest': ['', [Validators.required]],
      'propertyId': [''],
      'name': [''],
    });
    /*
    * Id Set*/
    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
    });

    /**
     * Resolve Call
     */
    this.route.data.subscribe((response) => {
      this.property = response.property.property;
      this.enquiryDiv = (this.property.isAvailable) ? false : true;
      this.msgDiv = (this.property.isAvailable) ? true : false;
      this.form.patchValue({'propertyId': this.property.id});
      this.enquiryForm.patchValue({'propertyId': this.property.id});
      this.properties = this.property.properties;
      this.days = this.property.days;
      this.time = this.property.time;
      this.propertyFeatures = this.property.propertyFeatures;
    });
  }

  ngOnInit(): void {
    this._compiler.clearCache();
  }

  public onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.commonService.inquiry(this.form.value).subscribe((res) => {
        if (res.status === true) {
          this.form.reset();
          this.msgDiv = true;
          this.enquiryDiv = false;
          // this.toaster.success(res.message, 'Success !!!');
        } else {
          this.toaster.error(res.message, 'Error !!!');
        }
      });
    }
  }

  public onEnquirySubmit() {
    this.enquiryForm.patchValue({'name': this.enquiryForm.get('firstName').value +' '+ this.enquiryForm.get('lastName').value});
    if (this.enquiryForm.valid) {
      this.commonService.inquiry(this.enquiryForm.value).subscribe((res) => {
        if (res.status === true) {
          this.enquiryForm.reset();
          this.msgDiv = true;
          this.enquiryDiv = false;
          // this.toaster.success(res.message, 'Success !!!');
        } else {
          this.toaster.error(res.message, 'Error !!!');
        }
      });
    }
  }

  public jsData() {
    $(document).ready(function() {
      $(".property ").slick({
        dots: false,
        infinite: true,
        variableWidth: true
      });
      $(".center-nearby").slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [{
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false
          }
        }, {
          breakpoint: 997,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }, {
          breakpoint: 770,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
      });
    });
  }
}
