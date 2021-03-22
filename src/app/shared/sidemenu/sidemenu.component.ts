import { Component, OnInit } from '@angular/core';


// Creamos una interfaz para las rutas
interface MenuItem {
  text: string;
  path: string;
};

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class SidemenuComponent implements OnInit {

  templateMenu: MenuItem[] = [
    {
      text: 'Basics',
      path: './template/basics'
    },
    {
      text: 'Dynamic',
      path: './template/dynamic'
    },
    {
      text: 'Switches',
      path: './template/switches'
    },
  ];

  reactiveMenu: MenuItem[] = [
    {
      text: 'Basics',
      path: './reactive/basics'
    },
    {
      text: 'Dynamic',
      path: './reactive/dynamic'
    },
    {
      text: 'Switches',
      path: './reactive/switches'
    },
  ];


  authMenu: MenuItem[] = [
    {
      text: 'Register',
      path: './auth/register'
    },
    {
      text: 'Login',
      path: './auth/login'
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
