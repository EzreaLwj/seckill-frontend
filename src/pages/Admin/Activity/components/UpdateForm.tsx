import {
  ModalForm,
  ProFormDatePicker,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import '@umijs/max';

import React from 'react';

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: API.MallActivity) => void;
  onSubmit: (values: API.MallActivity) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.MallActivity>;
};
const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (

    <ModalForm
      title={'新建活动'}
      width="400px"
      visible={props.updateModalVisible}
      onFinish={props.onSubmit}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => props.onCancel(),
      }}
    >
      <ProFormText  disabled={true} width="md" label={'活动ID'} name="activityId" initialValue={props.values.activityId}/>
      <ProFormText
        rules={[
          {
            required: true,
            message: '规则名称为必填项',
          },
        ]}
        width="md"
        name="activityName"
        label={'活动名称'}
        initialValue={props.values.activityName}
      />
      <ProFormTextArea width="md" label={'活动描述'} name="activityDesc" initialValue={props.values.activityDesc}/>
      <ProFormText width="md" label={'状态'} name="status" initialValue={props.values.status}/>
      <ProFormDatePicker name="startTime" label="开始时间" initialValue={props.values.startTime} />
      <ProFormDatePicker name="endTime" label="结束时间" initialValue={props.values.endTime}/>
    </ModalForm>
  );
};
export default UpdateForm;
