export interface customErrorInterface extends Error {
  statusCode?: number;
  msg?: string;
}
