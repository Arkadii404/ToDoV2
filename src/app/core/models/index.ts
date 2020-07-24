export namespace CoreModels {
    export interface IUser {
        name: string;
        email: string;
        password: string;
        status: string;
        adminPassword?: string;
        features: number[];
        permisions: number[];
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
    export interface IFeature {
        name: string;
        title: string;
        id: string;
    }
    export interface IPermision {
        name: string;
        title: string;
        id: string;
    }
    export interface IMode {
        value: string;
        viewValue: string;
    }
}