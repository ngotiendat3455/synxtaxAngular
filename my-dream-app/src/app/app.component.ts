import { Component } from '@angular/core';
import { Server } from './server-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [
    { type: 'server', name: 'TestServer', content: 'test server' }
  ];
  onServerAdded(server: Server){
    this.serverElements.push(server);
  }

  onBlueprintAdded(server: Server){
    this.serverElements.push(server);
  }
}