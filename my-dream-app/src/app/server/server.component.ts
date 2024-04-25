import { Component, Input } from "@angular/core";
import { Server } from "../server-model";

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styles: [`
        .online {
            color: white;
        }
    `],
})
export class ServerComponent{
   @Input() serverElement: Server;
}