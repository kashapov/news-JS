import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IEverythingResponse, ISourcesResponse } from '../../types/newsapi';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        this.view.showSourcesLoading();
        this.view.showNewsIdle();

        document.querySelector('.sources')?.addEventListener('click', (e: Event) => {
            this.controller.getNews(
                e,
                (data: IEverythingResponse) => this.view.drawNews(data),
                () => this.view.showNewsLoading()
            );
        });

        this.controller.getSources((data: ISourcesResponse) => {
            this.view.drawSources(data);
            this.view.showNewsIdle();
        });
    }
}

export default App;
