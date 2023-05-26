// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** placeOrder POST /order */
export async function placeOrderUsingPOST(body: API.OrderReq, options?: { [key: string]: any }) {
  return request<API.BaseResponseOrderResp>('/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** queryOrderInfo GET /order/info */
export async function queryOrderInfoUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryOrderInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListOrderInfoResp>('/order/info', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
