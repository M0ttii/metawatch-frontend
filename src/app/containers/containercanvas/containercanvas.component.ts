import { Component, OnInit, ElementRef, ViewChild, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-containercanvas',
  templateUrl: './containercanvas.component.html',
  styleUrls: ['./containercanvas.component.css']
})
export class ContainercanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('myCanvas', {static: false}) myCanvas: ElementRef<HTMLCanvasElement>;

  constructor() { 
  
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    var ctx = this.myCanvas.nativeElement.getContext("2d");
    ctx.save();
    ctx.fillStyle = 'white';
    var width = this.myCanvas.nativeElement.width;
    var height = this.myCanvas.nativeElement.height;
    ctx.fillRect(0,0,width,height);
    ctx.restore(); 
  }

}
