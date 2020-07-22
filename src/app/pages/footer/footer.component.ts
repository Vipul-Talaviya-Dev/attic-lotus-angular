import {Compiler, Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FooterSearchService} from '../../services/footer-search.service';
declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  year: number = new Date().getFullYear();
  public questions: any;
  public normals: any;
  public searchProperties: any;
  public cities: any;
  public locations: any;
  public teams: any;
  public total = 0;
  public termsText = '';
  public questionTitle = '';
  public officeContact =  {
    officeMobile: '',
    officeEmail: '',
    jobMobile: '',
    jobEmail: '',
    address: ''
  };
  public contactForm: FormGroup;
  public contactFormDivMessage = false;
  public normalsDiv = false;
  public contactFormDiv = true;
  public contactMessage = '';
  public submitted: boolean = false;
  public contactErrors = {
    name: false,
    email: false,
    phone: false,
    companyName: false,
    companySize: false,
    message: false,
    checkbox: false,
  };
  public footerForm: FormGroup;
  public footerDataForm: FormGroup;
  public footerFormDivMessage = false;
  public footerFormDiv = true;
  public footerMessage = '';
  public footerSubmitted: boolean = false;
  public footerErrors = {
    cityId: false,
    email: false,
    mobile: false,
    checkboxs: false,
  };
  // calculate part
  public calMessageDiv = false;
  public calculateAmount = 0;
  public calculateForm: FormGroup;
  public calculateSubmitted: boolean = false;
  public calculateErrors = {
    cityId: false,
    locationId: false,
    feet: false,
    type: false,
  };

  constructor(
    private commonService: CommonService,
    private footerSearch: FooterSearchService,
    private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private _compiler: Compiler,
    private route: ActivatedRoute
  ) {

    this.route.params.subscribe((params: Params) => {
      this.getQuestions(this.router.url);
    });
    this.jsData();
    // search form
    this.contactForm = fb.group({
      'name': ['', [Validators.required]],
      'email': ['', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]
      ],
      'phone': ['', [Validators.required]],
      'companyName': ['', [Validators.required]],
      'companySize': ['', [Validators.required]],
      'message': ['Please Contact To User'],
      'checkbox': ['', [Validators.required]],
    });
    // Upcoming Location
    this.footerForm = fb.group({
      'email': ['', [
          Validators.required,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
        ]
      ],
      'mobile': ['', [Validators.required]],
      'cityId': ['', [Validators.required]],
      'checkboxs': ['', [Validators.required]],
    });

    // Upcoming Location
    this.footerDataForm = fb.group({
      'name': [''],
      'email': [''],
      'mobile': [''],
      'type': [''],
      'city': [''],
      'member': [''],
    });

    // Upcoming Location
    this.calculateForm = fb.group({
      'cityId': ['', [Validators.required]],
      'locationId': ['', [Validators.required]],
      'feet': [10, [Validators.required]],
      'type': ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getCities();
    this.getOfficeContact();
    this._compiler.clearCache();
  }

  getQuestions(questionPage) {
    this.commonService.getQuestions(questionPage).subscribe((res) => {
      try {
        if(res.status) {
          this.questions = res.footers;
          this.normals = res.normals;
          this.questionTitle = res.questionTitle;
          this.normalsDiv = (res.normals.length > 0) ? true : false;
          this.total = this.questions.length;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }

  getOfficeContact() {
    this.commonService.getOfficeContact().subscribe((res) => {
      try {
        if(res.status) {
          this.officeContact = res.officeContact;
          this.termsText = res.officeContact.termsText;
          this.teams = res.officeContact.teams;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }

  onItemChangeContactForm(e) {
    if(e.target.checked) {
      this.contactForm.patchValue({'checkbox': 1});
    } else {
      this.contactForm.patchValue({'checkbox': ""});
      this.contactForm.get('checkbox').setValidators(Validators.required);
    }
  }

  onItemChangeFooterForm(e) {
    if(e.target.checked) {
      this.footerForm.patchValue({'checkboxs': 1});
    } else {
      this.footerForm.patchValue({'checkboxs': ""});
      this.footerForm.get('checkboxs').setValidators(Validators.required);
    }
  }

  public onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      this.commonService.contact(this.contactForm.value).subscribe((res) => {
        if (res.status === true) {
          this.contactForm.reset();
          this.contactMessage = res.message;
          this.contactFormDiv = false;
          this.contactFormDivMessage = true;
        } else {
          this.toaster.error(res.message, 'Error !!!');
        }
      });
    }
  }

  // Footer Submit
  public onFooterSubmit() {
    this.footerSubmitted = true;
    if (this.footerForm.valid) {
      this.commonService.footerUpcomingLocation(this.footerForm.value).subscribe((res) => {
        if (res.status === true) {
          this.footerForm.reset();
          this.footerMessage = res.message;
          this.footerFormDiv = false;
          this.footerFormDivMessage = true;
        } else {
          this.toaster.error(res.message, 'Error !!!');
        }
      });
    }
  }

  public searchProperty(name) {
    this.searchProperties = [];
    if(name.length > 3) {
      this.footerSearch.getProperties(name).subscribe((res) => {
        if (res.status === true) {
          this.searchProperties = res.properties;
        }
      });
    }
  }

  onItemChange(value) {
    this.contactForm.patchValue({'companySize': value});
  }

  onTypeChange(value) {
    this.calculateForm.patchValue({'type': value});
  }

  public onCalculateSubmit() {
    this.calculateSubmitted = true;
    if (this.calculateForm.valid) {
      this.commonService.calculation(this.calculateForm.value).subscribe((res) => {
        if (res.status === true) {
          this.calMessageDiv = true;
          this.calculateAmount = res.amount;
        } else {
          this.toaster.error(res.message, 'Error !!!');
        }
      });
    }
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

  public getLocations(city) {
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

  public footerFormData(value) {
    this.footerDataForm.patchValue({'name': value.name});
    this.footerDataForm.patchValue({'email': value.email});
    this.footerDataForm.patchValue({'mobile': value.mobile});
    this.footerDataForm.patchValue({'type': value.type});
    this.footerDataForm.patchValue({'city': value.city});
    this.footerDataForm.patchValue({'member': value.member});
    this.commonService.footerForm(this.footerDataForm.value).subscribe((res) => {
      if (res.status === true) {
        console.log('success');
      } else {
        this.toaster.error(res.message, 'Error !!!');
      }
    });
  }

  jsData() {
    let self = this;
    $(document).ready(function() {
      $(window).scroll(function() { $(this).scrollTop() > 0 ? $(".to-top").fadeIn() : $(".to-top").fadeOut() }), $(".to-top").click(function(e) { $("html, body").animate({ scrollTop: 0 }, 500) })
      $(".menu-icon").on("click", function() {
        $("nav ul").toggleClass("showing");
      });
    });
    $(document).ready(function() {
      $(".modal-trigger").on("click", function() {
        $(".modal-body").removeClass("active");
        $(".modal1").toggleClass("active");
      });

      $(".modal-trigger2").on("click", function() {
        $(".modal-body").removeClass("active");
        $(".modal2").toggleClass("active");
      });

      $(".modal-trigger3").on("click", function() {
        $(".modal-body").removeClass("active");
        $(".modal3").toggleClass("active");
        $("body").css("background", "#f8f8f8");
      });

      $(".modal-trigger4").on("click", function() {
        window.scroll(0,0);
        $(".modal-body").removeClass("active");
        $(".modal4").toggleClass("active");
      });
    });
    $(document).ready(function() {
      $(".button-modal").on("click", function() {
        $(".modal-body").removeClass("active");
        $("body").css("background", "#fff");
      });
    });

    $(document).ready(function() {
      // Add minus icon for collapse element which is open by default
      $(".collapse.show").each(function() {
        $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
      });

      // Toggle plus minus icon on show hide of collapse element
      $(".collapse").on('show.bs.collapse', function() {
        $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
      }).on('hide.bs.collapse', function() {
        $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
      });
    });

    $(function () {
      $('input[name="customRadioInline6"]:radio').change(function () {
        $("#question__question-2").val($("input[name='customRadioInline6']:checked").attr('data-name'));
      });

      $('input[name="customRadioInline9"]:radio').change(function () {
        $("#question__question-4").val($("input[name='customRadioInline9']:checked").attr('data-name'));
      });

      $('#question__question-6, #question__question-3, .mobile').keypress(function (event) {
        var keycode = event.which;
        if (!(event.shiftKey == false && (keycode == 46 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
          event.preventDefault();
        }
      });
    });

    $(document).ready(function() {
      ($(".question__question")[0].value = ""), ($(".question__question")[1].value = ""), ($(".question__question")[2].value = ""), ($(".question__question")[3].value = ""), ($(".question__question")[4].value = ""), ($(".question__question")[5].value = "");
      let e = 1,
        t = !1,
        n = !1;
      function o(e) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(e);
      }
      $(".question__question").keyup(function (o) {
        n || (13 == o.keyCode && $("#question__question-" + e)[0].value.length >= 0 && !1 === t && ($(".next__button").trigger("click"), $(".question__title").removeClass("question__title--inactive"), o.preventDefault()));
      }),
        $(".question__question").keyup(function () {
          n ||
          ($("#question__question-" + e)[0].value.length >= 0
            ? ($(".question__title").addClass("question__title--inactive "),
              o($("#question__question-5")[0].value)
                ? o($("#question__question-5")[0].value) && ((t = !1), $(".error__wrapper").css("opacity", "0"))
                : ($(".error__wrapper").css("opacity", "1"), ($(".error__message")[0].innerText = "Don’t be shy, the entered email is incorrect."), (t = !0)))
            : $(".question__title").removeClass("question__title--inactive "));
        }),
        $(".question__question").focusout(function () {
          n || (0 === $("#question__question-" + e)[0].value.length && $(".question__title").removeClass("question__title--inactive "));
        }),
        $(".question__question").focusout(function () {
          o($("#question__question-5")[0].value) && ((t = !1), $(".error__wrapper").css("opacity", "0"));
        }),
        $(".next__button").click(function (o) {
          var clientNameFinal = '';
          if (!1 === t)
            if (0 !== $("#question__question-" + e)[0].value.length)
              switch ((e < 7 && e++, $(".error__wrapper").css("opacity", "0"), e <= 6 && $(".question__number").text(e + "/6"), $(".question__title").removeClass("question__title--inactive "), e)) {
                case 2:
                  let t = $(".question__question")[0].value;
                  (t = t.charAt(0).toUpperCase() + t.slice(1)),
                    ($(".question__title")[1].innerText = "Nice too meet you " + t + "!"),
                    $("#question-1").addClass("question__wrapper--inactive"),
                    $("#question-2").removeClass("question__wrapper--inactive");
                  break;
                case 3:
                  $("#question-2").addClass("question__wrapper--inactive"), $("#question-3").removeClass("question__wrapper--inactive");
                  break;
                case 4:
                  $("#question-3").addClass("question__wrapper--inactive"), $("#question-4").removeClass("question__wrapper--inactive");
                  break;
                case 5:
                  $("#question-4").addClass("question__wrapper--inactive"), $("#question-5").removeClass("question__wrapper--inactive");
                  break;
                case 6:
                  $("#question-5").addClass("question__wrapper--inactive"), $("#question-6").removeClass("question__wrapper--inactive"), ($(".next__button")[0].innerText = "Let's send!");
                  break;
                case 7:
                  $("input")[6].setAttribute("type", "submit"), (n = !0), (clientNameFinal = $(".question__question")[0].value);
                  let o = $(".question__question")[8].value;
                  let m = $(".question__question")[9].value;
                  (clientNameFinal = clientNameFinal.charAt(0).toUpperCase() + clientNameFinal.slice(1)), ($(".question__title")[6].innerText = clientNameFinal + ", " + $(".question__title")[6].innerText);
                  let i = "We will contact you via email: " + o + " or mobile: "+ m +" in no time. But if you don’t want to wait for a good things to happen, feel free to call us at 080 4717 8622 - let’s have a conversation!";
                  ($(".confirm__p")[0].innerText = i),
                    $("#question-6").addClass("question__wrapper--inactive"),
                    $(".next__wrapper").addClass("next__wrapper--inactive"),
                    $(".question__number").addClass("question__number--inactive"),
                    $("#question-7").removeClass("question__wrapper--inactive");
                    let data = {
                      name: $("input[name='questionName']").val(),
                      city: $("input[name='customRadioInline6']:checked").attr('data-name'),
                      member: $("input[name='questionMember']").val(),
                      type: $("input[name='customRadioInline9']:checked").attr('data-name'),
                      email: $("input[name='questionEmail']").val(),
                      mobile: $("input[name='questionMobile']").val(),
                    };
                    self.footerFormData(data);
              }
            else
              switch (($(".error__wrapper").css("opacity", "1"), e)) {
                case 1:
                  $(".error__message")[0].innerText = "Don’t be shy, tell us your name.";
                  break;
                case 2:
                  $(".error__message")[0].innerText = "Don't be shy, please type the city name.";
                  break;
                case 3:
                  $(".error__message")[0].innerText = "Don't be shy, Please type how big is your team.";
                  break;
                case 4:
                  $(".error__message")[0].innerText = "Don't be shy, please type what kind of office you like.";
                  break;
                case 5:
                  $(".error__message")[0].innerText = "Don't be shy, Please enter your email id.";
                  break;
                case 6:
                  $(".error__message")[0].innerText = "Don't be shy, Please enter your 10 digits mobile number.";
              }
        });
    });
  }
}
