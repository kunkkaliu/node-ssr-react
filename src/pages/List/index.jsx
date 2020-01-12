import React, { useState, useEffect, useRef } from 'react';
import MiniRefreshTools from '../../utils/mini-refresh';
import { netApi as api } from '../../../server/network';
import globalConfig from '../../globalConfig';
import './index.less';

export default function List(props) {
    const [records, setRecords] = useState(props.records || []);
    const [pageNum, setPageNum] = useState(props.pageNum || 1);
    const conRef = useRef(null);
    const refreshRef = useRef(null);
    const fetchRef = useRef(null);

    useEffect(() => {
        fetchRef.current = async (num) => {
            const curNum = num || pageNum;
            const res = await api.get('/hotnews/list', {
                params: {
                    pageNum: curNum,
                },
            }).catch((err) => {
                refreshRef.current.endDownLoading(true);
                refreshRef.current.endUpLoading(false);
            });
            const resData = res.data || {};
            if (resData.code === 0) {
                let contentItemList = records;
                const list = resData.data || [];
                const hasMore = list.length > 0;
                if (hasMore) {
                    refreshRef.current.endUpLoading(false);
                } else {
                    refreshRef.current.endUpLoading(true);
                }
                if (curNum === 1) {
                    contentItemList = [];
                    refreshRef.current.endDownLoading(true);
                }
                setRecords(contentItemList.concat(list));
                setPageNum(hasMore ? curNum + 1 : curNum);
            } else {
                refreshRef.current.endDownLoading(true);
                refreshRef.current.endUpLoading(false);
            }
        };
    }, [pageNum, records]);

    useEffect(() => {
        const MiniRefresh = MiniRefreshTools.theme.defaults;
        refreshRef.current = new MiniRefresh({
            container: conRef.current,
            isScrollBar: true,
            down: {
                isAuto: false,
                callback: () => {
                    fetchRef.current(1);
                },
            },
            up: {
                isAuto: false,
                callback: () => {
                    fetchRef.current();
                },
            },
        });
    }, []);

    const articleItems = records.map(item => (
        <div className="list-item" key={item.id} >
            <div className="item-img">
                <img src={`${globalConfig.apiHost}/hotnews/image?imgUrl=https:${item.image}`} />
            </div>
            <div className="item-intro">
                <div data-articleid="{{item.id}}">
                    <a href={`/detail?articleId=${item.id}`}><span className="item-title">{item.title}</span></a>
                </div>
                <div>
                    <span className="item-source">{item.author} | {item.time}</span>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="container minirefresh-wrap" ref={conRef}>
            <div className="minirefresh-scroll">
                <div className="list-items-wrap">
                    {articleItems}
                </div>
            </div>
        </div>
    );
}
