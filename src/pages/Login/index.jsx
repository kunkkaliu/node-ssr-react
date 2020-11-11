import React, { Fragment, useEffect } from 'react';
import NativeApi from '../../utils/native-api';
import hybirdObj from '../../utils/hybird-util';

export default function Login() {
  useEffect(() => {
    if (hybirdObj.isApp) {
      NativeApi.invoke && NativeApi.invoke('login', null, (result) => {
        console.log(result);
      });
    }
  }, []);

  return (
    <Fragment><div>未实现的登录页面</div></Fragment>
  );
}
