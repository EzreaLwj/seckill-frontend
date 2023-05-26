declare namespace API {
  type AddGoodRequest = {
    activityId?: number;
    endTime?: string;
    goodDesc?: string;
    goodId?: number;
    goodName?: string;
    goodPic?: string;
    price?: number;
    startTime?: string;
    status?: number;
    stock?: number;
  };

  type AddMallActivityRequest = {
    activityDesc?: string;
    activityId?: number;
    activityName?: string;
    activityPic?: string;
    endTime?: string;
    startTime?: string;
    status?: number;
  };

  type AddSellGoodRequest = {
    endTime?: string;
    goodDesc?: string;
    goodId?: number;
    goodName?: string;
    goodPic?: string;
    price?: number;
    startTime?: string;
    status?: number;
    stock?: number;
  };

  type BaseResponseboolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseListLotteryActivityResp = {
    code?: number;
    data?: LotteryActivityResp[];
    message?: string;
  };

  type BaseResponseListMallActivityResponse = {
    code?: number;
    data?: MallActivityResponse[];
    message?: string;
  };

  type BaseResponseListMallGoodResponse = {
    code?: number;
    data?: MallGoodResponse[];
    message?: string;
  };

  type BaseResponseListSellGoodResponse = {
    code?: number;
    data?: SellGoodResponse[];
    message?: string;
  };

  type BaseResponseLotteryDrawResponse = {
    code?: number;
    data?: LotteryDrawResponse;
    message?: string;
  };

  type BaseResponseMallActivity = {
    code?: number;
    data?: MallActivity;
    message?: string;
  };

  type BaseResponseMallGood = {
    code?: number;
    data?: MallGood;
    message?: string;
  };

  type BaseResponseSellGood = {
    code?: number;
    data?: SellGood;
    message?: string;
  };

  type deleteActivityUsingDELETEParams = {
    /** activityId */
    activityId: number;
  };

  type deleteGoodUsingDELETEParams = {
    /** goodId */
    goodId: number;
  };

  type deleteSellGoodUsingDELETEParams = {
    /** goodId */
    goodId: number;
  };

  type GoodRpc = {
    endTime?: string;
    goodId?: number;
    goodName?: string;
    goodPrice?: number;
    isExit?: boolean;
  };

  type LotteryActivityReq = {
    activityCount?: number;
    activityId?: number;
    strategy?: number;
    userTakeAccount?: number;
  };

  type LotteryActivityResp = {
    activityCount?: number;
    activityDesc?: string;
    activityId?: number;
    activityName?: string;
    activityPic?: string;
    goodStock?: number;
  };

  type LotteryDrawRequest = {
    activityId?: number;
    userId?: number;
  };

  type LotteryDrawResponse = {
    activityId?: number;
    goodId?: number;
    goodName?: string;
    userId?: number;
  };

  type MallActivity = {
    activityDesc?: string;
    activityId?: number;
    activityName?: string;
    activityPic?: string;
    endTime?: string;
    id?: number;
    startTime?: string;
    status?: number;
  };

  type MallActivityResponse = {
    activityDesc?: string;
    activityId?: number;
    activityName?: string;
    activityPic?: string;
    endTime?: string;
    startTime?: string;
    status?: number;
  };

  type MallGood = {
    activityId?: number;
    availableStock?: number;
    createTime?: string;
    endTime?: string;
    goodDesc?: string;
    goodId?: number;
    goodName?: string;
    goodPic?: string;
    id?: number;
    modifiedTime?: string;
    price?: number;
    startTime?: string;
    status?: number;
    stock?: number;
  };

  type MallGoodResponse = {
    activityId?: number;
    availableStock?: number;
    endTime?: string;
    goodDesc?: string;
    goodId?: number;
    goodName?: string;
    goodPic?: string;
    price?: number;
    startTime?: string;
    status?: number;
    stock?: number;
  };

  type queryActivityUsingGETParams = {
    /** activityId */
    activityId: number;
  };

  type queryGoodUsingGETParams = {
    /** goodId */
    goodId: number;
  };

  type queryLotteryActivityUsingGETParams = {
    /** pageNum */
    pageNum: number;
    /** pageSize */
    pageSize: number;
    /** keyword */
    keyword?: string;
  };

  type queryMallActivitiesUsingGETParams = {
    /** pageNum */
    pageNum: number;
    /** pageSize */
    pageSize: number;
    /** keyword */
    keyword?: string;
  };

  type queryMallGoodUsingGETParams = {
    /** pageNum */
    pageNum: number;
    /** pageSize */
    pageSize: number;
    /** activityId */
    activityId?: number;
    /** keyword */
    keyword?: string;
  };

  type querySellGoodRpcUsingGETParams = {
    /** goodId */
    goodId: number;
  };

  type querySellMallGoodUsingGETParams = {
    /** pageNum */
    pageNum: number;
    /** pageSize */
    pageSize: number;
    /** keyword */
    keyword?: string;
  };

  type SellGood = {
    availableStock?: number;
    createTime?: string;
    endTime?: string;
    goodDesc?: string;
    goodId?: number;
    goodName?: string;
    goodPic?: string;
    id?: number;
    isWarmUp?: number;
    modifiedTime?: string;
    price?: number;
    startTime?: string;
    status?: number;
    stock?: number;
    type?: number;
  };

  type SellGoodResponse = {
    availableStock?: number;
    endTime?: string;
    goodDesc?: string;
    goodId?: number;
    goodName?: string;
    goodPic?: string;
    price?: number;
    startTime?: string;
    status?: number;
    stock?: number;
  };
}
