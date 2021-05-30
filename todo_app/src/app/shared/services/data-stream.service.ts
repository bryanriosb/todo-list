import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataStreamService {

  private subject = new BehaviorSubject<any>(null);

  sendData( data: any) {
    this.subject.next( data );
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
}
