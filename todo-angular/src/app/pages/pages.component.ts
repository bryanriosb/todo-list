import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component } from '@angular/core';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent{

  sideBarOpen = true;

  constructor(
    private observerBreakpoint: BreakpointObserver
  ) { 
    observerBreakpoint.observe([ 
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium
    ]).subscribe((state: BreakpointState) => {
      state.matches ? this.sideBarOpen = false : this.sideBarOpen = true
    })
  }

}
