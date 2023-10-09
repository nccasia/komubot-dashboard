import { getAccessToken,removeAccessToken } from "./../../utils/localStorerage";
import jwt_decode from "jwt-decode";

export const GetUser = () => {
  
  const token = getAccessToken();
  // Giải mã token và lấy thông tin user và email
  try {
    const decodedToken: { [key: string]: any } = jwt_decode(token ? token : "");
    // console.log(decodedToken)
    const email = decodedToken.email;
    if (email) {
      return email;
    } else {
      throw new Error("Email not found in JWT payload");
    }
  } catch (err) {
    removeAccessToken();
    window.location.pathname = "/login";
    return null;
  }
};
