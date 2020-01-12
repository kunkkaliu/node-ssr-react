/**
 * Created by liudonghui on 2018/6/11.
 */
let apiHost = 'https://zudapang.ltd/api';
let apiServerHost = 'https://zudapang.ltd/api';

if (process.env.CODE_ENV === 'qa') {
    apiHost = 'https://zudapang.ltd/api';
    apiServerHost = 'https://zudapang.ltd/api';
} else if (process.env.CODE_ENV === 'online') {
    apiHost = 'https://zudapang.ltd/api';
    apiServerHost = 'https://zudapang.ltd/api';
}

export default {
    apiHost,
    apiServerHost,
};
