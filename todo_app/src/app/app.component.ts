import { Component, OnInit } from '@angular/core';
import { DataStreamService } from './shared/services/data-stream.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private dataStream: DataStreamService,
  ) {}

  ngOnInit() {

  }
}
