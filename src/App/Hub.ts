import { createPinia } from 'pinia';
import { createApp, h, type App } from 'vue';
import { RouterView } from 'vue-router';
import { HubRouter } from '../Router/HubRouter';
import { registerComponents } from '../Components';
import { registerDirectives } from '../Directives';
import CKEditor from '@ckeditor/ckeditor5-vue';

import '../../scss/main.scss';

const pinia = createPinia();

export function createHub<HostElement>(configure: (app: App<HostElement>) => void, rootContainer: any = '#app') {
  const app = createApp({ name: 'Hub', render: () => h(RouterView) }) as App<HostElement>;

  app.use(pinia);
  app.use(CKEditor);

  registerComponents(app);
  registerDirectives(app);

  configure(app);

  app.use(HubRouter);
  app.mount(rootContainer);

  return app;
}
