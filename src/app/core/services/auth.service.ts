import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: BehaviorSubject<any>

  constructor(private httpClient: HttpClient) {
    this.user = new BehaviorSubject(null);
  }

  isLoggedIn() {
    return this.user.getValue() != null
  }

  getUser() {
    return this.user.getValue()
  }

  getUser$() {
    return this.user.asObservable()
  }

  login(username: string, password: string) {
    return this.httpClient.post('http://localhost:1337/auth/local',{
      identifier: username,
      password
    }).subscribe(response => this.user.next(response), err => console.log(err))
  }
}
