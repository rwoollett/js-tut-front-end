
import React from 'react';

interface TodoItemProps {
  done?: boolean,
  text: string,
}

const TodoItem = ({done = false, text}: TodoItemProps): JSX.Element => {
   return (
    <div>{text} {done}</div>
   );
};

export default TodoItem;