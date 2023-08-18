import { Context } from 'koa'

import { RESULT_ERROR, RESULT_SUCCESS } from "../apis"
import homepage from "../apis/homepage"
import unLockDevice from '../apis/deviceLock'
import parameter from '../apis/parameter'
import network from '../apis/network'
import nodeDiagnosis from '../apis/nodeDiagnosis'
import upgrade from '../apis/upgrade'
import manage from '../apis/manage'


interface ReqBody {
  name: string;
  action: "post" | "get",
  value?: object | string
}

export default async (ctx: Context) => {
  console.log(JSON.stringify(ctx.request.body, null, 4));
  const files = ctx.request.files?.file

  if (files) {
    if (Array.isArray(files)) {
      files.forEach(file => {
        console.log(file);
      })
    } else {
      await sleep(5000)

      ctx.body = RESULT_SUCCESS
    }
  } else {
    const { name, action, value } = ctx.request.body || {}

    if (name && action) {
      // 查找接口
      const result = await parseReq([
        homepage, // 首页
        unLockDevice, // 解锁
        parameter,  // 参数设置
        network,    // 网络状态
        nodeDiagnosis,  // 节点诊断
        upgrade,    // 固件更新
        manage,     // 系统管理
      ], { name, action, value })
      ctx.body = result
    } else {
      ctx.body = RESULT_ERROR
    }
  }

}


function parseReq(objArr: any[], body: ReqBody) {
  return new Promise((resolve) => {
    try {
      const { name, action, value } = body

      objArr.forEach(obj => {
        const result = value ? obj?.[name]?.[action](value) : obj?.[name]?.[action]()

        if (result) {
          resolve(result)
        }
      })
      resolve(RESULT_ERROR)
    } catch (error) {
      resolve(RESULT_ERROR)
    }
  })

}

function sleep(delay = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(delay)
    }, delay);
  })
}