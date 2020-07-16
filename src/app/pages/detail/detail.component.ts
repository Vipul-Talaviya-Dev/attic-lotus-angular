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
  public propertyFeatureDiv = true;
  public enquiryDiv = true;
  public msgDiv = false;
  public propertyBookedDiv = false;
  public locationName = '';
  public uniqueBuildDiv = false;
  public includedAmenityDiv = false;
  public message = '';
  public propertyFeature = {
    label: '',
    value: '',
    image: ''
  };
  public properties: any;
  public propertiesDiv = true;
  public slug: any;
  public form: FormGroup;
  public enquiryForm: FormGroup;
  public submitted: boolean = false;
  public enquiryErrors = {
    firstName: false,
    lastName: false,
    email: false,
    mobile: false,
    propertyId: false,
    product_of_interest: false,
    checkbox: false
  };
  public errors = {
    name: false,
    email: false,
    mobile: false,
    propertyId: false,
    day: false,
    time: false,
    checkboxs: false
  };

  constructor(
    private commonService: CommonService,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _compiler: Compiler,
  ) {
    // this.jsData();
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
      'checkboxs': ['', [Validators.required]],
      'propertyId': [''],
    });
    // enquiry form
    this.enquiryForm = fb.group({
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'email': ['', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]
      ],
      'mobile': ['', [Validators.required]],
      'product_of_interest': ['', [Validators.required]],
      'checkbox': ['', [Validators.required]],
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
      this.propertyBookedDiv = this.msgDiv = (this.property.isAvailable) ? true : false;
      this.uniqueBuildDiv = (this.property.uniqueBuilds.length > 0) ? true : false;
      this.includedAmenityDiv = (this.property.includedAmenittes.length > 0) ? true : false;
      this.form.patchValue({'propertyId': this.property.id});
      this.enquiryForm.patchValue({'propertyId': this.property.id});
      this.properties = this.property.properties;
      this.propertiesDiv = (this.property.properties.length > 0) ? true : false;
      this.days = this.property.days;
      this.time = this.property.time;
      this.propertyFeatures = this.property.propertyFeatures;
      this.propertyFeatureDiv = (this.property.propertyFeatures.length > 0) ? true : false;
      this.locationName = this.property.locationName;
      this.jsData();
    });
  }

  ngOnInit(): void {
    window.scroll(0,0);
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
          this.message = res.message;
          this.enquiryDiv = false;
        } else {
          this.toaster.error(res.message, 'Error !!!');
        }
      });
    }
  }

  onItemChange(e) {
    if(e.target.checked) {
      this.enquiryForm.patchValue({'checkbox': 1});
    } else {
      this.enquiryForm.patchValue({'checkbox': ""});
      this.enquiryForm.get('checkbox').setValidators(Validators.required);
    }
  }

  onFormItemChange(e) {
    if(e.target.checked) {
      this.form.patchValue({'checkboxs': 1});
    } else {
      this.form.patchValue({'checkboxs': ""});
      this.form.get('checkbox').setValidators(Validators.required);
    }
  }

  public jsData() {
    $(document).ready(function() {
      $('.mobile').keypress(function (event) {
        var keycode = event.which;
        if (!(event.shiftKey == false && (keycode == 46 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
          event.preventDefault();
        }
      });

      if ($('.property').hasClass('slick-initialized')) {
        $('.property').slick('destroy');
      }
      if ($('.center-nearby').hasClass('slick-initialized')) {
        $('.center-nearby').slick('destroy');
      }
      $('.carousel').carousel({
        interval: 2000
      });
      /*$(".property ").not('.slick-initialized').slick({
        dots: false,
        infinite: true,
        variableWidth: true,
      });*/
        /*.on('setPosition', function (event, slick) {
        slick.$slides.css('height', '450px');
        slick.$slides.find('img').css('height', '450px');
      });*/

      $(".center-nearby").not('.slick-initialized').slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        setPosition: true,
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
