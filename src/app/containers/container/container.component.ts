import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { NavtitleService } from 'src/app/services/navtitle.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  private sub: any;
  public containerID: any;

  constructor(private route: ActivatedRoute, private navtitle: NavtitleService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.navtitle.id.next(paramMap.get('id'));
      /* console.log("ID: " + this.navtitle.id); */
    })
    /* this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      this.containerID = +params.get('id');

      console.log(this.containerID);
    }) */
  }

}
