import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


interface Person {
  name: string;
  games: Game[];
};

interface Game {
  id: number;
  title: string;
};

@Component({
  selector: 'app-dinamics',
  templateUrl: './dinamics.component.html',
  styles: [
  ]
})
export class DinamicsComponent {

  // Variables

  myFormcito: FormGroup = this.formBuilder.group({

    name_user: [ , [Validators.required, Validators.minLength(3)] ],
    list_games: this.formBuilder.array( [
      ['Pokemon Go', Validators.required], // esto nos son arreglos
      ['Team Fortress 2', Validators.required]
    ], Validators.required )

  });

  // newControlGame: FormControl = new FormControl('abc', Validators.required); // este es igual a lo de abajo
  newControlGame: FormControl = this.formBuilder.control('', [Validators.required, Validators.minLength(3)]);

  get gamesArr() {
    return this.myFormcito.get('list_games') as FormArray; 
    // return this.myFormcito.controls.list_games.controls; // Esto es lo mismo que lo de arriba
  };

  // Constructor
  constructor( private formBuilder: FormBuilder) { }


  // Methods
  fieldIsNotValid( controlName: string ) {
    return this.myFormcito.controls[controlName].errors && this.myFormcito.controls[controlName].touched;
  };

  // valido por aparte este campo solo necesita que haya errores y no necesariamente tiene que ser tocado
  fieldListGamesInvalid() {
    return this.myFormcito.controls.list_games.errors;
  };

  // esta validacion creo que esta demas porque a veces el usuario puede escribir algo y luego borrarlo y le va a aparecer el error
  // cosa que no deberia ser asi, y lo mejor seria poner este newControlGame como que no es required, pero lo dejamos asi
  fieldGameInvalid() {
    return this.newControlGame.errors && !this.newControlGame.pristine;
  };

  addGame() {
    if ( this.newControlGame.invalid ) { return };
    
    // (this.myFormcito.get('list_games') as FormArray).push(this.newControlGame);
    // podria poner el control nuevo directamente pero no es lo mas recomendable por eso usamos el formBuilder
    this.gamesArr.push( this.formBuilder.control(this.newControlGame.value, Validators.required) );

    // pero si reseteo ese control nuevo ya no habria problema en agregarlo directamente, pero lo mejor es con el formBuilder
    this.newControlGame.reset();
  };


  deleteGame( indexGame: number ) {
    this.gamesArr.removeAt(indexGame);
  };


  save() {
    if( this.myFormcito.invalid ) {
      this.myFormcito.markAllAsTouched();
      return;
    };
    
    console.log(this.myFormcito.value);
  };

}
