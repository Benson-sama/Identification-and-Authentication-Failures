import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/credentials';
import { RegisterService } from 'src/app/services/register.service';
import Swal from 'sweetalert2';

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
  
                <div class="input-group mb-3">
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
                </div>

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

  constructor(private registerService: RegisterService, private router: Router) { }

  async OnSubmit() {
    if (this.credentials.username === "" || this.credentials.password === "") {
      Swal.fire('Error', 'Credentials cannot be empty!', 'error');
      console.log("Credentials cannot be empty!");
      return;
    }
    else if (this.credentials.password.length < 10) {
      Swal.fire('Error', 'Password must be at least 10 characters long!', 'error');
      console.log("Password must be at least 10 characters long!");
      return;
    }
    else if (!/\d/.test(this.credentials.password)) {
      Swal.fire('Error', 'Password must contain at least one number!', 'error');
      console.log("Password must contain at least one number!");
      return;
    }
    else if (!/[A-Z]/.test(this.credentials.password)) {
      Swal.fire('Error', 'Password must contain at least one uppercase letter!', 'error');
      console.log("Password must contain at least one uppercase letter!");
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
}
