// enum States{
//   Start,
//   DragStart,
//   Moving,
//   Stoped,
//   Selected
// }

// export enum Actions {
//   AUTO,
//   EvtDragStart,
//   EvtDrag,
//   EvtDragEnd,
// }

type StateTransferFunction = () => void;

class StateMachine<S extends number, A extends number> {
  s: S; // 内部状态
  //   (S,A) => fn,newState
  // 当前state触发一个action，指向一个执行fn，得到新state
  table: Map<S, Map<A, [StateTransferFunction, S]>>; // 状态转化表,通过当前状态查表

  /**
   *
   * @param from 开始状态
   * @param to 结束状态
   * @param action action
   * @param fn reducer
   */
  register(from: S, to: S, action: A, fn: StateTransferFunction) {
    if (!this.table.has(from)) {
      this.table.set(from, new Map());
    }

    // from有哪些邻接状态  邻接表
    const adjTable = this.table.get(from);
    adjTable.set(action, [fn, to]);
  }

  dispatch(action: A): boolean {
    //   当前状态有没有邻接表
    const adjTable = this.table.get(this.s);
    if (!adjTable) {
      return false;
    }

    // 没有定义actuion
    if (!adjTable.has(action)) {
      return false;
    }

    const [fn, nextS] = adjTable.get(action);
    // 执行reducer
    fn();
    // 新状态指向s
    this.s = nextS;

    // 0是auto,尝试dispatch('auto)
    // 成功触发函数调用会返回true
    // 直到没有邻接表或者没有定义action为止
    while (this.dispatch(0 as A));
    return true;
  }
}
