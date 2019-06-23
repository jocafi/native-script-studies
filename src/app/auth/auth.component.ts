import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { TextField } from 'tns-core-modules/ui/text-field';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ns-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  moduleId: module.id
})
export class AuthComponent implements OnInit {

  form: FormGroup;
  emailControlIsValid = true;
  passwordControlIsValid = true;
  isLogin = true;
  @ViewChild('passwordEl', {static: false}) passwordEl: ElementRef<TextField>;
  @ViewChild('emailEl', {static: false}) emailEl: ElementRef<TextField>;


  // .JA. Use the RouterExtensions instead of normal angular Router
  // in order to use the "clearHistory: true" functionality
  constructor(private router: RouterExtensions) {}


  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(6)]
      })
    });

    this.form.get('email').statusChanges.subscribe(status => {
      this.emailControlIsValid = status === 'VALID';
    });

    this.form.get('password').statusChanges.subscribe(status => {
      this.passwordControlIsValid = status === 'VALID';
    });

    this.form.get('email').setValue('jocafi@test.com');
    this.form.get('password').setValue('secret');
  }

  onSignin() {
    // .JA. "clearHistory: true" avoid to go back to this authentication page after the user has logged in
    this.router.navigate(['/today'], { clearHistory: true });
  }


  onSubmit() {
    // .JA. It is necessary to change the focus to other element on the screen, otherwise the this.form.get('password').value = null
    // because it is updated only on the 'blur' event that is was being executed after the submit() event.
    this.emailEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    // .JA. it dismiss (or closes) the soft keyboard
    this.passwordEl.nativeElement.dismissSoftInput();

    if (!this.form.valid) {
      return;
    }

    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    this.form.reset();
    this.emailControlIsValid = true;
    this.passwordControlIsValid = true;
    if (this.isLogin) {
      console.log('Logging in...');
    } else {
      console.log('Signing up ...');
    }

    this.router.navigate(['/challenges'], { clearHistory: true });
  }

  onDone() {
    this.emailEl.nativeElement.focus();
    this.passwordEl.nativeElement.focus();
    this.passwordEl.nativeElement.dismissSoftInput();
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }
}
