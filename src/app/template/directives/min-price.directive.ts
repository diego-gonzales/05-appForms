import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  // aca no es necesario el [ngModel] pero según el video debe ir, lo borré y funciona igual
  // esto le dice que esta directiva personalizada siempre debe ir acompañada del ngModel en la parte del html
  // creo que por defecto el [ngModel] ya se infiere pero igual los colocamos
  selector: '[appMinPrice][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MinPriceDirective,
    multi: true
  }]
})
export class MinPriceDirective implements Validator{

  @Input() minimo!: number;

  constructor() { }

  // Esta funcion es propia de los Validators, la creamos nosotros, y tiene que tener el nombre de 'validate' para que funcione
  // el control que viene como parametro hace referencia al input donde colocamos el price
  validate( control: FormControl ) {
    const inputValue = control.value;

    return (inputValue < this.minimo)
            ? {'errorMinPrice': true} // manda un objeto con el error
            : null // esto le dice que no hay errores
  };

};
