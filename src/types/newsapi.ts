export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export enum HttpMethod {
    GET = 'GET',
}

export type ResponseStatus = 'ok' | 'error';

export interface ISource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface IArticleSource {
    id: string | null;
    name: string;
}

export interface IArticle {
    source: IArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface ISourcesResponse {
    status: ResponseStatus;
    sources: ISource[];
}

export interface IEverythingResponse {
    status: ResponseStatus;
    totalResults: number;
    articles: IArticle[];
}

export type NewsCallback<T> = (data: T) => void;

export type RequestOptions = Record<string, string>;

export interface IGetRespOptions {
    endpoint: Endpoint;
    options?: Partial<RequestOptions>;
}

export type SourcePreview = Readonly<Pick<ISource, 'id' | 'name'>>;

export type ArticlePreview = Readonly<
    Pick<IArticle, 'author' | 'title' | 'description' | 'url' | 'urlToImage' | 'publishedAt' | 'source'>
>;
