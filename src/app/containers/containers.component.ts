import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Containers } from '../models/containers.model';
import { ContainerserviceService } from '../services/containerservice.service';
import { HttpserviceService } from '../services/httpservice.service';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {


  constructor(private router: Router, public containerService: ContainerserviceService) {

   }

  ngOnInit(): void {
  
  }


  navigateToContainer(containerID: number){
    this.router.navigate(['/container/' + containerID])
  }

}
