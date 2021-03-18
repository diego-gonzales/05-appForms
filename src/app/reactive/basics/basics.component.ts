import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styles: [
  ]
})
export class BasicsComponent implements OnInit {

  // Esto es equivalente a lo de abajo
  // myFormcito: FormGroup = new FormGroup({
  //   product_name:  new FormControl('RTX 2080Ti'),
  //   product_price: new FormControl(1500),
  //   product_stock: new FormControl(5),
  // });


  // el servicio form builder se usa cuando tenemos forms demasiado complejos para tener un codigo mas limpio, pero lo de arriba es valido
  myFormcito: FormGroup = this.formBuilder.group({
    product_name: [ , [Validators.required, Validators.minLength(3)] ],
    product_price: [ , [Validators.required, Validators.min(0)] ],
    product_stock: [ , [Validators.required, Validators.min(0)] ]
  });

  constructor( private formBuilder: FormBuilder) { }

  ngOnInit() {
    // si establecemos valores por defecto con setValue() entonces todos los campos tienen que ir obligatoriamente
    // this.myFormcito.setValue({
    //   product_name: 'RTX 4080 Ti',
    //   product_price: 1200,
    //   product_stock: 10
    // });
    // si lo hacemos con reset() no es obligatorio que vayan todos los campos
    this.myFormcito.reset({
      product_name: 'RTX 4080 Ti',
      product_price: 1200,
      // product_stock: 10
    });
  }

  // Methods

  fieldIsNotValid( controlName: string ) {
    return this.myFormcito.controls[controlName].errors && this.myFormcito.controls[controlName].touched;
  };


  save() {

    if( this.myFormcito.invalid ) {
      this.myFormcito.markAllAsTouched();
      return;
    };

    console.log(this.myFormcito.value);
    this.myFormcito.reset();
  };


}
