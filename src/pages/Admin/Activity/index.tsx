import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormText,
  ProFormTextArea,
  ProFormDatePicker,
  ProTable,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProFormSelect,
  ProForm,
} from '@ant-design/pro-components';
import '@umijs/max';

import React, { useRef, useState } from 'react';
import { Button, Drawer, Input, message } from 'antd';
import {
  addActivityUsingPOST,
  deleteActivityUsingDELETE,
  queryMallActivitiesUsingGET,
} from '@/services/mall-activity/activityController';
import { publishLotteryActivityUsingPOST } from '@/services/mall-activity/lotteryController';
import { PlusOutlined } from '@ant-design/icons';
import UpdateForm from '@/pages/Admin/Activity/components/UpdateForm';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const deleteActivity = async (fields: API.deleteActivityUsingDELETEParams) => {
  try {
    const hide = message.loading('正在删除');
    const res = await deleteActivityUsingDELETE({
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

const publishLottery = async (field: API.LotteryActivityReq) => {
  try {
    const hide = message.loading('正在发布');
    const res = await publishLotteryActivityUsingPOST({
      ...field,
    });
    if (res.data) {
      message.success('发布成功');
    } else {
      message.info('发布失败');
    }
    hide();
    return res.data;
  } catch (e) {
    message.error('发布失败');
    return false;
  }
};

const Admin: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [publishModalVisible, setPublishModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.MallActivity>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.MallActivity>[] = [
    {
      title: '活动名称',
      dataIndex: 'activityName',
      valueType: 'text',
    },
    {
      title: '活动ID',
      dataIndex: 'activityId',
      valueType: 'textarea',
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '运行中',
          status: 'Processing',
        },
        2: {
          text: '已上线',
          status: 'Success',
        },
        3: {
          text: '异常',
          status: 'Error',
        },
      },
    },
    {
      title: '开启时间',
      sorter: true,
      dataIndex: 'startTime',
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
      title: '结束时间',
      sorter: true,
      dataIndex: 'endTime',
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
          更新
        </Button>,
        <Button
          type={'primary'}
          color={'red'}
          onClick={() => {
            deleteActivity({ activityId: record.activityId });
            actionRef.current?.reload();
          }}
        >
          删除
        </Button>,

        <Button
          type={'primary'}
          color={'red'}
          onClick={() => {
            // deleteActivity({ activityId: record.activityId });
            // actionRef.current?.reload();
            setPublishModalVisible(true);
          }}
        >
          发布
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle={'活动管理'}
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
          const msg = await queryMallActivitiesUsingGET({
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
        title={'发布活动'}
        width="400px"
        visible={publishModalVisible}
        onVisibleChange={setPublishModalVisible}
        onFinish={async (value) => {
          console.log(value)
          const success = await publishLottery(value as API.LotteryActivityReq);
          if (success) {
            setPublishModalVisible(false);
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
          label={'活动id'}
        />
        <ProFormText width="md" label={'参与活动数量'} name="activityCount" />
        <ProFormText width="md" label={'每位用户参与次数'} name="userTakeAccount" />
        <ProForm.Group>
          <ProFormSelect
            options={[
              {
                value: 0,
                label: '全量概率抽奖',
              },
              {
                value: 1,
                label: '单向概率抽奖',
              },
            ]}
            width="md"
            name="strategy"
            label="抽奖策略"
          />
        </ProForm.Group>
      </ModalForm>
      <ModalForm
        title={'新建活动'}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await addActivityUsingPOST(value as API.AddMallActivityRequest);
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
          name="activityName"
          label={'活动名称'}
        />
        <ProFormTextArea width="md" label={'活动描述'} name="activityDesc" />
        <ProFormText width="md" label={'状态'} name="status" />
        <ProFormDatePicker name="startTime" label="开始时间" />
        <ProFormDatePicker name="endTime" label="结束时间" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          console.log(value);
          const success = await addActivityUsingPOST(value);

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
