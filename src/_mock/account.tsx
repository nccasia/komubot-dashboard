// ----------------------------------------------------------------------

// import jwt from 'jsonwebtoken';
// import { getAccessToken } from '../utils/localStorerage';

// interface IgetUser{
//   user: string,
//   email: string,

// } 
// // Giả sử token đã được lưu trong state của component
// const token = getAccessToken()

// // Giải mã token và lấy thông tin user và email
// const decodedToken = jwt.decode( token );
// const user = decodedToken.username;
// const email = decodedToken.email;
const account = {
  displayName:  'admin',
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default account;
