import axios from 'axios';

const serveUrl = {
    queryDoc: '/web/doc/query',
    listDoc: '/web/doc/list',
    createDoc:'/web/doc/create',
    createDir:'/web/doc/createdir',
    createDir:'/web/doc/watchdir'
  }


  const headers = {"Content-Type": 'application/json'};


  /**
 *  查询doc*(仅数据库)
 */
export function listDbDoc(param){
    return axios.get(serveUrl.listDoc+`?index=${param.index}&size=${param.size}`)
}

/**
 *  查询doc列表
 */
export function qureyDoc(param){
    return axios.get(serveUrl.queryDoc+`?query=${param.query}&field=${param.field}&index=${param.index}&size=${param.size}`)
}

/**
 *  创建doc(批量)
 */
export function createDoc(data){
    return axios({
        method: 'POST',
        headers: {"Accept": "*/*","Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'},
        url: serveUrl.createDoc,
        data: data
      })
}

/**
 *  遍历创建dir
 */
export function createDir(param){
    param.path = encodeURIComponent(param.path);
    return axios({
        method: 'POST',
        headers: {"Accept": "*/*","Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'},
        url: serveUrl.createDoc+`?path=${param.path}`
      })
}
