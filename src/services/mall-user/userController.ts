// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** userLoginInfo GET /user */
export async function userLoginInfoUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userLoginInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserCommonResp>('/user', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** userLogin POST /user/login */
export async function userLoginUsingPOST(body: API.UserLoginReq, options?: { [key: string]: any }) {
  return request<API.BaseResponseUserCommonResp>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userRegister POST /user/register */
export async function userRegisterUsingPOST(
  body: API.UserRegisterReq,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserCommonResp>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
