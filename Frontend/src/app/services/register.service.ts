import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { Credentials } from "../models/credentials";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  private readonly API_URL = "https://localhost:";
  private readonly PORT = "7237";
  private readonly LOGIN_ENDPOINT = "/api/Users/register";

  constructor(private http: HttpClient) {}

  async register(credentials: Credentials): Promise<boolean> {
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
      console.log("Register failed", error);
      return false;
    }
  }
}
