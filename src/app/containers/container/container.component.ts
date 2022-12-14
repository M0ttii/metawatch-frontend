import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { ContainerserviceService } from 'src/app/services/containerservice.service';
import { NavtitleService } from 'src/app/services/navtitle.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  private sub: any;
  public containerID: any;

  constructor(private route: ActivatedRoute, private navtitle: NavtitleService, private containerService: ContainerserviceService) {
    this.route.paramMap.subscribe( paramMap => {
      this.navtitle.id.next(paramMap.get('id'));
      /* console.log("ID: " + this.navtitle.id); */
    })
   }

  ngOnInit(): void {

    /* this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      this.containerID = +params.get('id');

      console.log(this.containerID);
    }) */
  }

}
