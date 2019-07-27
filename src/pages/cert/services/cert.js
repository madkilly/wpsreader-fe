
import request from '../../../utils/request';

export function initchain({chainid}) {

    var options = {
        method: 'POST',
        body: JSON.stringify(chainid),
        headers: {
          "Content-Type": "application/json"
        }
    }
    return request(`/api/chain/initchain`,options);
}