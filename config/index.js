export default {
  development:{
    baseUrl:'/api',
    ver:'0.0.1',
    state:'dev',
    uploadImgServer:'http://backend-api-02.newbee.ltd/manage-api/v1/upload/file'
  },
  beta: {
    baseUrl: '//backend-api-02.newbee.ltd/manage-api/v1', // 测试接口域名
    ver:'0.0.1',
    state:'bate'
  },
  release: {
    baseUrl: '//backend-api-02.newbee.ltd/manage-api/v1', // 正式接口域名
    ver:'0.0.1',
    state:'live'
  }
}