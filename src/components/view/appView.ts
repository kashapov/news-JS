import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: unknown): void {
        const payload = data as { articles?: Array<Record<string, unknown>> } | null | undefined;
        const values = payload?.articles ? payload.articles : [];
        this.news.draw(values);
    }

    drawSources(data: unknown): void {
        const payload = data as { sources?: Array<Record<string, unknown>> } | null | undefined;
        const values = payload?.sources ? payload.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
