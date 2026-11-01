import './sources.css';
import { SourcePreview } from '../../../types/newsapi';

class Sources {
    private static readonly SKELETON_COUNT = 8;

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

        this.replaceContent(fragment);
    }

    public drawSkeleton(): void {
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < Sources.SKELETON_COUNT; i += 1) {
            const chip = document.createElement('div');
            chip.className = 'source-skeleton shimmer';
            chip.setAttribute('aria-hidden', 'true');
            fragment.append(chip);
        }

        this.replaceContent(fragment);
    }

    public drawMessage(text: string): void {
        const message = document.createElement('p');
        message.className = 'state-message state-message--inline';
        message.textContent = text;
        this.replaceContent(message);
    }

    private replaceContent(content: Node): void {
        const sourcesContainer = document.querySelector('.sources');
        if (!sourcesContainer) {
            return;
        }

        sourcesContainer.innerHTML = '';
        sourcesContainer.append(content);
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
