import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from './store/model/task.model';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducer/task.reducer';
import { addTask, deleteTask, updateTask } from './store/action/task.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  toDoForm!: FormGroup;
  submitted: boolean = false;
  isActive: boolean = false;
  list: Task[] = [];
  upadatedtask: any;
  taskActive: boolean = false;
  constructor(public formBuilder: FormBuilder, private store: Store<AppState>) {
    this.store.select('tasks').subscribe((task: any) => {
      this.list = task?.tasks;
      console.log(this.list);
    });
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.toDoForm = this.formBuilder.group({
      title: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      discription: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
    });
  }
  add() {
    this.submitted = true;
    if (this.toDoForm.valid) {
      this.submitted = false;
      console.log(this.toDoForm.value);
      const newTask = {
        id: this.list.length + 1,
        title: this.toDoForm.value.title,
        description: this.toDoForm.value.discription,
      };
      this.store.dispatch(addTask({ task: newTask }));
      this.toDoForm.reset();
      this.createForm();
    } else {
      this.submitted = true;
      console.log();
    }
  }
  update() {
    const updatetask: Task = {
      ...this.upadatedtask,
      title: this.toDoForm.value.title,
      description: this.toDoForm.value.discription,
    };
    this.store.dispatch(updateTask({ task: updatetask }));
    this.taskActive = !this.taskActive;
  }
  edit(task: Task) {
    this.toDoForm.controls['title'].setValue(task.title);
    this.toDoForm.controls['discription'].setValue(task.description);
    this.taskActive = !this.taskActive;
    this.upadatedtask = task;
  }
  delete(id: number) {
    this.store.dispatch(deleteTask({ id }));
  }
}
