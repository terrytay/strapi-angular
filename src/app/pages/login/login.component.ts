import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {NgForm} from "@angular/forms";
import {SubSink} from "subsink";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  subscriptions: SubSink

  constructor(private authService: AuthService) {
    this.subscriptions = new SubSink()
  }

  ngOnInit(): void {
    this.subscriptions.sink = this.authService.getUser$().subscribe(e => alert(e))
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  handleLogin(form: NgForm) {
    this.authService.login(form.value.username, form.value.password)
  }


}
