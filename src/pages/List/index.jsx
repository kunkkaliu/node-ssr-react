import React, { useState, useEffect, useRef, useCallback } from 'react';
import MiniRefreshTools from '../../utils/mini-refresh';
import { netApi as api } from '../../../server/network';
import localStorageFix from '../../utils/localStorage';
import globalConfig from '../../globalConfig';
import Footer from '../../components/Footer';
import './index.less';

function List(props) {
  const [records, setRecords] = useState((props.ssrData && props.ssrData.records) || []);
  const [pageNum, setPageNum] = useState((props.ssrData && props.ssrData.pageNum) || 1);
  const conRef = useRef(null);
  const refreshRef = useRef(null);
  const fetchRef = useRef(null);

  const mergeRecords = useCallback((oldRecords, newRecords) => {
    const result = [];
    for (let i = 0; i < oldRecords.length; i++) {
      result.push(oldRecords[i]);
    }
    for (let i = 0; i < newRecords.length; i++) {
      let flag = false;
      for (let j = 0; j < oldRecords.length; j++) {
        if (newRecords[i].id === oldRecords[j].id) {
          flag = true;
          break;
        }
      }
      if (!flag) result.push(newRecords[i]);
    }
    return result;
  }, []);

  // 单页面通过路由跳转到本页或者node服务降级为前端渲染时获取初始数据
  useEffect(() => {
    if (props.ssrData || process.env.RUN_ENV === 'server') return;
    List.getInitialProps({
      pageNum: 1,
    }).then((data) => {
      setRecords(data.records);
      setPageNum(1);
    });
  }, []);

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
      const resData = (res && res.data) || {};
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
        setRecords(mergeRecords(contentItemList, list));
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
        offset: 100,
        dampRateBegin: 0.5,
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
    const storageRecords = localStorageFix.getItem('hotnews_records_key');
    const storagePageNum = localStorageFix.getItem('hotnews_pagenum_key');
    const storageScrollTop = localStorageFix.getItem('hotnews_scrolltop_key');

    if (storageScrollTop && storageRecords) {
      setRecords(mergeRecords(records, JSON.parse(storageRecords)));
      // eslint-disable-next-line radix
      setPageNum(parseInt(storagePageNum));
      setTimeout(() => {
        // eslint-disable-next-line radix
        refreshRef.current.scrollTo(parseInt(storageScrollTop), 0);
        localStorageFix.removeItem('hotnews_scrolltop_key');
      }, 0);
    }
  }, []);

  function goToDetail(id) {
    localStorageFix.setItem('hotnews_records_key', JSON.stringify(records));
    localStorageFix.setItem('hotnews_pagenum_key', pageNum);
    localStorageFix.setItem('hotnews_scrolltop_key', refreshRef.current.getPosition());
    window.location.href = `/detail?articleId=${id}`;
  }

  const articleItems = records.map((item) => (
    <div className="list-item" key={item.id} >
      <div className="item-img">
        <img src={`${globalConfig.apiHost}/hotnews/image?imgUrl=https:${item.image}`} />
      </div>
      <div className="item-intro">
        <div data-articleid="{{item.id}}">
          <a role="button" onClick={() => { goToDetail(item.id); }}><span className="item-title">{item.title}</span></a>
        </div>
        <div>
          <span className="item-source">{item.author} | {item.time}</span>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <div className="container minirefresh-wrap" ref={conRef}>
        <div className="minirefresh-scroll">
          <div className="list-items-wrap">
            {articleItems}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

List.getInitialProps = async (params) => {
  const res = await api.get('/hotnews/list', {
    params,
  }).catch((err) => { });
  const resData = (res && res.data) || {};
  let records = [];
  if (resData.code === 0) records = resData.data || [];
  return {
    records,
  };
};

export default List;
