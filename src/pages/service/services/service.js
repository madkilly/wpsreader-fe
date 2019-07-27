
import request from '../../../utils/request';

export function queryexpose({chainid}) {
    return request(`/api/chain/queryexpose?chainuuid=${chainid}`);
}
