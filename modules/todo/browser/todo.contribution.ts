import { Autowired } from '@opensumi/di';
import { CommandContribution, CommandRegistry, Domain, KeybindingContribution, KeybindingRegistry, localize } from '@opensumi/ide-core-browser';
import { ExplorerContainerId } from '@opensumi/ide-explorer/lib/browser/explorer-contribution';
import { MainLayoutContribution, IMainLayoutService } from '@opensumi/ide-main-layout';
import { ITodoService, TODO_COMMANDS } from '../common';
import { Todo } from './todo.view';

@Domain(MainLayoutContribution, CommandContribution, KeybindingContribution)
export class TodoContribution implements MainLayoutContribution, CommandContribution, KeybindingContribution {
  @Autowired(IMainLayoutService)
  private mainLayoutService: IMainLayoutService;

  @Autowired(ITodoService)
  private todoService: ITodoService;

  onDidRender() {
    this.mainLayoutService.collectViewComponent({
      component: Todo,
      collapsed: false,
      id: 'todo-view',
      name: 'Todo',
    }, ExplorerContainerId);
  }

  registerCommands(registry: CommandRegistry) {
    registry.registerCommand(TODO_COMMANDS.ADD_TODO, {
      execute: () => {
        return this.todoService.addTodo();
      },
    });
  }

  registerKeybindings(registry: KeybindingRegistry) {
    registry.registerKeybinding({
      keybinding: 'cmd+o',
      command: TODO_COMMANDS.ADD_TODO.id,
    });
  }
}
