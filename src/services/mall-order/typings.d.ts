declare namespace API {
  type BaseResponseListOrderInfoResp = {
    code?: number;
    data?: OrderInfoResp[];
    message?: string;
  };

  type BaseResponseOrderResp = {
    code?: number;
    data?: OrderResp;
    message?: string;
  };

  type createPayFromUsingGETParams = {
    orderId?: string;
    subject?: string;
    totalPrice?: string;
  };

  type OrderInfoResp = {
    createTime?: string;
    goodCounts?: number;
    goodName?: string;
    goodPrice?: number;
    orderId?: number;
    orderState?: number;
    totalPrice?: number;
  };

  type OrderReq = {
    count?: number;
    goodId?: number;
    userId?: number;
  };

  type OrderResp = {
    goodId?: number;
    goodName?: string;
    orderId?: string;
    totalPrice?: number;
    userId?: number;
  };

  type QRCodeResp = {
    qrCode?: string;
  };

  type queryOrderInfoUsingGETParams = {
    keywords?: string;
    pageNum?: number;
    pageSize?: number;
    userId?: number;
  };
}
