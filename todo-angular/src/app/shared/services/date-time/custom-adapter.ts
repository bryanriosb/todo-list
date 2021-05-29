import { Injectable } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { DateTimeService } from './date-time.service';



@Injectable()
export class CustomDateAdapter extends MomentDateAdapter {

  constructor( private _dateTimeService: DateTimeService)  {
  
    super('es'); // configulación de localidad por defecto
  }

  public format(date: moment.Moment, displayFormat: string): string {
  
    const locale = this._dateTimeService.getLocale();
    const format = this._dateTimeService.getFormat();

    return date.locale(locale).format(format);

  }
}

