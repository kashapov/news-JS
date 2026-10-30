import AppLoader from './appLoader';
import { Endpoint, IEverythingResponse, ISourcesResponse, NewsCallback } from '../../types/newsapi';

class AppController extends AppLoader {
    public getSources(callback: NewsCallback<ISourcesResponse>): void {
        super.getResp<ISourcesResponse>(
            {
                endpoint: Endpoint.Sources,
            },
            callback
        );
    }

    public getNews(e: Event, callback: NewsCallback<IEverythingResponse>): void {
        let target = e.target as HTMLElement | null;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<IEverythingResponse>(
                        {
                            endpoint: Endpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;
