import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';



@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(
    private platform: Platform,
  ) { }


  ngOnInit(): void {
    if (this.platform.is('android')) {

    }
  }

  ionViewDidEnter() {

  }

  getAlerts() {

  }
}
