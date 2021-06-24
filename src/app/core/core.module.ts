import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    FormsModule
  ],
  exports: [
    HttpClientModule,
    FormsModule
  ]
})
export class CoreModule { }
