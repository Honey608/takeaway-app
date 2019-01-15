/*
    解析url字符串
    example ?id=1234&name=dinging
    return Object {id:1234,name:dingding}
*/
export function urlParse () {
  let url = window.location.search
  let obj = {}
  let urlobj = url.slice(1).split('&')
  urlobj.forEach((item) => {
    let brr = item.split('=')
    obj[brr[0]] = brr[1]
  })
  return obj
}
