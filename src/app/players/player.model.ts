export class Player {
    constructor(public id: string) {
        this.connected = true;
    }
    connected: boolean;
    name: string;
    char: string;
    speed: number;
    might: number;
    sanity: number;
    knowledge: number;
}
