export interface MenuItem {
    title: string;
    subMenu?: MenuItem[];
    content: any
}

export interface IReqPatient {
    config: string;
    data: {
        meta: IMeta;
        data: any;
    }
    status: number;
}
export interface IMeta {
    code: number;
    message: string;
}