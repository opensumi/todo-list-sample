import { Provider, Injectable } from '@opensumi/di';
import { NodeModule } from '@opensumi/ide-core-node';
import { ITodoNodeService, ITodoConnectionServerPath } from '../common';
import { TodoNodeService } from './todo.service';

@Injectable()
export class TodoListModule extends NodeModule {
  providers: Provider[] = [
    {
      token: ITodoNodeService,
      useClass: TodoNodeService,
    }
  ];

  backServices = [
    {
      servicePath: ITodoConnectionServerPath,
      token: ITodoNodeService,
    },
  ];
}
