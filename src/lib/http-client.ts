import axios, { AxiosInstance, AxiosResponse } from 'axios'

export class HttpClient {
  private axiosInstance: AxiosInstance
  private readonly withCredentials: boolean = false
  private readonly url: string

  constructor(apiUrl: string, withCredentials: boolean) {
    this.url = apiUrl
    this.withCredentials = withCredentials
    this.axiosInstance = axios.create({
      baseURL: apiUrl,
    })
  }

  public static create(apiUrl: string, withCredentials: boolean = false): HttpClient {
    return new HttpClient(apiUrl, withCredentials)
  }

  public async get<T>({ params = {}, headers = {} } = {}): Promise<T> {
    const { data }: AxiosResponse = await this.axiosInstance.get(this.url, {
      params,
      headers,
      withCredentials: this.withCredentials,
    })

    return data
  }
}
