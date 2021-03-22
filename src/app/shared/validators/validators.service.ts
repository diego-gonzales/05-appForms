import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

// Esta es una mejor manera de separar la logica de nuestras validaciones, con un servicio, ya que con esto podriamos
// inyectar otros servicios o hacer inyeccion de depedencias

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  regExpFullName: string = '([a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+)([ ]+)([a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+)';
  regExpEmail: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  
  constructor() { }


  isShitValidator( control: FormControl): ValidationErrors | null {
    if (control.value?.trim().toLowerCase() === 'shit' || control.value?.includes('shit')) {
      return {
        isShit: true // mandamos un objeto cuando hay un error
      }
    };
  
    return null; // significa que no hay error
  };


  // Validacion para el password. (Probar hacerlo sin parametros ya que los controles los tengo en 'myFormGroup')
  samePasswords( password1: string, password2: string ) {
    
    return ( myFormGroup: AbstractControl ): ValidationErrors | null => {

      const pass1 = myFormGroup.get(password1)?.value;
      const pass2 = myFormGroup.get(password2)?.value;

      if (pass1 !== pass2) {

        myFormGroup.get(password2)?.setErrors( { isDifferent: true } ); //error a nivel de campo password2

        return {
          differentsPasswords: true // error a nivel de form
        }
      };

      // eliminamos el error si es ya son iguales, pero esto no seria conveniente si es que tenemos mas validaciones 
      // en el campo de password2
      myFormGroup.get(password2)?.setErrors(null);

      return null;
    };
  };

}
