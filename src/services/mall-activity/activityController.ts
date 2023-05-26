// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addActivity POST /activity/add */
export async function addActivityUsingPOST(
  body: API.AddMallActivityRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseMallActivity>('/activity/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteActivity DELETE /activity/delete/${param0} */
export async function deleteActivityUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteActivityUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { activityId: param0, ...queryParams } = params;
  return request<API.BaseResponseboolean>(`/activity/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** queryActivity GET /activity/query/${param0} */
export async function queryActivityUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryActivityUsingGETParams,
  options?: { [key: string]: any },
) {
  const { activityId: param0, ...queryParams } = params;
  return request<API.BaseResponseMallActivity>(`/activity/query/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** queryMallActivities GET /activity/query/activities */
export async function queryMallActivitiesUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryMallActivitiesUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListMallActivityResponse>('/activity/query/activities', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
