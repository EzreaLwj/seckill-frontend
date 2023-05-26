import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Avatar, Button, Card, message, Space } from 'antd';
import { history, useModel } from '@@/exports';
import { querySellMallGoodUsingGET } from '@/services/mall-activity/goodController';
import { placeOrderUsingPOST } from '@/services/mall-order/orderController';
import BuyFrom from '@/pages/Buy/compoents/BuyFrom';

const { Meta } = Card;

const TableList: React.FC = () => {
  const [sellGoodResponses, setSellGoodResponses] = useState<API.SellGoodResponse[]>([]);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const [currentRow, setCurrentRow] = useState<API.SellGoodResponse>();
  useEffect(() => {
    const loadLotteryActivities = async () => {
      const res = await querySellMallGoodUsingGET({
        pageNum: 1,
        pageSize: 20,
      });
      return res.data;
    };

    loadLotteryActivities().then((ret) => {
      return setSellGoodResponses(ret);
    });
  }, []);
  return (
    <>
      <PageContainer>
        <Space direction={'horizontal'} wrap={true}>
          {sellGoodResponses.map((sellGood) => {
            return (
              <Card
                key={sellGood.goodId}
                style={{ width: 300 }}
                cover={<img alt="example" src={sellGood.goodPic} />}
                actions={[
                  // eslint-disable-next-line react/jsx-key
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 12,
                      flex: 1,
                      gap: 8,
                    }}
                  >
                    <Button
                      type={'primary'}
                      onClick={() => {
                        handleUpdateModalVisible(true);
                        setCurrentRow(sellGood);
                      }}
                    >
                      购买商品
                    </Button>
                  </div>,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                  title={sellGood.goodName}
                  description={sellGood.goodDesc + ' 价格:' + sellGood.price}
                />
              </Card>
            );
          })}
        </Space>
      </PageContainer>
      <BuyFrom
        onSubmit={async (value) => {
          if ( value.goodCount == undefined||value.goodCount <= 0 ) {
            message.error('请输入有效的商品数量');
            return
          }

          const hide = message.info('下单进行中');
          const ret = await placeOrderUsingPOST({
            goodId: value.goodId,
            userId: initialState.loginUser.id,
            count: value.goodCount,
          });
          if (ret.data) {
            message.success('下单成功');
            history.push({
              pathname: `http://localhost:10010/pay/requestFrom?orderId=${ret.data.orderId}&totalPrice=${ret.data.totalPrice}&subject=${ret.data.goodName}`,
            });
            // 跳转到支付
          } else {
            message.info('下单失败');
          }
          hide();
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
    </>
  );
};

export default TableList;
