/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {



  sevices: any;
  request$ = new Subject<any>();


  constructor(private http: HttpClient) { }

  async setObject( key: string, data: any) {
    await Storage.set({
      key,
      value: JSON.stringify([data])
    });
    this.request$.next([data]);
  }

  // Creación del arreglo para ser listado en la sección programados
  async setArrayObject( key: string, data: any) {

    const ret = await Storage.get({ key });

    if (ret.value) {

      const dat = JSON.parse(ret.value);
      dat.unshift(data);

      await Storage.set({
        key,
        value: JSON.stringify(dat)
      });

      this.request$.next(dat);

    } else {

      await Storage.set({
        key,
        value: JSON.stringify([data])
      });
      this.request$.next([data]);
    }

  }

  // Se toman los datos del localStorage para ser cargados al stream de datos
  async getLocalStorage( key: string) {
    const ret = await Storage.get({ key });
    const services = JSON.parse(ret.value);
    this.request$.next(services);

    return services;
  }

  getStreamObject(key: any) {
    return this.request$;
  }

  loadJson(filePath) {
    return this.http.get(filePath).toPromise();
  }

}
