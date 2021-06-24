import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {NgForm} from "@angular/forms";
import {SubSink} from "subsink";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  subscriptions: SubSink
  errorMsg: string

  constructor(private authService: AuthService) {
    this.subscriptions = new SubSink()
    this.errorMsg = ''
  }

  ngOnInit(): void {
    this.subscriptions.sink = this.authService.getUser$().subscribe(user => {
      if (user != null) {
        this.authService.redirectAuthenticated().catch(err => console.log(err))
      }
    })

    this.subscriptions.sink = this.authService.getError$().subscribe(error => {
      if (error != null) {
        this.errorMsg = error
      }
    })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  handleLogin(form: NgForm) {
    this.authService.login(form.value.username, form.value.password)
  }


}
