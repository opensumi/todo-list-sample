import { Injectable } from '@opensumi/di';
import { ITodoNodeService } from '../common';
import { RPCService } from '@opensumi/ide-connection';

@Injectable()
export class TodoNodeService extends RPCService implements ITodoNodeService {

  showMessage = (message: string) => {
    this.rpcClient![0].onMessage(`I got you message, echo again. ${message}`);
  };
}
