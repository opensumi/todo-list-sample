import 'tsconfig-paths/register';
import * as path from 'path';
import * as http from 'http';
import * as Koa from 'koa';
import { Deferred } from '@opensumi/ide-core-common';
import { IServerAppOpts, ServerApp, NodeModule } from '@opensumi/ide-core-node';

export async function startServer(arg1: NodeModule[] | Partial<IServerAppOpts>) {
  const app = new Koa();
  const deferred = new Deferred<http.Server>();
  const port = process.env.IDE_SERVER_PORT || 8000;
  let opts: IServerAppOpts = {
    use: app.use.bind(app),
    marketplace: {
      showBuiltinExtensions: true,
      accountId: 'nGJBcqs1D-ma32P3mBftgsfq',
      masterKey: '-nzxLbuqvrKh8arE0grj2f1H',
    },
    processCloseExitThreshold: 5 * 60 * 1000,
    terminalPtyCloseThreshold: 5 * 60 * 1000,
    staticAllowOrigin: '*',
    staticAllowPath: [
      path.join(__dirname, '../extensions'),
      path.join(__dirname, '../workspace')
    ],
    extHost: path.join(__dirname, '../../dist-node/hosted/ext.process.js') || process.env.EXTENSION_HOST_ENTRY,
    onDidCreateExtensionHostProcess: (extProcess) => {
      console.log('onDidCreateExtensionHostProcess extProcess.pid', extProcess.pid);
    },
  };
  if (Array.isArray(arg1)) {
    opts = {
      ...opts,
       modulesInstances: arg1,
      };
  } else {
    opts = {
      ...opts,
      ...arg1,
    };
  }

  const serverApp = new ServerApp(opts);
  const server = http.createServer(app.callback());

  await serverApp.start(server);

  server.on('error', (err) => {
    deferred.reject(err);
    console.error('Server error: ' + err.message);
    setTimeout(process.exit, 0, 1);
  });

  server.listen(port, () => {
    console.log(`Server listen on port ${port}`);
    deferred.resolve(server);
  });
  return deferred.promise;
}
