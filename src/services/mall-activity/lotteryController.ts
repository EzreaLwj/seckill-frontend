// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** drawLottery POST /lottery/draw */
export async function drawLotteryUsingPOST(
  body: API.LotteryDrawRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLotteryDrawResponse>('/lottery/draw', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** publishLotteryActivity POST /lottery/publish */
export async function publishLotteryActivityUsingPOST(
  body: API.LotteryActivityReq,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/lottery/publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** queryLotteryActivity GET /lottery/query */
export async function queryLotteryActivityUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryLotteryActivityUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListLotteryActivityResp>('/lottery/query', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
