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
  public propertyFeatures: any;
  public propertyFeature = {
    label: '',
    value: '',
    image: ''
  };
  public properties: any;
  public slug: any;
  public form: FormGroup;
  public submitted: boolean = false;
  public errors = {
    name: false,
    email: false,
    mobile: false,
    propertyId: false,
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
      'propertyId': [''],
    });
    /*
    * Id Set*/
    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
    });

    /**
     * Resolve Call
     */
    /*this.route.data.subscribe((response) => {
      this.property = response.property.property;
      this.form.patchValue({'propertyId': this.property.id});
      this.properties = this.property.properties;
      this.propertyFeatures = this.property.propertyFeatures;
    });*/
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
          this.toaster.success(res.message, 'Success !!!');
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
