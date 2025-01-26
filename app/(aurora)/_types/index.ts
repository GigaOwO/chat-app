/**
 * cookieの型
 * @param name クッキーの名前
 * @param value クッキーの値
 * @param maxAge クッキーの有効期限
 */
export type SetCookie = {
  name:string;
  value:string;
  maxAge:number;
}