import { fromJson } from 'models/parser'
import { tryCatch } from 'models/trycatch'

export const ApiURL =
  process.env.NODE_ENV === 'develop'
    ? 'http://localhost:8000/v1'
    : 'https://api.salt.et/v1'

const getToken = () => {
  return localStorage.getItem('token')
}

const _headers = { 'Content-Type': 'application/json', Authorization: '' }

interface IApiError {
  message: string
  validation?: Record<string, any>
}

interface IApiStatus {
  code: number
  description: string
}

export type Reviver = (data: Record<string, any>) => any
export interface IApiResponse<T> {
  response: T
  error?: IApiError
  status?: IApiStatus
}

const parseResponse = async <T>(response: Response, reviver?: Reviver) => {
  const data = await response.json()
  const parsed = fromJson<IApiResponse<T>>(data, reviver)

  if (!parsed) {
    throw 'Unable to parse value'
  }

  if (!response.ok) {
    throw parsed
  }
  return parsed
}

const createRequest = async <T>(
  method: string,
  endpoint: string,
  body: any,
  reviver?: Reviver,
  controller?: AbortController,
) => {
  // 10 seconds
  const timeout = 10 * 1000

  controller ??= new AbortController()

  const timeoutId = setTimeout(() => controller.abort('timeout'), timeout)

  let payload: Record<string, any> = {
    headers: _headers,
    method: method,
    mode: 'cors', // Enable CORS
    redirect: 'follow',
    credentials: 'include',
    signal: controller.signal,
  }

  if (getToken()) {
    payload.headers.Authorization = `Bearer ${getToken()}`
  }

  if (method === 'POST') {
    payload['body'] = JSON.stringify(body)
  }

  const result = await tryCatch(fetch(ApiURL.concat(endpoint), payload))

  clearTimeout(timeoutId)

  if (result.error !== null) {
    console.log(result.error.message)
    if (
      result.error?.message?.toLowerCase() === 'failed to fetch' ||
      result.error.message === 'timeout'
    ) {
      result.error = new Error('Connection timed out, please try again')
    }

    return result
  }

  return await tryCatch(parseResponse<T>(result.data, reviver))

  // try {
  //   const response = await ;
  //
  //   clearTimeout(timeoutId);
  //
  //   return parseResponse<T>(response);
  // } catch (error: any) {
  //
  //   if (
  //     error?.message?.toLowerCase() === 'failed to fetch' ||
  //     error === 'timeout'
  //   ) {
  //     throw {
  //       error: {
  //         message: 'Connection timed out, please try again'
  //       },
  //       status: {
  //         code: 522,
  //         description: 'Connection Timed Out'
  //       }
  //     };
  //   }
  //   throw {
  //     error: {
  //       message: `Oops! Something went wrong ${error}`
  //     },
  //     status: {
  //       code: 500,
  //       description: 'Internal Server Error'
  //     }
  //   };
  // }
}

export const post = <T>(
  endpoint: string,
  body: Record<string, any>,
  reviver?: Reviver,
) => {
  return createRequest<T>('POST', endpoint, body, reviver)
}

export const get = <T>(
  endpoint: string,
  reviver?: Reviver,
  controller?: AbortController,
) => {
  return createRequest<T>('GET', endpoint, null, reviver, controller)
}

export const put = <T>(endpoint: string, reviver?: Reviver) => {
  return createRequest<T>('PUT', endpoint, null, reviver)
}
