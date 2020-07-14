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
    export interface IUpdateTask {
        title: string;
        message: string;
        isDone: boolean;
    }
    export interface IEvent {
        title: string;
        description: string;
        place: string;
        date: string;
        theme: string;
        whoCome: number[];
        id?: number;
    }
}