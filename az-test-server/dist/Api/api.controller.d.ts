import { ApiService } from './api.service';
interface IaddNumberBody extends INubmerUnit {
}
export declare class ApiController {
    private readonly appService;
    constructor(appService: ApiService);
    login_controller(request: any, response: any): void;
    addNumber_controller(body: IaddNumberBody, request: any, response: any): void;
    allCalculations_controller(request: any, query: {
        user: string;
    }): Icalculated[] | 0;
}
export {};
