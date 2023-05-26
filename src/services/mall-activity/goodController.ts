// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addGood POST /good/add */
export async function addGoodUsingPOST(body: API.AddGoodRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseMallGood>('/good/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** addSellGood POST /good/addSell */
export async function addSellGoodUsingPOST(
  body: API.AddSellGoodRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseSellGood>('/good/addSell', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteGood DELETE /good/delete/${param0} */
export async function deleteGoodUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteGoodUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { goodId: param0, ...queryParams } = params;
  return request<API.BaseResponseboolean>(`/good/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** deleteSellGood DELETE /good/deleteSell/${param0} */
export async function deleteSellGoodUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteSellGoodUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { goodId: param0, ...queryParams } = params;
  return request<API.BaseResponseboolean>(`/good/deleteSell/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** querySellGoodRpc GET /good/feign/${param0} */
export async function querySellGoodRpcUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.querySellGoodRpcUsingGETParams,
  options?: { [key: string]: any },
) {
  const { goodId: param0, ...queryParams } = params;
  return request<API.GoodRpc>(`/good/feign/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** queryGood GET /good/query/${param0} */
export async function queryGoodUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryGoodUsingGETParams,
  options?: { [key: string]: any },
) {
  const { goodId: param0, ...queryParams } = params;
  return request<API.BaseResponseMallGood>(`/good/query/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** queryMallGood GET /good/query/goods */
export async function queryMallGoodUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryMallGoodUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListMallGoodResponse>('/good/query/goods', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** querySellMallGood GET /good/sell/goods */
export async function querySellMallGoodUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.querySellMallGoodUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListSellGoodResponse>('/good/sell/goods', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
