import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-router-loader',
  templateUrl: './router-loader.component.html',
  styleUrls: ['./router-loader.component.scss']
})
export class RouterLoaderComponent implements OnInit {

  public show: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.show = true;
      } else if(event instanceof NavigationEnd) {
        this.show = false;
      }
    })
  }

}
