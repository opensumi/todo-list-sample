import { Injectable, Autowired } from '@opensumi/di';
import { IMessageService } from '@opensumi/ide-overlay';
import { Emitter, IQuickInputService } from '@opensumi/ide-core-browser';
import { ITodoConnectionServerPath, ITodoNodeService, ITodoService } from '../common';
import { RPCService } from '@opensumi/ide-connection';

@Injectable()
export class TodoService extends RPCService implements ITodoService {
  @Autowired(IMessageService)
  private messageService: IMessageService;

  @Autowired(IQuickInputService)
  private quickInputService: IQuickInputService;

  @Autowired(ITodoConnectionServerPath)
  private todoNodeService: ITodoNodeService;

  private onDidChangeEmitter: Emitter<string> = new Emitter();

  get onDidChange() {
    return this.onDidChangeEmitter.event;
  }

  showMessage = (message: string) => {
    this.messageService.info(message);
    this.todoNodeService.showMessage(message);
  };

  onMessage = (message: string) => {
    this.messageService.info(message);
  };

  addTodo = async () => {
    const param = await this.quickInputService.open({
      placeHolder: '输入你的计划',
      value: '',
    });
    if (param !== undefined && param !== null) {
      this.onDidChangeEmitter.fire(param);
    }
  };
}
