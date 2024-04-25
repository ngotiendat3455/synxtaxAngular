import { Component, Input } from '@angular/core';
import { Server } from '../server-model';
// import { timeInterval } from 'rxjs';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
})
export class ServersComponent {
  @Input() serverList:Server[]
}