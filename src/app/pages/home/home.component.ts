import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../services/common.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public banners: any;
  public images: any;
  public step5Second: any = [];
  public studyDiv = false;
  public step1 = {
    title: '',
    description: '',
    image: ''
  };
  public step2 = {
    title: ''
  };
  public step3 = {
    employees: 0,
    locations: 0,
    months: 0
  };
  public step4 = {
    title: '',
    sub_title: '',
    description: '',
    image: ''
  };
  public step5First = {
    title: '',
    sub_title: '',
    description: '',
    image: ''
  };

  constructor(private commonService: CommonService) {
    $(document).ready(function() {
      $("body").on("click", ".searchInput", function() {
        var id = $(this).data('id');
        $('#searchInput_'+id).show().addClass('inputActive');
      });

      $(document).keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13') {
          var id = $(".inputActive").data('id');
          $("#inputVal_" + id).html($(".inputActive").val());
          $(".inputActive").removeClass("inputActive");
          $("#searchInput_" + id).hide();
        }
      });

      $("body").on("click", ".select-location", function() {
        var id = 2;
        $(".select-location").removeClass("location-selected");
        $(this).addClass("location-selected");
        $("#inputVal_" + id).html($(this).text());
        $(".inputActive").removeClass("inputActive");
        $("#searchInput_" + id).hide();
      });

    });
  }

  ngOnInit(): void {
    this.getIndex();
  }

  getIndex() {
    this.commonService.getIndex().subscribe((res) => {
      try {
        if(res.status) {
          this.banners = res.banners;
          this.step1 = res.step1;
          this.step2 = res.step2;
          this.images = res.step2.images;
          this.step3 = res.step3;
          this.step4 = res.step4;
          this.step5First = res.step5.first;
          this.step5Second = res.step5.second;
          this.studyDiv = (res.step5.total > 0) ? true : false;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }
}
