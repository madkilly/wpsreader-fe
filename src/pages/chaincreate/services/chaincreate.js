import request from '../../../utils/request';


export function create(chainbody) {

    var options = {
        method: 'POST',
        body: JSON.stringify(chainbody),
        headers: {
          "Content-Type": "application/json"
        }
    }
    return request(`/api/chain/createchain`,options);
}