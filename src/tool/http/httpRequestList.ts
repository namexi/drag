import Vue from 'vue'

export const clearHttpRequestingList = () => {
  if (Vue.prototype.$httpRequestList.length > 0) {
    Vue.prototype.$httpRequestList.forEach((item: any) => {
      item()
    })
    Vue.prototype.$httpRequestList = []
  }
}
