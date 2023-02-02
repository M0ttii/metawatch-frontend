import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { catchError, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert.service';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NavtitleService } from 'src/app/services/navtitle.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {
  protected showEdit: boolean = false;
  protected showCreate: boolean = false;
  protected showDelete: boolean = false;

  protected user: User;

  protected users: User[];
  protected loading: boolean = true;

  public inSelect: boolean = false;

 /*  format(parseISO(entry.when), "HH:mm:ss") */

  constructor(private titleService: NavtitleService, private httpService: HttpserviceService, protected loadingService: LoadingService, private alertService: AlertService) { }

  ngAfterViewInit(): void {
    this.inSelect = true;
    this.loading = false;
  }

  ngOnInit(): void {
    this.titleService.set("User Management", "", "0 USERS")
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
    this.showCreate = !this.showCreate;
    console.log(value.user, value.pass)
    this.httpService.addUser(value.user, value.pass).subscribe({
      next: (data: any) => console.log(data),
      error: err => console.log(err)}
    )
    let userObject = {} as User;
    userObject.name = value.user;
    userObject.created = format(new Date, "dd.MM.yyyy");
    this.users.push(userObject);
    this.alertService.customalert("User Added", "User " + value.user + " was added.")
  }

  delete(id){
    console.log(id)
    this.showDelete = false;
    this.httpService.deleteUser(id).subscribe({
      next: (data: any) => console.log(data),
      error: err => console.log(err)
    });
    this.users = this.users.filter(function (obj) {
      return obj.id !== id;
    });
    this.alertService.customalert("User Removed", "User " + this.user.name + " was removed.")
  }

  update(value){
    this.showEdit = !this.showEdit;
    console.log(this.user.id, value.user, value.pass)
    let newname = value.user;
    let newpass = value.pass;
    this.httpService.updateUser(this.user.id, newname, newpass).subscribe({
      next: (data: any) => console.log(data),
      error: err => console.log(err)
    })

    this.users.find(user => user.id === this.user.id).name = newname;
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
