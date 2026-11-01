import './news.css';
import { ArticlePreview } from '../../../types/newsapi';

class News {
    private static readonly MAX_ITEMS = 10;
    private static readonly PLACEHOLDER_IMAGE = 'img/news_placeholder.jpg';
    private static readonly SKELETON_COUNT = 3;

    public draw(data: ReadonlyArray<ArticlePreview>): void {
        const news = data.length >= News.MAX_ITEMS ? data.filter((_item, idx) => idx < News.MAX_ITEMS) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement | null;

        if (!newsItemTemp) {
            return;
        }

        news.forEach((item: ArticlePreview, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            this.fillArticle(newsClone, item, idx);
            fragment.append(newsClone);
        });

        this.replaceContent(fragment);
    }

    public drawSkeleton(): void {
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < News.SKELETON_COUNT; i += 1) {
            fragment.append(this.createSkeletonCard());
        }

        this.replaceContent(fragment);
    }

    private createSkeletonCard(): HTMLElement {
        const card = document.createElement('div');
        card.className = 'news-skeleton';
        card.setAttribute('aria-hidden', 'true');

        const photo = document.createElement('div');
        photo.className = 'news-skeleton__photo shimmer';

        const body = document.createElement('div');
        body.className = 'news-skeleton__body';

        const lineClasses = [
            'news-skeleton__line news-skeleton__line--title shimmer',
            'news-skeleton__line news-skeleton__line--source shimmer',
            'news-skeleton__line news-skeleton__line--text shimmer',
            'news-skeleton__line news-skeleton__line--text shimmer',
        ];

        lineClasses.forEach((className: string) => {
            const line = document.createElement('div');
            line.className = className;
            body.append(line);
        });

        card.append(photo, body);
        return card;
    }

    public drawMessage(text: string): void {
        const message = document.createElement('p');
        message.className = 'state-message';
        message.textContent = text;
        this.replaceContent(message);
    }

    private replaceContent(content: Node): void {
        const newsContainer = document.querySelector('.news');
        if (!newsContainer) {
            return;
        }

        newsContainer.innerHTML = '';
        newsContainer.append(content);
    }

    private fillArticle(newsClone: DocumentFragment, item: ArticlePreview, idx: number): void {
        if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

        const photo = newsClone.querySelector('.news__meta-photo') as HTMLElement | null;
        if (photo) {
            photo.style.backgroundImage = `url(${item.urlToImage || News.PLACEHOLDER_IMAGE})`;
        }

        const author = newsClone.querySelector('.news__meta-author');
        if (author) {
            author.textContent = item.author || item.source.name;
        }

        const date = newsClone.querySelector('.news__meta-date');
        if (date) {
            date.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
        }

        const title = newsClone.querySelector('.news__description-title');
        if (title) title.textContent = item.title;

        const sourceEl = newsClone.querySelector('.news__description-source');
        if (sourceEl) sourceEl.textContent = item.source.name;

        const content = newsClone.querySelector('.news__description-content');
        if (content) content.textContent = item.description || '';

        const link = newsClone.querySelector('.news__read-more a');
        if (link) {
            link.setAttribute('href', item.url);
        }
    }
}

export default News;
