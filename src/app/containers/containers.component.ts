import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContainerserviceService } from '../services/containerservice.service';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {

  constructor(private router: Router, public containerService: ContainerserviceService) { }

  ngOnInit(): void {
    /* for(let container of this.containers){
      console.log(container.name);
    } */
  }

  navigateToContainer(containerID: number){
    this.router.navigate(['/container/' + containerID])
  }

}
