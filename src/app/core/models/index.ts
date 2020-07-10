export namespace CoreModels {
    export interface IUser {
        name: string;
        email: string;
        password: string;
        banned: boolean;
        id?: number;
    }
    export interface ITask {
        title: string;
        message: string;
        isDone: boolean;
        time: Date;
        userId: number;
        id?: number;
    }
}