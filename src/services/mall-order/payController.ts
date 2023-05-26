// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** createQRCode POST /pay */
export async function createQRCodeUsingPOST(options?: { [key: string]: any }) {
  return request<API.QRCodeResp>('/pay', {
    method: 'POST',
    ...(options || {}),
  });
}

/** notify POST /pay/notify */
export async function notifyUsingPOST(options?: { [key: string]: any }) {
  return request<any>('/pay/notify', {
    method: 'POST',
    ...(options || {}),
  });
}

/** createPayFrom GET /pay/requestFrom */
export async function createPayFromUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.createPayFromUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<any>('/pay/requestFrom', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
