/**
 * Created by liudonghui on 2018/6/11.
 */
let apiHost = 'https://api.zudapang.ltd';
let apiServerHost = 'https://api.zudapang.ltd';

if (process.env.CODE_ENV === 'qa') {
  apiHost = 'https://api.zudapang.ltd';
  apiServerHost = 'https://api.zudapang.ltd';
} else if (process.env.CODE_ENV === 'online') {
  apiHost = 'https://api.zudapang.ltd';
  apiServerHost = 'https://api.zudapang.ltd';
}

export default {
  apiHost,
  apiServerHost,
};
