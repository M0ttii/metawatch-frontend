import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { catchError, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NavtitleService } from 'src/app/services/navtitle.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  protected showEdit: boolean = false;
  protected showCreate: boolean = false;
  protected showDelete: boolean = false;

  protected user: User;

  protected users: User[];

 /*  format(parseISO(entry.when), "HH:mm:ss") */

  constructor(private titleService: NavtitleService, private httpService: HttpserviceService, protected loadingService: LoadingService) { }

  ngOnInit(): void {
    this.titleService.set("");
    this.getUsers().then(
      (data: User[]) => {
        console.log(data)
        data.forEach(user => {
          user.created = format(parseISO(user.created), "dd.MM.yyyy")
        })
        this.users = data;
        this.titleService.set("User Management", "", this.users.length + " USERS")
      }
    )
  }

  public show(user){
    console.log("Show")
    this.user = user;
    this.showEdit = !this.showEdit;
  }

  public hideIf(){
    if(this.showEdit || this.showCreate || this.showDelete){
      this.showEdit = false;
      this.showCreate = false;
      this.showDelete = false;
    }
  }

  public showAdd(){
    this.showCreate = !this.showCreate;
  }

  public showdelete(user: User){
    this.user = user;
    this.showDelete = !this.showDelete;
  }

  submitAdd(value) {
    console.log(value.user, value.pass)
    this.httpService.addUser(value.user, value.pass).subscribe({
      next: (data: any) => window.location.reload(),
      error: err => console.log(err)}
    )
  }

  delete(id){
    console.log(id)
    this.httpService.deleteUser(id).subscribe({
      next: (data: any) => window.location.reload(),
      error: err => console.log(err)
    });
  }

  update(value){
    console.log(this.user.id, value.user, value.pass)
    let newname = value.user;
    let newpass = value.pass;
    this.httpService.updateUser(this.user.id, newname, newpass).subscribe({
      next: (data: any) => window.location.reload(),
      error: err => console.log(err)
    })
  }



  getUsers() {
    return new Promise(resolve => {
      this.httpService.getUsers().subscribe(
        (data: User[]) => {
          resolve(data)
        }
      )
    })
  }

}
