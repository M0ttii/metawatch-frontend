import { Component, OnInit, AfterViewInit, Input} from '@angular/core';
import { ContainerserviceService } from 'src/app/services/containerservice.service';

@Component({
  selector: 'app-containercanvas',
  templateUrl: './containercanvas.component.html',
  styleUrls: ['./containercanvas.component.css']
})
export class ContainercanvasComponent implements OnInit, AfterViewInit {
  @Input() name = '';
  @Input() id = '';
  @Input() image = '';
  @Input() state = '';
  @Input() port = '';
  @Input() stateColor = '';

  constructor(public containerService: ContainerserviceService) { 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  
  }

}
