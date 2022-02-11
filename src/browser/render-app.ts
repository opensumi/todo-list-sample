import { Injector } from '@opensumi/di';
import { ClientApp, IClientAppOpts } from '@opensumi/ide-core-browser';
import { ToolbarActionBasedLayout } from '@opensumi/ide-core-browser/lib/components';

export async function renderApp(opts: IClientAppOpts) {
  const injector = new Injector();
  opts.workspaceDir = opts.workspaceDir || process.env.WORKSPACE_DIR;

  opts.extensionDir = opts.extensionDir || process.env.EXTENSION_DIR;
  opts.injector = injector;
  opts.wsPath =  process.env.WS_PATH || 'ws://127.0.0.1:8000';

  opts.extWorkerHost = opts.extWorkerHost || process.env.EXTENSION_WORKER_HOST || 'http://localhost:8080/browser/worker-host.js';
  const anotherHostName = process.env.WEBVIEW_HOST || (window.location.hostname === 'localhost' ? '127.0.0.1' : 'localhost');
  opts.webviewEndpoint = `http://${anotherHostName}:9090`;
  opts.layoutComponent = ToolbarActionBasedLayout;
  const app = new ClientApp(opts);

  app.fireOnReload = (forcedReload: boolean) => {
    window.location.reload(forcedReload);
  };

  await app.start(document.getElementById('main')!, 'web');
  const loadingDom = document.getElementById('loading');
  if (loadingDom) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    loadingDom.classList.add('loading-hidden');
    await new Promise((resolve) => setTimeout(resolve, 500));
    loadingDom.remove();
  }
}
