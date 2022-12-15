import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Containers } from '../models/containers.model';
import { ContainerserviceService } from '../services/containerservice.service';
import { HttpserviceService } from '../services/httpservice.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {

  constructor(private router: Router, public containerService: ContainerserviceService, public loadingService: LoadingService) {

   }

  ngOnInit(): void {
    this.wait();
  }

  private sleep = (ms) => new Promise(r => setTimeout(r, ms));

  navigateToContainer(containerID: number){
    this.router.navigate(['/container/' + containerID])
  }

  async wait(){
    await this.sleep(5000)
    console.log(this.loadingService.loading.getValue())
  }

}
