import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SingleContainer } from 'src/app/models/singlecontainer.model';

@Component({
  selector: 'app-newwidget',
  templateUrl: './newwidget.component.html',
  styleUrls: ['./newwidget.component.css']
})
export class NewwidgetComponent implements OnInit {
  @Input() public type: string;
  @Input() public container: SingleContainer;
  @Input() public dataFetched: BehaviorSubject<Boolean>;
  protected expandVolumesV: boolean = false;
  protected expandNetworksV: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public expandVolumes(){
    this.expandVolumesV = !this.expandVolumesV;
  }

  public expandNetworks(){
    this.expandNetworksV = !this.expandNetworksV;
  }

}
