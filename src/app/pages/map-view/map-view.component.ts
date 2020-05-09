import {Compiler, Component, ElementRef, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
declare var L:any;
declare var $: any;

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  public map: any;
  public cities: any;
  public properties: any;
  public dataDiv = false;
  public total = 0;
  constructor(
    private commonService: CommonService,
    private router: Router,
    private toaster: ToastrService,
    private _compiler: Compiler,
    private route: ActivatedRoute,
    private _elementRef: ElementRef,
  ) {
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        let city = params['city'] || '';
      });
    this.getCities();
    this.getProperties('');

  }

  ngOnInit(): void {
    this._compiler.clearCache();

    let el = this._elementRef.nativeElement.querySelector('.leaflet-maps');
    // L.Icon.Default.imagePath = 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png';
    let latLng = ["12.938232", "77.626175"];
    this.map = new L.map(el, {
      center: [parseFloat(latLng[0]), parseFloat(latLng[1])],
      type: "map",
      zoom: 10,
      minZoom: 3,
      maxZoom: 18,
      dragging: true,
      touchZoom: !0,
      scrollWheelZoom: 10,
      boxZoom: !0,
      tap: !0,
      tapTolerance: 15,
      trackResize: !0,
      inertia: !0,
      zoomControl: false,
      attributionControl: !0,
    });
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    L.control.zoom({
      position: 'topright'
    }).addTo(this.map);

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

  getProperties(city) {
    this.commonService.getProperties(city).subscribe((res) => {
      try {
        if(res.status) {
          this.properties = res.properties;
          this.loadProperty(this.properties);
          this.total = res.total;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }

  /**
   * Call
   */
  public changeCity(city) {
      this.commonService.getProperties(city).subscribe((res) => {
        if (res.status === true) {
          this.properties = res.properties;
          this.loadProperty(this.properties);
          this.total = res.total;
        }
      });
  }

  loadProperty(properties) {
    /**
     * Default marker
     */
    let map = this.map;
    let bounds = new L.LatLngBounds();
    let icon = L.icon({
      iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
      iconSize: [50, 50],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      /*shadowUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]*/
    });
    let markers = properties.map(function(info) {
      let position = new L.LatLng(info.latitude, info.longitude);
      let marker = L.marker(position, {
        typeControl : false,
        zoomControl : false,
        title: info.name,
        class_name: 'top-left',
        label: info.name,
        icon: icon
      });
      marker.bindPopup(info.name + ' <br> Address : '+ info.address).openPopup();
      marker.addTo(map);
      // map.addLayer(marker);
    });
    map.getCenter();
  }

  /**
   * Move Map With Marker Move
   * @param device
   */
  mapMoveDevice(device) {
    let lat = parseFloat(device.latitude);
    let lng = parseFloat(device.longitude);
    this.map.setView([lat, lng], 15);
    this.map.panTo([lat, lng]);
  }
}
