import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {
  protected containers = [{name: "Seafile", id:1},
                          {name: "Blocky", id:2},
                          {name: "Wireguard", id:3}]

  constructor(private router: Router) { }

  ngOnInit(): void {
    for(let container of this.containers){
      console.log(container.name);
    }
  }

  navigateToContainer(containerID: number){
    this.router.navigate(['/container/' + containerID])
  }

}
