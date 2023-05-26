import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProFormDatePicker,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Drawer, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UpdateForm from '@/pages/Me/Order/components/UpdateForm';
import { addGoodUsingPOST, deleteGoodUsingDELETE } from '@/services/mall-activity/goodController';
import { queryOrderInfoUsingGET } from '@/services/mall-order/orderController';
import { useModel } from '@@/exports';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const deleteGood = async (fields: API.deleteGoodUsingDELETEParams) => {
  try {
    const hide = message.loading('正在删除');
    const res = await deleteGoodUsingDELETE({
      ...fields,
    });
    if (res.data) {
      message.success('删除成功');
    } else {
      message.info('删除失败');
    }

    hide();
    return res.data;
  } catch (error) {
    message.error('删除失败');
    return false;
  }
};

const Admin: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.OrderInfoResp>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const { initialState, setInitialState } = useModel('@@initialState');
  const columns: ProColumns<API.OrderInfoResp>[] = [
    {
      title: '订单ID',
      dataIndex: 'orderId',
      valueType: 'text',
    },
    {
      title: '商品名称',
      dataIndex: 'goodName',
      valueType: 'text',
    },
    {
      title: '数量',
      dataIndex: 'goodCounts',
      valueType: 'text',
    },
    {
      title: '商品价格',
      dataIndex: 'goodPrice',
      valueType: 'text',
    },
    {
      title: '总价/元',
      dataIndex: 'totalPrice',
      valueType: 'text',
    },
    {
      title: '订单状态',
      dataIndex: 'orderState',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '未支付',
          status: 'Fail',
        },
        1: {
          text: '已支付',
          status: 'Success',
        },
      },
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder={'请输入异常原因！'} />;
        }
        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
          type={'primary'}
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          去支付
        </Button>,
      ],
    },
  ];
  useEffect(() => {}, []);

  return (
    <PageContainer>
      <ProTable
        headerTitle={'我的订单'}
        columns={columns}
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
          params: U & {
            pageSize: number;
            current: number;
          },
        ) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          const msg = await queryOrderInfoUsingGET({
            userId: initialState.loginUser.id,
            pageNum: params.current,
            pageSize: params.pageSize,
          });
          console.log(msg.data);
          return {
            data: msg.data,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: 50,
          };
        }}
      />
      <ModalForm
        title={'新建商品'}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          console.log(value);
          const success = await addGoodUsingPOST(value as API.AddGoodRequest);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '规则名称为必填项',
            },
          ]}
          width="md"
          name="activityId"
          label={'活动ID'}
        />
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
        />

        <ProFormTextArea width="md" label={'商品描述'} name="goodDesc" />
        <ProFormText width="md" label={'状态'} name="status" />
        <ProFormText width="md" label={'库存'} name="stock" />
        <ProFormText width="md" label={'价格'} name="price" />
        <ProFormDatePicker name="startTime" label="开始时间" />
        <ProFormDatePicker name="endTime" label="结束时间" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          console.log(value);
          const success = await addGoodUsingPOST(value);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />
      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.activityName && (
          <ProDescriptions<API.MallActivity>
            column={2}
            title={currentRow?.activityName}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.activityId,
            }}
            columns={columns as ProDescriptionsItemProps<API.MallActivity>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default Admin;
