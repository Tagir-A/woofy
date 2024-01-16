export interface ApiResponse {
  message: {
    [key: string]: string[];
  };
  status: string;
}
