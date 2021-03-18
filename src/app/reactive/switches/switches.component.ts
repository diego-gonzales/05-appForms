import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  myFormcito: FormGroup = this.formBuilder.group({
    genero: [ '', Validators.required ],
    notifications: [ , Validators.required ],
    terms: [ , Validators.requiredTrue ]
  });

  person = {
    genero: 'F',
    notifications: true
  };

  constructor( private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    // Esto de establecer valores por defecto más que todo serviria cuando traemos data de un API, porque facilmente
    // hubieses podido declarar primero al objeto 'person' antes de construir mi 'formcito' y poner como valores iniciales ahi
    // los valores de la persona
    this.myFormcito.reset({
      ...this.person,
      terms: false
    });

    // este subscribe trae como resultado un objeto con key y value de cada control (como si hicieramos myFormcito.value)
    this.myFormcito.valueChanges
        .subscribe( ( {terms, ...restValues} ) => { //destructuring
          this.person = restValues;
        });
  };


  // Methods

  // para esta parte ver video 257, explica cuando queremos que se cambie los valores de la persona solo cuando se envia el form
  // que seria como se trabajaria en tiempo real, pero si por alguna casualidad se necesita que los valores de la persona
  // cambien conforme voy modificando el form entonces usamos el valueChanges (ver el ngOnInit)
  save() {
    const formValueWithoutTerms = { ...this.myFormcito.value };
    delete formValueWithoutTerms.terms;

    this.person = formValueWithoutTerms;

  };

}
