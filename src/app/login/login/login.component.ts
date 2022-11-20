import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public register = false;
  private mail: string;
  private wrongDetails: boolean = false;

  constructor(private router: Router) {
    if(localStorage.getItem('currentUser')){
      console.log("Already authenticated")
      this.router.navigate([''])
    }
  }

  ngOnInit(): void {
  }

  switchToRegister(){
    this.register = true;
  }

  switchToLogin(){
    this.register = false;
  }

  login(value){
    if(!(value.mail == "admin")){
      this.wrongDetails = true;
      return;
    } 
    if(!(value.mail == "admin")){
      this.wrongDetails = true;
      return;
    }
    this.wrongDetails = false;
    this.redirect()
  }

  redirect(){
    localStorage.setItem('currentUser', 'admin');
    this.router.navigate([''])
  }

}
