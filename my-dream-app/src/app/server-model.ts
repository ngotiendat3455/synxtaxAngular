export class Server {
    public type: string;
    public name: string;
    public content:string;

    constructor(name: string, type: string, content: string) {
        this.name = name;
        this.type = type;
        this.content = content;
    }
}