/**
 * Created by liudonghui on 2018/4/27.
 */
const Mock = require('mockjs');

const { Random } = Mock;
let id = 10000;

const getData = (params) => {
    id = 10000 + (params.pageNumber - 1) * params.pageSize;
    const data = Mock.mock({
        'code': 0,
        'data': {
            [`records|${params.pageSize}`]: [{
                'id|+1': id,
                'serviceName|1': ['XX精致洗车', 'XX贴心养车', 'XX半年延保', 'XX牛逼美容'],
                'remainTimes': () => Random.integer(1, 20),
                'status|1': [1, 2, 3],
                'serviceDesc|1': ['专业技师+水汽缓和水枪深度清洁', '专业技师+水汽缓和水枪深度清洁+专业技师+水汽缓和水枪深度清洁', '专业技师+水汽缓和水枪深度清洁+专业技师+水汽缓和水枪深度清洁+专业技师+水汽缓和水枪深度清洁'],
                'endDate': () => Random.date('yyyy.MM.dd'),
            }],
            'current_page': params.pageNumber,
            'total': 600,
        },
    });
    return data;
};

module.exports = getData;
