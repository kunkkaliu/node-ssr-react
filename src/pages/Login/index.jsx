import React, { Fragment } from 'react';
import NativeApi from '../../utils/native-api';
import hybirdObj from '../../utils/hybird-util';

export default class Login extends React.Component {
    componentDidMount() {
        // 如果是内嵌在App中就唤起App的原生登录页面
        if (hybirdObj.isApp) {
            NativeApi.invoke && NativeApi.invoke('login', null, (result) => {
                console.log(result);
            });
        }
    }

    render() {
        let content = <div>未实现的登录页面</div>;
        return (
            <Fragment>{content}</Fragment>
        );
    }
}
