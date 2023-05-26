import { ModalForm, ProFormText } from '@ant-design/pro-components';
import '@umijs/max';

import React from 'react';

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: API.SellGoodResponse) => void;
  onSubmit: (values: API.SellGoodResponse) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.SellGoodResponse>;
};
const BuyFrom: React.FC<UpdateFormProps> = (props) => {
  return (

    <ModalForm
      title={'订单详情'}
      width="400px"
      visible={props.updateModalVisible}
      onFinish={props.onSubmit}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => props.onCancel(),
      }}
    >
      <ProFormText  disabled={true} width="md" label={'商品 ID'} name="goodId" initialValue={props.values.goodId}/>
      <ProFormText
        rules={[
          {
            required: true,
            message: '规则名称为必填项',
          },
        ]}
        disabled={true}
        width="md"
        name="activityName"
        label={'商品名称'}
        initialValue={props.values.goodName}
      />
      <ProFormText width="md" label={'商品价格'} disabled={true} name="goodPrice" initialValue={props.values.price}/>
      <ProFormText width="md" label={'购买数量'} name={"goodCount"}/>
      {"总价: "}
    </ModalForm>
  );
};
export default BuyFrom;
