import { ModalForm, ProFormDatePicker, ProFormText } from '@ant-design/pro-components';
import '@umijs/max';

import React from 'react';

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: API.MallGood) => void;
  onSubmit: (values: API.MallGood) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.MallGood>;
};
const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (

    <ModalForm
      title={'新建商品'}
      width="400px"
      visible={props.updateModalVisible}
      onFinish={props.onSubmit}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => props.onCancel(),
      }}
    >
      <ProFormText  disabled={true} width="md" label={'活动ID'} name="activityId" initialValue={props.values.activityId}/>
      <ProFormText  disabled={true} width="md" label={'商品ID'} name="goodId" initialValue={props.values.goodId}/>
      <ProFormText
        rules={[
          {
            required: true,
            message: '规则名称为必填项',
          },
        ]}
        width="md"
        name="goodName"
        label={'商品名称'}
        initialValue={props.values.goodName}
      />
      <ProFormText width="md" label={'库存'} name="text" initialValue={props.values.stock}/>
      <ProFormText width="md" label={'价格'} name="price" initialValue={props.values.price}/>
      <ProFormText width="md" label={'状态'} name="status" initialValue={props.values.status}/>
      <ProFormDatePicker name="startTime" label="开始时间" initialValue={props.values.startTime} />
      <ProFormDatePicker name="endTime" label="结束时间" initialValue={props.values.endTime}/>
    </ModalForm>
  );
};
export default UpdateForm;
