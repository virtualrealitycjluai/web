/*
 * @Author: zhangzhe 437050740@qq.com
 * @Date: 2023-12-05 16:01:22
 * @LastEditors: zhangzhe 437050740@qq.com
 * @LastEditTime: 2023-12-06 16:38:38
 * @FilePath: \market\src\network\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//引入axios，进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//start:进度条开始 done：进度条结束
//引入进度条的样式
import "nprogress/nprogress.css";
const base = require('@/network/config');
const requests = axios.create({
  // 配置对象
  //基础路径，发送请求的时候，路径当中会出现api
  baseURL: `${base}/api/unity`,
  // baseURL: base,
  //代表请求超时的时间5秒
  timeout: 30000,
});
//请求拦截器，在发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  //config：配置对象，对象里面有一个属性很重要，headers请求头
  //进度条开始动
  nprogress.start();
  return config;
});
//响应拦截器
requests.interceptors.response.use(
  (res) => {
    //成功的回调函数，服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    nprogress.done();
    return res.data;
  },
  (error) => {
    //响应失败的回调函数
    return error;
  }
);
export default requests;
