import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styles: [
  ]
})
export class BasicsComponent implements OnInit {

  // Con esto tomamos la referencia del form, lo que va entre parentesis es el mismo nombre que tiene en el html el form (#myForm)
  @ViewChild('myForm') myForm!: NgForm;

  // esta propiedad la creamos para establecer los valores por defecto al inciar el form, para eso agregamos [] al ngModel
  initValuesForm = {
    price: 0,
    stock: 0
  };

  constructor() { }

  ngOnInit(): void {
  }


  save() {
    console.log('Post success');

    // Me di cuenta que este resetForm tambien evita que se de doble click a un formulario, junto con el boton en disabled (ver html)
    this.myForm.resetForm({
      price: 0,
      stock: 0
    });
  }

  validateProduct(): boolean {
    return this.myForm?.controls.product?.invalid && this.myForm?.controls.product?.touched;
  }

  validatePrice(): boolean {
    // this.myForm?.controls?.price?.setErrors({'priceError': true});
    return this.myForm?.controls.price?.touched && (this.myForm?.controls.price?.value < 0 || this.myForm?.controls.price?.invalid)
  }

}
