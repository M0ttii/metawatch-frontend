import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {
  protected containers = [{name: "Container 1", id:1}, {name: "Container 2", id:2}, {name: "Container 3", id:3}]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToContainer(containerID: number){
    this.router.navigate(['/container/' + containerID])
  }

}
