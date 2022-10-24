import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  private sub: any;
  public containerID: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    /* this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      this.containerID = +params.get('id');

      console.log(this.containerID);
    }) */
  }

}
