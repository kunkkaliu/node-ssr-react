import React, { Fragment } from 'react';
import './index.less';

export default function Detail(props) {
    const { title = '', content = '' } = props;

    return (
        <div className="container news_content">
            {
                (title && content) &&
                <Fragment>
                    <div className="t_newsinfo">{ title }</div>
                    <div className="news_part_father">
                        <div dangerouslySetInnerHTML={{ __html: content }} className="news_part" />
                    </div>
                </Fragment>
            }
            {(!title || !content) && <div className="no-tip">暂不支持该类型文章</div>}

        </div>
    );
}
