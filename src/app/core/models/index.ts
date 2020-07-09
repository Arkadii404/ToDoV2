export namespace CoreModels {
    export interface IUser {
        name: string;
        email: string;
        password: string;
        banned: boolean;
        id?: number;
    }
}