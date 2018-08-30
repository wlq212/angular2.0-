/**
 * Created by wangliqiang on 2017/10/10.
 */
/**
 * Created by wangliqiang on 2017/10/10.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {BaseService} from "../../services/base.service";
import {CacheService} from "../../services/cache.service";

@Injectable()
export class UserInfoService extends BaseService{

  constructor(http: Http, private cacheService: CacheService) {
    super(http)
  }

  /**
   * 获取用户信息（actually , this is the weixinFans infomation）
   *
   * @returns {Promise<any>}
   */
  getUserInfo():Promise<any>{
    let userInfo = this.cacheService.getCustomer()
    if(userInfo){
      return Promise.resolve(userInfo)
    }else {
      let userInfoPromise = this.get(`/weixinfans`);
      userInfoPromise.then((userInfo: any) => {
        this.cacheService.setCustomer(userInfo)
      })
      return userInfoPromise
    }
  }

  /**
   * 更新用户信息
   *
   * @param orderId
   * @param params
   * @returns {Promise<any>}
   */
  updateUserInfo(params):Promise<any>{
    let url = "/weixinfans/actions/binding"
    let body = JSON.stringify(params)
    return this.post(url,body)
  }



  /**
   * 更新用户信息
   *
   * @param orderId
   * @param params
   * @returns {Promise<any>}
   */
  bindingByMobile(params):Promise<any>{
    let url = "/weixinfans/actions/bindingByMobile"
    let body = JSON.stringify(params)
    return this.post(url,body)
  }
  /**
   * 获取验证码
   *
   * @param mobile
   * @returns {Promise<any>}
   */
  getCodeByMobile(mobile):Promise<any>{
    let url = "/weixinfans/codes/" + mobile
    return this.get(url)
  }

}
