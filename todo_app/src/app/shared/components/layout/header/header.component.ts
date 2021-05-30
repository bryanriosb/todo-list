import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() color: string;

  @Output() searchClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() title: string;
  @Input() search: boolean = true;

  constructor() { }

  ngOnInit() {}

  clickSearch($event){
    this.searchClick.emit($event);
  }

}
