export default class JSend {
   public static success(data: any = null, status: number = 200) {
      return Response.json({
         status: "success",
         data: data
      }, {
         status
      });
   }

   public static fail(data: any, status: number = 400) {
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