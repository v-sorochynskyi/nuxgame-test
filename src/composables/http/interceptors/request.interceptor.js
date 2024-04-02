
const requestInterceptor = (requestConfig) => {
  return requestConfig
}

const requestErrorInterceptor = (error) => {
  return Promise.reject(error)
}

export {
  requestInterceptor,
  requestErrorInterceptor
}
