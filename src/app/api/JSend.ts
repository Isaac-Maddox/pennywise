export default function JSend<Data = any, Error = string>(data: JSendResponse<Data, Error>, status: number = 200) {
   return Response.json(data, {
      status,
   });
}

export type JSendResponse<Data = any, Error = string> =
   | {
        status: "success";
        data:
           | ({
                [key: string]: Data;
             } & {
                pagination?: APIPagination;
             })
           | null;
     }
   | {
        status: "fail";
        data: {
           [key: string]: Error;
        };
     }
   | {
        status: "error";
        message: string;
     };

export interface APIPagination {
   page_count: number;
   current_page: number;
   record_count: number;
   more_pages: boolean;
}
