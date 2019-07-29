import axios from 'axios';

const serveUrl = {
    systemstate: '/web/doc/systemstate',
    truncate: '/web/doc/truncate',
    getDoc: '/web/doc/detail',
    queryDoc: '/web/doc/query',
    listDoc: '/web/doc/list',
    createDoc:'/web/doc/create',
    createDir:'/web/doc/createbydir',
    watchDir:'/web/doc/watch',
    reset:'/web/doc/reset',
    deldoclist:'/web/doc/del'
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
        url: serveUrl.createDir+`?path=${param.path}`
      })
}


/**
 *  监视文件夹dir
 */
export function watchDir(param){
    param.path = encodeURIComponent(param.path);
    return axios({
        method: 'POST',
        headers: {"Accept": "*/*","Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'},
        url: serveUrl.watchDir+`?path=${param.path}`
      })
}


/**
 *  监视文件夹dir
 */
export function reset(){
    return axios({
        method: 'POST',
        headers: {"Accept": "*/*","Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'},
        url: serveUrl.reset
      })
}


/**
 *  获得文件详细内容
 */
export function getDoc(param){
    return axios({
        method: 'GET',
        headers: {"Accept": "*/*","Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'},
        url: serveUrl.getDoc+`?docid=${param.id}`
      })
}

/**
 *  获得文件详细内容
 */
export function truncate(){
    return axios({
        method: 'POST',
        headers: {"Accept": "*/*","Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'},
        url: serveUrl.truncate
      })
}


/**
 *  删除文件列表
 */
export function deldoclist(param){
    return axios({
        method: 'DELETE',
        headers: {"Accept": "*/*","Content-Type": 'application/json; charset=UTF-8'},
        url: serveUrl.deldoclist,
        data: JSON.stringify(param)
      })
}


/**
 *  获得文件详细内容
 */
export function getSystemState(){
    return axios({
        method: 'GET',
        headers: {"Accept": "*/*","Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'},
        url: serveUrl.systemstate
      })
}
