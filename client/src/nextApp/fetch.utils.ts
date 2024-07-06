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

  post<T, V>(url: string, payload: T) {
    return fetch(`${URL}/${url}`, {
      body: JSON.stringify(payload),
      headers: this.header,
      method: 'POST'
    }).then(res => res.json() as V)
  }
}

export const nativeFetch = new NativeFetch()
