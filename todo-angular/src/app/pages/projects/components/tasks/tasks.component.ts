import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormControl } from '@angular/forms';
import { RestService } from '../../../../shared/services/rest.service';
import { Task } from '../../../../shared/models/task';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { ToastService } from '../../../../shared/services/toast.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  advance = new FormControl();

  todo = [];

  done = [];

  todo$ : Observable<any[]>;

  constructor(
    private rest: RestService,
    private toats: ToastService
  ) { }

  ngOnInit(): void { 
    this.loadTodo();
  }

  loadTodo() {
    this.rest.get('tasks/assigned').subscribe((todo: Task[]) => {
      this.todo = todo.filter(t => t.advance < 100);
      this.done = todo.filter(t => t.advance === 100);
    },(e) => { console.error('Problemas con la consulta', e) });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);      
    }

    let task: Task = this.done[Object.keys(this.done)[event.currentIndex]];
    if (task && task.advance === 100) {
      this.updateAdvance(task);
    } else {
      this.todo.unshift(task);
      this.done.splice(event.currentIndex, 1);
      this.toats.warning('No ha reportado el progreso al 100%, por favor reportelo');
    }
  }

  async updateAdvance(task: Task) {
    const now =  new Date().getTime();
    if (this.advance.value) {
      task.advance = this.advance.value;

      if (this.advance.value === 100) {
        let start = moment(task.startDate);
        let finish = moment(now);
        let duration = moment.duration(start.diff(finish)).locale('es').humanize();

        task.finishDate = now;
        task.updateDate = now;
        task.time = duration;

        console.log(task);
        
      }

      let response = await this.rest.update(`tasks/${task.id}`, task).toPromise();

      if (response) {
        setTimeout(() => {
          this.loadTodo();
        }, 1000);
      }
      this.advance.reset();
    }
  }
}
