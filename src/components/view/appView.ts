import News from './news/news';
import Sources from './sources/sources';
import { IEverythingResponse, ISourcesResponse } from '../../types/newsapi';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public showSourcesLoading(): void {
        this.sources.drawSkeleton();
    }

    public showNewsLoading(): void {
        this.news.drawSkeleton();
    }

    public showNewsIdle(): void {
        this.news.drawMessage('Pick a source to see headlines');
    }

    public drawNews(data: Partial<IEverythingResponse>): void {
        const values = data?.articles ? data.articles : [];
        if (values.length === 0) {
            this.news.drawMessage('No articles for this source');
            return;
        }
        this.news.draw(values);
    }

    public drawSources(data: Partial<ISourcesResponse>): void {
        const values = data?.sources ? data.sources : [];
        if (values.length === 0) {
            this.sources.drawMessage('No sources available');
            return;
        }
        this.sources.draw(values);
    }
}

export default AppView;
