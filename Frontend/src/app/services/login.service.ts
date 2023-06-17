import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { Credentials } from "../models/credentials";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private readonly API_URL = "http://localhost:";
  private readonly PORT = "5265";
  private readonly LOGIN_ENDPOINT = "/api/Users/login";

  constructor(private http: HttpClient) {}

  async login(credentials: Credentials): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.post(
          this.API_URL + this.PORT + this.LOGIN_ENDPOINT,
          credentials,
          { observe: "response" }
        )
      );

      return response.status === 200;
    } catch (error) {
      console.log("Login failed", error);
      return false;
    }
  }
}
