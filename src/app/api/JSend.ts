export default class JSend {
   public static success<Data = any>(data: JSendSuccessData<Data> = null, status: number = 200) {
      return Response.json({
         status: "success",
         data: data
      }, {
         status
      });
   }

   public static fail<Data = any>(data: JSendFailData<Data>, status: number = 400) {
      return Response.json({
         status: 'fail',
         data: data
      }, {
         status
      });
   }

   public static error(error: string, status: number = 500) {
      return Response.json({
         status: 'error',
         message: error
      }, {
         status
      });
   }

   public static Unauthenticated = Response.json({
      status: "fail",
      data: {
         message: "You must be logged in to access this route"
      }
   }, {
      status: 401
   });

   public static Unauthorized = Response.json({
      status: "fail",
      data: {
         message: "You are not authorized to view this resource"
      }
   }, {
      status: 403
   })
}

type JSendSuccessData<Data = any> = ({
   [key: string]: Data
} & {
   pagination?: APIPagination
}) | null

type JSendFailData<Data = any> = {
   message: string;
} & {
   [key: string]: Data;
}

type APIPagination = {
   record_count: number;
   page_count: number;
   current_page: number;
   more_pages: number;
}
