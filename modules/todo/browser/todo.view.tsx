import * as React from 'react';
import { useInjectable, ViewState } from '@opensumi/ide-core-browser';
import * as styles from './todo.module.less';
import { RecycleList, CheckBox } from '@opensumi/ide-components';
import { ITodoService } from '../common';

export interface ITodo {
  description: string;
  isChecked: boolean;
}

export const Todo = ({
  viewState,
}: React.PropsWithChildren<{ viewState: ViewState }>) => {
  const { width, height } = viewState;
  const [todos, setTodos] = React.useState<ITodo[]>([{
    description: 'First Todo',
    isChecked: true,
  }]);
  const { showMessage, onDidChange } = useInjectable<ITodoService>(ITodoService);
  
  const template = ({
    data,
    index,
  }: { data: ITodo, index: number }) => {
    const handlerChange = () => {
      const newTodos = todos.slice(0);
      newTodos.splice(index, 1, {
        description: data.description,
        isChecked: !data.isChecked,
      });
      setTodos(newTodos);
      showMessage(`Set ${data.description} to be ${!data.isChecked}`);
    };
    return <div className={styles.todo_item} key={`${data.description + index}`}>
      <CheckBox checked={data.isChecked} onChange={handlerChange} label={data.description} />
    </div>;
  };

  React.useEffect(() => {
    const disposable = onDidChange((value: string) => {
      const newTodos = todos.slice(0);
      newTodos.push({
        description: value,
        isChecked: false,
      });
      setTodos(newTodos);
    });
    return () => {
      disposable.dispose();
    };
  }, [todos]);
  return (
    <RecycleList
      height={height}
      width={width}
      itemHeight={24}
      data={todos}
      template={template}
    />
  );
};
