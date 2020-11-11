/**
 * Created by liudonghui on 2018/4/25.
 */
export default (url, name) => {
  url = url.replace(/&amp;/g, '&');
  let startIndex = url.indexOf('#');
  let returnObject = {};
  if (url.indexOf('?') > -1 && startIndex > -1) {
    startIndex = Math.min(url.indexOf('?'), url.indexOf('#'));
  } else if (url.indexOf('?') > -1) {
    startIndex = url.indexOf('?');
  }

  if (startIndex > -1) {
    url = url.substring(startIndex + 1);
    url = url.replace(/#/g, '&');
    let params = url.split('&');
    for (let i = 0,
      len = params.length,
      pname = null,
      pvalue = null; i < len; i++) {
      pname = params[i].split('=')[0].toLowerCase();
      pvalue = params[i].substring(params[i].indexOf('=') + 1);
      pname = pname.indexOf('%u') > -1 ? unescape(pname) : pname;
      pvalue = pvalue.indexOf('%u') > -1 ? unescape(pvalue) : pvalue;
      returnObject[pname] = pvalue;
    }
    returnObject.hasUrlParams = '1';
  }
  if (name) {
    return returnObject && returnObject[name];
  }
  return returnObject;
};
