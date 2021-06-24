import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {CanActivate, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  private readonly user: BehaviorSubject<any>
  private readonly error: BehaviorSubject<string>

  constructor(private httpClient: HttpClient, private router: Router) {
    this.user = new BehaviorSubject(null)
    this.error = new BehaviorSubject('')
  }


  async redirectAuthenticated() {
    if (this.isAuthenticated()) {
      await this.router.navigate(['/dashboard'])
    }
  }

  getUser$() {
    return this.user.asObservable()
  }

  getError$() {
    return this.error.asObservable()
  }

  /**
   * API Request to login
   * @param username username/email
   * @param password password
   */
  login(username: string, password: string) {
    return this.httpClient.post('http://localhost:1337/auth/local',{
      identifier: username,
      password
    }).subscribe(response => this.user.next(response), () => this.error.next('Invalid username / password'))
  }


  /**
   * Used for routes protection, called by canActivate
   */
  isAuthenticated() {
    if (!this.user.getValue() || !this.user.getValue().jwt) {
      this.router.navigate(['/']).catch(err => console.log(err))
      return false
    }
    return true
  }

  /**
   * Overwrite CanActivate class
   */
  canActivate() {
    return this.isAuthenticated()
  }
}
