import { Endpoint, HttpMethod, IGetRespOptions, NewsCallback, RequestOptions } from '../../types/newsapi';

class Loader {
    private baseLink: string;
    private options: Readonly<RequestOptions>;

    constructor(baseLink: string, options: RequestOptions = {}) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: IGetRespOptions,
        callback: NewsCallback<T> = (() => {
            console.error('No callback for GET response');
        }) as NewsCallback<T>
    ): void {
        this.load<T>(HttpMethod.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Partial<RequestOptions>, endpoint: Endpoint): string {
        const urlOptions = { ...this.options, ...options } as RequestOptions;
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: HttpMethod,
        endpoint: Endpoint,
        callback: NewsCallback<T>,
        options: Partial<RequestOptions> = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response) => this.errorHandler(res))
            .then((res: Response) => res.json() as Promise<T>)
            .then((data: T) => callback(data))
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
