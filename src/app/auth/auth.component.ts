import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  moduleId: module.id
})
export class AuthComponent implements OnInit {

  // .JA. Use the RouterExtensions instead of normal angular Router
  // in order to use the "clearHistory: true" functionality
  constructor(private router: RouterExtensions) {}

  ngOnInit() {}

  onSignin() {
    // .JA. "clearHistory: true" avoid to go back to this authentication page after the user has logged in
    this.router.navigate(['/today'], { clearHistory: true });
  }
}
