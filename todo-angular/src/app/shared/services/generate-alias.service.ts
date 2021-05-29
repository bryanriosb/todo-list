import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GenerateAliasService {

  constructor() { }

  buildAlias(form: FormGroup) {
    const  generateRandomString = (num) => {
      let name = form.value.name;
      const characters =`${name}0123456789`;
      let result= ' ';
      const charactersLength = characters.length;

      for ( let i = 0; i < num; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return result.replace(/ /g, "");
    }
    
    const alias = generateRandomString(8);
    form.get('alias').patchValue(alias);
  }
}
