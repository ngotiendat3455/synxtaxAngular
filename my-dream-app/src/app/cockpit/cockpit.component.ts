import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Server } from '../server-model';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent {
  @Output("svCreated") serverCreated = new EventEmitter<Server>()
  @Output("bpCreated") blueprintCreated = new EventEmitter<Server>()

  @ViewChild("serverContent", { static: true }) serverContentRef:ElementRef; 
  onAddServer(serverName: HTMLInputElement){
    const server = new Server(serverName.value, this.serverContentRef.nativeElement.value, 'server');
    this.serverCreated.emit(server);
  }

  onAddBlueprint(serverName: HTMLInputElement){
    const server = new Server(serverName.value, this.serverContentRef.nativeElement.value, 'blueprint');
    this.blueprintCreated.emit(server);
  }
}
