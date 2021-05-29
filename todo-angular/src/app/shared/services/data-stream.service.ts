import { Injectable } from '@angular/core';
import { Subject, Observable, AsyncSubject, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataStreamService {

  // El BehaviorSubject sirve para inicializar con un valor y consultar el último dato del evento
  // Si importar el comoponente o ruta que desee consultar el dato. Es decir
  //"recodar¨ el último valor emitido por el Observable a todas las nuevas subscripciones
  private subject = new BehaviorSubject<any>(null);

  // Por el contrario Subject solo  permite compartir cuando tenemos componentes cercanos o 
  // cuando no es necesario cambiar de ruta.
  // private subject = new Subject<any>();

  sendData( data: any) {

    this.subject.next( data );

  }

 
  getData():Observable<any> {

    return this.subject.asObservable();
    
  }
}
