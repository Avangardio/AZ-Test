export declare class ApiService {
    usersAvg: IusersAvg;
    usersPosts: IAfishaList;
    avgNumber(data: INubmerUnit[]): Icalculated;
    addNumber_service(data: IaddNumber): INubmerUnit;
    allCalculations_service(userId: string): 0 | Icalculated[];
    addNewPost_service(data: IAddNewPost, newUser: boolean): string;
    getAllPosts_service(userId: string): IAfishaUnit[];
}
