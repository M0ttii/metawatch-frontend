import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public register = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  switchToRegister(){
    this.register = true;
  }

  switchToLogin(){
    this.register = false;
  }

  redirect(){
    /* localStorage.setItem('currentUser', 'admin'); */
    this.router.navigate([''])
  }

}
