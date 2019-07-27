
import request from '../../../utils/request';

export function query({ page = 1 ,pagesize = 10}) {
    return request(`/api/users?_page=${page}&_limit=${pagesize}`);
}

export function queryByStr({ index = 1 ,pagesize = 10}) {
    return request(`/api/chain/querypage?querystr=""&index=${index}&pagesize=${pagesize}`);
}

export function queryById({chainid}) {
    return request(`/api/chain/querybyuuid?chainuuid=${chainid}`);
}

export function startchain({chainid}) {

    var options = {
        method: 'POST',
        body: chainid,
        headers: {
          "Content-Type": "application/json"
        }
    }
    return request(`/api/chain/startchain`,options);
}

export function stopchain({chainid}) {

    var options = {
        method: 'POST',
        body: chainid,
        headers: {
          "Content-Type": "application/json"
        }
    }
    return request(`/api/chain/stopchain`,options);
}


export function initchain({chainid}) {

    var options = {
        method: 'POST',
        body: chainid,
        headers: {
          "Content-Type": "application/json"
        }
    }
    return request(`/api/chain/initchain`,options);
}

export function delchain({chainid}) {

    var options = {
        method: 'POST',
        body: chainid,
        headers: {
          "Content-Type": "application/json"
        }
    }
    return request(`/api/chain/delchain`,options);
}