import axios from "axios"
import Session from "../SessionStorage/Session"

const api_url = process.env.REACT_APP_DEV_UMS_API

const getRequest = (suburl, query=null, token=null) => {
  let payload = {
    url: api_url + suburl,
    method: 'GET',
  }
  if (query) {
    payload['params'] = { ...query }
  }
  if (token) {
    payload['headers'] = {
      Authorization: `Bearer ${token}`
    }
  }
  return axios(payload)
}

const serialize = (obj) => {
  let str = []
  for (let k in obj) {
    str.push(k + '=' + String(obj[k]))
  }
  return str.join('&')
}

const postRequest = (suburl, params, query=null, auth=false) => {
  let new_form = new FormData()
  Object.keys(params).map(k => {
    new_form.append(k, params[k])
    return true
  })
  let payload = {
    url: api_url + suburl,
    method: 'POST',
    data: new_form
  }
  if (query) {
    payload['url'] = api_url + suburl + serialize(query)
  }
  if (auth) {
    const token = Session.token
    if (token) {
      payload['headers'] = {
        Authorization: `Bearer ${token}`
      }
    }
  }
  return axios(payload)
}

export {
  getRequest,
  postRequest
}
