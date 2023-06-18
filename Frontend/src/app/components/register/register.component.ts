import { Component } from "@angular/core";
import { isFormArray } from "@angular/forms";
import { Router } from "@angular/router";
import { Credentials } from "src/app/models/credentials";
import { RegisterService } from "src/app/services/register.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-register",
  template: `
    <div class="h-100 d-flex align-items-center justify-content-center">
      <div class="container">
        <div class="row">
          <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card border-0 shadow rounded-3 my-5">
              <div class="card-body p-4 p-sm-5">
                <h3 class="card-title text-center mb-5 fw-light fs-3">
                  <b>Register</b>
                </h3>
                <form>
                  <div class="input-group mb-3">
                    <span class="input-group-text"
                      ><i class="bi bi-person"></i
                    ></span>
                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control"
                        id="username"
                        name="username"
                        placeholder="Username"
                        [(ngModel)]="credentials.username"
                        required
                      />
                      <label for="username">Username</label>
                    </div>
                  </div>

                  <div class="input-group mb-3">
                    <span class="input-group-text"
                      ><i class="bi bi-envelope-fill"></i
                    ></span>
                    <div class="form-floating">
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        name="email"
                        placeholder="max.mustermann@gmail.com"
                        [(ngModel)]="credentials.email"
                        required
                      />
                      <label for="email">Email</label>
                    </div>
                  </div>

                  <div class="input-group mb-3">
                    <span class="input-group-text"
                      ><i class="bi bi-lock"></i
                    ></span>
                    <div class="form-floating">
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        [(ngModel)]="credentials.password"
                        required
                      />
                      <label for="password">Password</label>
                    </div>
                  </div>

                  <div class="d-grid">
                    <button
                      class="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                      (click)="OnSubmit()"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class RegisterComponent {
  credentials: Credentials = new Credentials();

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  async OnSubmit() {
    let passwordRegex: RegExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!^&+=])(?=.{8,})/;
    let emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(this.credentials.password);
    let passwordValid: boolean = passwordRegex.test(this.credentials.password);
    let emailValid: boolean = emailRegex.test(this.credentials.email);
    console.log(emailValid);

    if (this.credentials.username === "" || this.credentials.password === "") {
      Swal.fire("Error", "Credentials cannot be empty!", "error");
      console.log("Credentials cannot be empty!");
      return;
    }

    if (!passwordValid) {
      Swal.fire(
        "Error",
        "Password must be in following format: Must contain min. one lower, upper, special char. Must contain one number. Must be min. length of 8. ",
        "error"
      );
      console.log("Password format wrong!");
      return;
    }

    if (!emailValid) {
      Swal.fire("Error", "Email format is wrong!", "error");
      console.log("Email format wrong!");
      return;
    }

    console.log("Registering with username: " + this.credentials.username);
    if (await this.registerService.register(this.credentials)) {
      Swal.fire("Success", "You may now login!", "success");
      console.log("Successfully registered!");
      this.router.navigate([""]);
    } else {
      Swal.fire("Error", "Username or email is already taken!", "error");
      console.log("Successfully registered!");
    }
  }
}
