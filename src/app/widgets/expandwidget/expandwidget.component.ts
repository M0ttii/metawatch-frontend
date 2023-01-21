import { Component, Input, OnInit } from '@angular/core';
import { SingleContainer } from 'src/app/models/singlecontainer.model';

@Component({
  selector: 'app-expandwidget',
  templateUrl: './expandwidget.component.html',
  styleUrls: ['./expandwidget.component.css']
})
export class ExpandwidgetComponent implements OnInit {
  @Input() expandVolumes: boolean;
  @Input() expandNetworks: boolean;
  @Input() public container: SingleContainer;
  @Input() type: string;

  constructor() { }

  ngOnInit(): void {
  }

}
