import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public register = false;
  private mail: string;
  private wrongDetails: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    if (localStorage.getItem('currentUser')) {
      console.log("Already authenticated")
      this.router.navigate([''])
    }
  }

  ngOnInit(): void {
  }

  switchToRegister() {
    this.register = true;
  }

  switchToLogin() {
    this.register = false;
  }

  login(value) {
    console.log(value.user, value.pass)
    this.authService.login(value.user, value.pass).subscribe({
      next: (data: any) => console.log(data),
      error: err => console.log(err)}
    )
  }

  redirect() {
    localStorage.setItem('currentUser', 'admin');
    this.router.navigate([''])
  }

}
