declare namespace API {
  type BaseResponseUserCommonResp = {
    code?: number;
    data?: UserCommonResp;
    message?: string;
  };

  type UserCommonResp = {
    id?: number;
    mail?: string;
    phone?: string;
    role?: number;
    userAccount?: string;
    userName?: string;
  };

  type userLoginInfoUsingGETParams = {
    /** id */
    id: number;
  };

  type UserLoginReq = {
    userAccount?: string;
    userPassword?: string;
    autoLogin?: boolean
  };

  type UserRegisterReq = {
    birthday?: string;
    gender?: number;
    mail?: string;
    phone?: string;
    userAccount?: string;
    userName?: string;
    userPassword?: string;
  };
}
