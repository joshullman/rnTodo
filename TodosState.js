import { observable, computed, action } from "mobx";

class State {
  @observable complete = [];
  @observable incomplete = [];
  @observable removed = [];
  @observable viewing = "incomplete";

  nowViewing = (page) => {
    this.viewing = page;
  };

  toggleComplete = (todo) => {
    todo.inProgress = false;
    if (todo.completed) {
      todo.completed = null;
      todo.fill = 0;
      this.incomplete.push(todo);
      let i = this.complete.indexOf(todo);
      this.complete.splice(i, 1);
    } else {
      todo.completed = Date.now();
      todo.fill = 100;
      this.complete.push(todo);
      let i = this.incomplete.indexOf(todo);
      this.incomplete.splice(i, 1);
    }
  };

  @action newTodo = () => {
    this.incomplete.push(new Todo());
  };

  removeTodo = (todo) => {
    todo.removed = Date.now();
    this.removed.push(todo);
    if (this.viewing == "complete") {
      let i = this.complete.indexOf(todo);
      this.complete.splice(i, 1);
    } else {
      let i = this.incomplete.indexOf(todo);
      this.incomplete.splice(i, 1);
    }
  };
}

// purely for example purposes
let id = 0;

class Todo {
  constructor() {
    this.id = id++;
    this.created = Date.now();
  }
  id;
  @observable label = "";
  @observable fill = 0;
  @observable inProgress = false;
  created;
  @observable completed;
  @observable editing = true;
  @observable removed;

  updateProp = (prop, val) => {
    this[prop] = val;
  };
}

let state = new State();
export { state as default };
