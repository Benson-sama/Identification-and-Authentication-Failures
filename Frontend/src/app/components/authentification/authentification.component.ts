import { Component } from "@angular/core";

@Component({
  selector: "app-authentification",
  templateUrl: "./auth.html",
  styleUrls: ["./auth.scss"],
})
export class AuthentificationComponent {
  isLoggedIn: boolean = false;
  OnSuccessfulLogin() {
    this.isLoggedIn = true;
  }
}
