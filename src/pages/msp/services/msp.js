
import request from '../../../utils/request';

export function query() {
    return request(`/api/msp/query`);
}

//根据Id查询联盟
export function queryLeagueById(id, values){
    return request(`/api/msp/league/${id}`, {
        method : 'queryLeagueById',
        body : JSON.stringify(values)
    });
}

// export function queryByStr({ index = 1 ,pagesize = 10}) {
//     return request(`/api/chain/querypage?querystr=""&index=${index}&pagesize=${pagesize}`);
// }

// export function queryById({chainid}) {
//     return request(`/api/chain/querybyuuid?chainuuid=${chainid}`);
// }

// export function startchain({chainid}) {

//     var options = {
//         method: 'POST',
//         body: chainid,
//         headers: {
//           "Content-Type": "application/json"
//         }
//     }
//     return request(`/api/chain/startchain`,options);
// }

// export function stopchain({chainid}) {

//     var options = {
//         method: 'POST',
//         body: chainid,
//         headers: {
//           "Content-Type": "application/json"
//         }
//     }
//     return request(`/api/chain/stopchain`,options);
// }


// export function initchain({chainid}) {

//     var options = {
//         method: 'POST',
//         body: chainid,
//         headers: {
//           "Content-Type": "application/json"
//         }
//     }
//     return request(`/api/chain/initchain`,options);
// }