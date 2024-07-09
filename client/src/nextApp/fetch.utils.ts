import envConfig from '@/nextApp/config'

//   const result = await fetch(
//     `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
//     {
//       body: JSON.stringify(values),
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       method: 'POST'
//     }
//   ).then((res) => res.json())
// }
class NativeFetch {
  constructor(
    public header = {
      'Content-Type': 'application/json'
    },
    public URL = envConfig.NEXT_PUBLIC_API_ENDPOINT
  ) {}

  rawPost<V, T>(url: string, payload: T) {
    return fetch(`${this.URL}${url}`, {
      body: JSON.stringify(payload),
      headers: this.header,
      method: 'POST'
    })
  }

  post<V, T>(url: string, payload: T) {
    return this.rawPost(url, payload).then(res => res.json() as V)
  }

  // Vấn đề logic gọi
  advPost<V, T = unknown>(url: string, payload: T) {
    return this.rawPost(url, payload).then(async res => {
      const resJson = (await res.json()) as V
      return [resJson, res] as const
    })
  }
}

export const nativeFetch = new NativeFetch()
