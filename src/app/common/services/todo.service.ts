import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, of} from "rxjs";
import {ITodo} from "../interfaces/todo.interface";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  todos$: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([]);

  getTodos(): Observable<ITodo[]>{
    return this.todos$.asObservable();
  }
  getTodoById(id:string|number):Observable<ITodo | undefined >{
    return this.todos$.pipe(
      map((todo)=>{
        return todo.find(td=> td.id === id)
      })
    )
  }
  addTodo(todo:ITodo):Observable<ITodo>{
    todo.id = this.generateId();
    todo.createdAt  = new Date();
    this.todos$.next([...this.todos$.getValue(), todo]);
    return of(todo);
  }
  updateTodo(id:number|string, td:ITodo):Observable<ITodo>{
    const todos = this.todos$.getValue();
    const index = todos.findIndex(td => td.id === id);
    todos[index] = {
      ...todos[index],
      ...td
    }
    this.todos$.next(todos);
    return of(td)
  }
  deleteTodo(id:string|number):Observable<boolean>{
    const todos = this.todos$.getValue();
    const index = todos.findIndex(td => td.id === id);
    todos.splice(index,1)

    this.todos$.next(todos)
    return of(true)
  }


  completeTodoById(id:string|number):Observable<ITodo>{
    const todos = this.todos$.getValue();
    const index = todos.findIndex(td => td.id === id);
    todos[index] = {
      ...todos[index],
    };
    this.todos$.next(todos);
    return of(todos[index])
  }

  private generateId() {
    return Math.random().toString(33).substring(2,9);
  }
}
