import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidatorsService } from '../../../shared/validators/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  // VARIABLES, los validators personalizados y expresiones regulares se crearon en una servicio a parte en 'shared'

  myFormcito: FormGroup = this.fb.group({
    customer_name: [ '', [Validators.required, Validators.pattern(this.vs.regExpFullName)] ],
    customer_email: [ '', [Validators.required, Validators.pattern(this.vs.regExpEmail)], [this.evs] ],
    username: [ '', [Validators.required, this.vs.isShitValidator] ],
    password1: [ '', [Validators.required, Validators.minLength(6)] ],
    password2: [ '', [Validators.required] ],
  }, {
    validators: [ this.vs.samePasswords('password1', 'password2') ]
  });


  // otra manera de mostrar mensajes de error personalizados, ya no creando varias metodos como abajo
  get emailErrorMesagge(): string {
    const errors = this.myFormcito.get('customer_email')?.errors;
    if ( errors?.required ) {
      return 'Email required';
    } else if (errors?.pattern) {
      return 'Enter a valid Email';
    } else if (errors?.emailExists) {
      return 'Email already exists';
    }

    return '';
  };

  constructor( private fb: FormBuilder,
               private vs: ValidatorsService,
               private evs: EmailValidatorService ) { }

  ngOnInit(): void {
    this.myFormcito.reset({
      customer_name: 'Diego Gonzales',
      customer_email: 'test10@test.com',
      username: 'DiegoUser',
      password1: '123456',
      password2: '123456'
    })
  }


  // METHODS

  // Hace el submit del formulario
  submitForm() {
    console.log(this.myFormcito.value);

    this.myFormcito.markAllAsTouched();
  };

  // Para validar campos del formulario en general
  fieldIsNotValid( controlName: string ) {
    return this.myFormcito.get(controlName)?.invalid && this.myFormcito.get(controlName)?.touched;
  };


  // esta seria otra manera de validar el form del campo 'confirm password' y ya no establecer errores al campo
  // como lo hacemos en el validator servicio, simplemente usar el error general del formGroup; a mi parecer es mejor manera
  // fieldInvalid( controlName: string ) {
  //   return this.myFormcito.errors && this.myFormcito.get(controlName)?.touched;
  // };
  
  // Estos dos metodos son hechos por mi, para mostrar dos errores distintos en un campo de acuerdo al error que se presente (usado solo para el campo 'name')
  fieldNameInvalidByRequired() {
    return this.myFormcito.get('customer_name')?.errors?.required && this.myFormcito.get('customer_name')?.touched;
  };
  fieldNameInvalidByPattern() {
    return this.myFormcito.get('customer_name')?.errors?.pattern;
  };


  // para mostrar diferentes tipos de errores creo que lo mejor es hacer distintas validaciones, pero Fernando lo hace con un getter
  fieldEmailRequiredOrPattern() {
    return (this.myFormcito.get('customer_email')?.errors?.pattern || this.myFormcito.get('customer_email')?.errors?.required) && this.myFormcito.get('customer_email')?.touched;
  }
  fieldEmailExists() {
    return this.myFormcito.get('customer_email')?.errors?.emailExists;
  }
}

/*Comentario Final, para manejar los mensajes de error los mejor es hacer el ngIf con el metodo fieldIsNotValid, usar
ese unico metodo para mostrar los mensajes de error, pero para el contenido del mensaje de acuerdo al tipo de error,
usar un getter, y eso seria todo, asi de simple y no complicarse con varios metodos como es que estaba haciendolo */