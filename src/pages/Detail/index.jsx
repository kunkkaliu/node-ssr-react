import React, { Fragment, useEffect, useState } from 'react';
import { netApi as api } from '../../../server/network';
import urlParams from '../../utils/params-util';
import './index.less';

const replaceDetail = (details) => {
    let texts = '';
    while (details.indexOf('<img') != -1) {
        texts += details.substring('0', details.indexOf('<img') + 4);
        details = details.substring(details.indexOf('<img') + 4);
        if (details.indexOf('src=') != -1 && details.indexOf('src=') < details.indexOf('>')) {
            texts += details.substring(0, details.indexOf('src="') + 5) + 'https://api.zudapang.ltd/hotnews/image?imgUrl=';
            details = details.substring(details.indexOf('src="') + 5);
        }
    }
    texts += details;
    return texts;
};

function Detail(props) {
    const [article, setArticle] = useState((props.ssrData && props.ssrData.article) || {});

    // 单页面通过路由跳转到本页或者node服务降级为前端渲染时获取初始数据
    useEffect(() => {
        if (props.ssrData || process.env.REACT_ENV === 'server') return;
        const articleId = urlParams(window.location.href, 'articleId');
        Detail.getInitialProps({
            articleId,
        }).then((data) => {
            setArticle(data.article);
        });
    }, []);

    return (
        <div className="container news_content">
            {
                (article.title && article.content) &&
                <Fragment>
                    <div className="t_newsinfo">{ article.title }</div>
                    <div className="news_part_father">
                        <div dangerouslySetInnerHTML={{ __html: article.content }} className="news_part" />
                    </div>
                </Fragment>
            }
            {(!article.title || !article.content) && <div className="no-tip">暂不支持该类型文章</div>}

        </div>
    );
}

Detail.getInitialProps = async (params) => {
    const res = await api.get('/hotnews/detail', {
        params,
    }).catch((err) => {});
    const resData = (res && res.data) || {};
    const article = {};
    if (resData.code === 0 && resData.data) {
        article.title = resData.data.title;
        article.content = replaceDetail(resData.data.content);
    }
    return {
        article,
    };
};

export default Detail;

