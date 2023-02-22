import { getAccessToken } from './../../utils/localStorerage';
import * as _jsonwebtoken from "jsonwebtoken"
import jwt_decode from "jwt-decode";

export const  GetUser = () =>{
 const token = getAccessToken()
//   console.log(token)
  // Giải mã token và lấy thông tin user và email
  const decodedToken: { [key: string]: any } = jwt_decode(token?token:'');
//   console.log(decodedToken)
  const email = decodedToken.email;
  return email;
}
