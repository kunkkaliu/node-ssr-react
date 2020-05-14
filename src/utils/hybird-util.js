/**
 * Created by liudonghui on 2018/4/25.
 */
const hybirdObj = {};

if (process.env.RUN_ENV === 'client') {
    Object.assign(hybirdObj, {
        isApp: /ios|android/i.test(window.navigator.userAgent),
    });
}

export default hybirdObj;
