import {V1API} from "../../../http/APIPath"
export default {
  // Endpoints
  loginEndpoint: V1API.getAccessToken,
  // loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',

  refreshEndpoint: V1API.refreshAccessToken,
  logoutEndpoint: '/jwt/logout',

  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'access_token',
  storageRefreshTokenKeyName: 'refresh_token',
  rememberMeName: status,
}
