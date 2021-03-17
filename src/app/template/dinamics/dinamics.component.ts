import { Component } from '@angular/core';


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
  newPerson: Person = {
    name: 'Diego',
    games: [
      { id: 1, title: 'Pokemón Go' },
      { id: 2, title: 'Team Fortress 2'}
    ]
  };

  inputGame: string = '';


  // Methods

  save() {
    console.log('Posteado')
  };

  addGame() {
    const newGame: Game = {
      id: this.newPerson.games.length + 1,
      title: this.inputGame
    };

    this.newPerson.games.push(newGame);

    this.inputGame = '';
  };

  deleteGame( indexGame: number ) {
    this.newPerson.games.splice(indexGame, 1);
  };

}
