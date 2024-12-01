export type ActionResponse<Data = any> =
   | {
        success: true;
        data: Data;
        message?: never;
     }
   | {
        success: false;
        data?: never;
        message: string;
     };
