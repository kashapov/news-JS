import './sources.css';
import { SourcePreview } from '../../../types/newsapi';

class Sources {
    public draw(data: ReadonlyArray<SourcePreview>): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement | null;

        if (!sourceItemTemp) {
            return;
        }

        data.forEach((item: SourcePreview) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
            this.fillSource(sourceClone, item);
            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }

    private fillSource(sourceClone: DocumentFragment, item: SourcePreview): void {
        const name = sourceClone.querySelector('.source__item-name');
        if (name) name.textContent = item.name;

        const sourceItem = sourceClone.querySelector('.source__item');
        if (sourceItem) {
            sourceItem.setAttribute('data-source-id', item.id);
        }
    }
}

export default Sources;
