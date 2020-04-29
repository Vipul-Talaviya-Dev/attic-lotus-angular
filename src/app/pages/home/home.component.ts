import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../services/common.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public locations: any;
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
    this.getLocations();
  }

  getLocations() {
    this.commonService.getLocations('').subscribe((res) => {
      try {
        if(res.status) {
          this.locations = res.locations;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }
}
