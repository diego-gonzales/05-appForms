import { FormControl } from "@angular/forms";


// Esta es una manera de centralizar nuestras validaciones en caso las vayamos a usar en muchos archivos
// pero una mejor manera sería hacerlo en un servicio a aparte, de esa manera tambien podriamos hacer validaciones mas robustas
// ya que podriamos trabajar con data de API


export const regExpFullName: string = '([a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+)([ ]+)([a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+)';
export const regExpEmail: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

export const isShitValidator = ( control: FormControl) => {
    if (control.value?.trim().toLowerCase() === 'shit' || control.value?.includes('shit')) {
      return {
        isShit: true // mandamos un objeto cuando hay un error
      }
    };

    return null; // significa que no hay error
};