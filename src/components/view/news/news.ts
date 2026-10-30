import './news.css';
import { ArticlePreview } from '../../../types/newsapi';

class News {
    draw(data: ArticlePreview[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement | null;

        if (!newsItemTemp) {
            return;
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const photo = newsClone.querySelector('.news__meta-photo') as HTMLElement | null;
            if (photo) {
                photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
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

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (!newsContainer) {
            return;
        }

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
