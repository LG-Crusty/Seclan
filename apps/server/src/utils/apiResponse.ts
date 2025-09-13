interface ApiResponseInterface{
    statusCode : number;
    message: string;
    data: any;
    success: boolean
}

class ApiResponse implements ApiResponseInterface {
  statusCode: number;
  message: string;
  data: any;
  success: boolean;

  constructor(statusCode: number, message = "success", data:any = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = true;
  }
}

export { ApiResponse };