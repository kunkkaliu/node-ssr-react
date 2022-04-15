/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import NativeApi from '../../utils/native-api';
import hybirdObj from '../../utils/hybird-util';

export default function Login() {
	useEffect(() => {
		if (hybirdObj.isApp) {
			NativeApi.invoke && NativeApi.invoke('login', null, () => {});
		}
	}, []);

	return (
		<><div>未实现的登录页面</div></>
	);
}
