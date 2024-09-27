/*
 * @Author: zhangzhe 437050740@qq.com
 * @Date: 2022-10-15 17:50:22
 * @LastEditors: zhangzhe 437050740@qq.com
 * @LastEditTime: 2024-09-24 18:00:40
 * @FilePath: \smrjg:\web\luoditu\src\network\PageRequest.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import requests from "./request";

// 以下是get post以及传参的示例
// export const RequestBookCategory =()=> requests({url:'/book/bookCategory',method:'get'});
// export const RequestBookCategory =(params)=> requests({url:'/book/bookCategory',method:'get',params});
// export const RequestUserRuins =()=> requests({url:'/user/userRuins',method:'post'});
// export const RequestUserRuins =(params)=> requests({url:'/user/userRuins',method:'post',data:params});

//点位信息
export const RequestScenicId = (id) =>
    requests({ url: `/scenic/${id}`, method: "get" });

//概况列表
export const RequestIntroductionList = () =>
  requests({ url: "/introduction/list", method: "get" });

//概况子列表
export const RequestIntroductionType = (type) =>
    requests({ url: `/introductions/${type}`, method: "get" });

//概况详情
export const RequestIntroductionId = (id) =>
    requests({ url: `/introduction/${id}`, method: "get" });

