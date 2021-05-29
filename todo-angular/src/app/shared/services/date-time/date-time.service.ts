import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  private _format: string;

  constructor() {

    this._format = 'DD/MM/YYYY'

  }

  public getFormat(): string {
    
    return this._format
    
  }

  public set format( value: string ) {

    this._format = value

  }

  public getLocale(): string {
  
    return "es";

  }  

}
