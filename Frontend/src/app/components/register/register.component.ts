import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/credentials';
import { RegisterService } from 'src/app/services/register.service';
import Swal from 'sweetalert2';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/models/custom-validator';

@Component({
  selector: 'app-register',
  template: `
  <div class="h-100 d-flex align-items-center justify-content-center">
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card border-0 shadow rounded-3 my-5">
            <div class="card-body p-4 p-sm-5">
              <h3 class="card-title text-center mb-5 fw-light fs-3"><b>Register</b></h3>
              <form>

                <!-- <div class="input-group mb-3">
                  <span class="input-group-text"><i class="bi bi-person"></i></span>
                  <div class="form-floating">
                    <input type="text" class="form-control"
                           id="username"
                           name="username"
                           placeholder="Username"
                           [(ngModel)]="credentials.username"
                           required>
                    <label for="username">Username</label>
                  </div>
                </div>
  
                <div class="input-group mb-3">
                  <span class="input-group-text"><i class="bi bi-lock"></i></span>
                  <div class="form-floating">
                    <input type="password"
                           class="form-control"
                           id="password"
                           name="password"
                           placeholder="Password"
                           [(ngModel)]="credentials.password"
                           required>
                    <label for="password">Password</label>
                  </div>
                </div> -->
  
                <div class="input-group mb-3">
                  <span class="input-group-text"><i class="bi bi-person"></i></span>
                  <div class="form-floating">
                    <input type="text" class="form-control"
                           matInput
                           id="username"
                           name="username"
                           placeholder="Username"
                           [(ngModel)]="credentials.username"
                           [formControl]="usernameFormControl"
                           [errorStateMatcher]="matcher"
                           required>
                    <label for="username">Username</label>
                  </div>
                </div>
  
                <div class="input-group mb-3">
                  <span class="input-group-text"><i class="bi bi-lock"></i></span>
                  <div class="form-floating">
                    <input type="password"
                           matInput
                           class="form-control"
                           id="password"
                           name="password"
                           placeholder="Password"
                           [(ngModel)]="credentials.password"
                           [formControl]="passwordFormControl"
                           [errorStateMatcher]="matcher" required
                           required>
                    <label for="password">Password</label>
                  </div>
                </div>
                <mat-error *ngIf="usernameFormControl.hasError('hasLetters')">
                    Username must not contain numbers
                </mat-error>
                <mat-error *ngIf="usernameFormControl.hasError('minlength')">
                    The Username must be at least 3 letters long
                </mat-error>
                <mat-error *ngIf="usernameFormControl.hasError('required')">
                  Username is <strong>required</strong>
                </mat-error>
                <mat-error *ngIf="passwordFormControl.hasError('minlength')">
                  The Password must be at least 4 letters long
                </mat-error>
                <mat-error *ngIf="passwordFormControl.hasError('hasNumber')">
                  Password must have at least 1 number
                </mat-error>
                <mat-error *ngIf="passwordFormControl.hasError('hasCapitalCase')">
                  Password must have at least 1 upper case letter
                </mat-error>
                <mat-error *ngIf="passwordFormControl.hasError('hasSmallCase')">
                  Password must have at least 1 lower case letter
                </mat-error>

                <div class="d-grid">
                  <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit" (click)="OnSubmit()">Submit</button>
                </div>
  
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class RegisterComponent {
  credentials: Credentials = new Credentials();
  isDisabled = true;
  usernameFormControl = new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(3),
    CustomValidators.patternValidator(/^([^0-9]*)$/, { hasLetters: true}) // Regex expression for everything except numbers
  ]));
  matcher = new MyErrorStateMatcher();
  passwordFormControl = new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(4),
    CustomValidators.patternValidator(/\d/, { hasNumber: true }),
    CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
    CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true })
  ]));

  constructor(private registerService: RegisterService, private router: Router) { }

  async OnSubmit() {
    if (this.credentials.username === "" || this.credentials.password === "") {
      Swal.fire('Error', 'Credentials cannot be empty!', 'error');
      console.log("Credentials cannot be empty!");
      return;
    }

    let isValid = this.checkUsernameFormControl()
    if (!isValid) {
      return;
    }

    isValid = this.checkPasswordFormControl()
    if (!isValid) {
      return;
    }

    console.log("Registering with username: " + this.credentials.username);
    if (await this.registerService.register(this.credentials)) {
      Swal.fire('Success', 'You may now login!', 'success');
      console.log("Successfully registered!")
      this.router.navigate(['']);
    } else {
      Swal.fire('Error', 'Username is already taken!', 'error');
      console.log("Successfully registered!")
    }
  }

  private checkUsernameFormControl() {
    if (this.usernameFormControl.hasError('required')) {
      Swal.fire('Error', 'Username is essential', 'error');
      return false;
    }

    if (this.usernameFormControl.hasError('hasLetters')) {
      Swal.fire('Error', 'Name must be at least 3 characters long', 'error');
      return false;
    }

    if (this.usernameFormControl.hasError('minlength')) {
      Swal.fire('Error', 'Name must be at least 3 characters long', 'error');
      return false;
    }

    return true;
  }

  private checkPasswordFormControl() {
    if (this.passwordFormControl.hasError('required')) {
      Swal.fire('Error', 'Password is essential', 'error');
      return false;
    }

    if (this.passwordFormControl.hasError('minlength')) {
      Swal.fire('Error', 'Password must be at least 4 characters long', 'error');
      return false;
    }

    if (this.passwordFormControl.hasError('hasNumber')) {
      Swal.fire('Error', 'Password must contain at least 1 number', 'error');
      return false;
    }

    if (this.passwordFormControl.hasError('hasCapitalCase')) {
      Swal.fire('Error', 'Password must have at least 1 upper case letter', 'error');
      return false;
    }
    
    if (this.passwordFormControl.hasError('hasSmallCase')) {
      Swal.fire('Error', 'Password must have at least 1 lower case letter', 'error');
      return false;
    }

    return true
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
