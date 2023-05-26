import React, {useEffect, useState} from 'react';
import { PageContainer } from '@ant-design/pro-components';
import {Card, Space, Button, message} from 'antd';
import {queryLotteryActivityUsingGET, drawLotteryUsingPOST} from "@/services/mall-activity/lotteryController";
import {useModel} from "@@/exports";


const { Meta } = Card;

const TableList: React.FC = () => {
  const [lotteryActivities, setLotteryActivities] = useState<API.LotteryActivityResp[]>([])
  const { initialState, setInitialState } = useModel('@@initialState');
  useEffect(() => {
      const loadLotteryActivities = async () =>{
        const res = await queryLotteryActivityUsingGET({
          pageNum:1,
          pageSize: 20
        })
        return res.data
      }

      loadLotteryActivities().then((ret) =>{
        return setLotteryActivities(ret);
      })
  }, [])
  return (
    <>
      <PageContainer>
        <Space direction={"horizontal"} wrap={true}>
          {
            lotteryActivities.map((activityResp) => {
              return (
                <Card
                  key={activityResp.activityId}
                  style={{ width: 300 }}
                  cover={
                    <img
                      alt="example"
                      src={activityResp.activityPic}
                    />
                  }
                  actions={[
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
                        type={"primary"}
                        onClick={ async () => {
                          // console.log(initialState.loginUser.id)
                          const ret = await drawLotteryUsingPOST({
                            activityId: activityResp.activityId,
                            userId: initialState.loginUser.id
                          })
                          const hide = message.info('抽奖中')
                          if (ret.data) {
                            message.success('抽奖成功')
                          } else {
                            message.info('您未中奖')
                          }
                          hide()
                        }}
                      >参与活动抽奖</Button>
                    </div>

                  ]}

                >
                  <Meta
                    // avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                    title= {activityResp.activityName}
                    description={activityResp.activityDesc}
                  />
                </Card>
              )
            })
          }

        </Space>
      </PageContainer>
    </>
  );
};

export default TableList;
