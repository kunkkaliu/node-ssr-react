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

    useEffect(() => {
        const storageRecords = localStorage.getItem('hotnews_records_key');
        const storagePage = localStorage.getItem('hotnews_page_key');
        const storageScrollTop = localStorage.getItem('hotnews_scrolltop_key');

        if (storageScrollTop && storageRecords) {
            setRecords(JSON.parse(records));
            // eslint-disable-next-line radix
            setPageNum(parseInt(storagePage));
        }
        setTimeout(() => {
            // eslint-disable-next-line radix
            refreshRef.current.scrollTo(parseInt(storageScrollTop), 1000);
            localStorage.removeItem('hotnews_scrolltop_key');
        }, 100);
    }, []);

    function goToDetail(id) {
        localStorage.setItem('hotnews_records_key', JSON.stringify(records));
        localStorage.setItem('hotnews_page_key', pageNum);
        localStorage.setItem('hotnews_scrolltop_key', document.documentElement.scrollTop);
        window.location.href = `/detail?articleId=${id}`;
    }

    const articleItems = records.map(item => (
        <div className="list-item" key={item.id} >
            <div className="item-img">
                <img src={`${globalConfig.apiHost}/hotnews/image?imgUrl=https:${item.image}`} />
            </div>
            <div className="item-intro">
                <div data-articleid="{{item.id}}">
                    <a onClick={ () => { goToDetail(item.id); }}><span className="item-title">{item.title}</span></a>
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
