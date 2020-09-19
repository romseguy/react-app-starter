import { applySnapshot, types as t } from "mobx-state-tree";

export const Counter = t
  .model({
    count: 0,
  })
  .actions((counter) => ({
    increment() {
      counter.count++;
    },
    decrement() {
      counter.count--;
    },
    reset() {
      applySnapshot(counter, { count: 0 });
    },
  }));
