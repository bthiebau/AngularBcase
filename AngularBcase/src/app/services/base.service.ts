import { environment } from "../../environments/environment.development";

export abstract class BaseService {
    private address: string;
    private port: number;
    protected resource: string;

  constructor(resource: string){
    this.address = environment.apiAddress;
    this.port = environment.apiPort;
    this.resource = resource;
  }

  protected get apiUrl (): string {
    return `http://${this.address}:${this.port}/${this.resource}`;
  }
}