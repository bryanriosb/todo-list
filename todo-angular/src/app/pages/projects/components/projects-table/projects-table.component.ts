import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { RestService } from 'src/app/shared/services/rest.service';
import { ProjectManagementComponent } from '../project-management/project-management.component';
import { Project } from '../../../../shared/models/project';
import { DeleteComponent } from '../../../../shared/components/delete/delete.component';
import { User } from '../../../../shared/models/user';
import { TaskManagementComponent } from '../task-management/task-management.component';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss']
})
export class ProjectsTableComponent implements OnInit, AfterViewInit {
  public user: User = JSON.parse(localStorage.getItem('user'));
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource([]);

  private mediaSub$: Subscription
  public screenLayout: string
  public layoutAling1: string
  public layoutAling2: string

  displayedColumns: string[] = [
    'name',
    'description',
    'alias',
    'startDate',
    'finishDate',
    'responsable',
    'creationDate',
    'updateDate',
    'tasks',
    'update',
    'delete'
  ]

  constructor(
    private mediaObserver: MediaObserver,
    private dialogService: DialogService,
    private rest: RestService
  ) { }
  
  ngOnInit() {
    this.mediaSub$ = this.mediaObserver.media$.subscribe((change: MediaChange) => {
      if( change.mqAlias !== 'xs') {
        this.screenLayout = 'row'
        this.layoutAling1 = 'space-between'
        this.layoutAling2 = 'center'
      } else {
        this.screenLayout = 'column'
        this.layoutAling1 = 'space-between'
        this.layoutAling2 = 'stretch'
      }
    })

    this.loadData();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000);
  }

  async loadData() {
    this.dataSource.data = await this.rest.get('projects').toPromise();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async tasks(project: Project) {
    let response = await this.dialogService.showDialogData(
      TaskManagementComponent, '1200px',null, true, project
    );
  }

  async update(project: Project) {
    let response = await this.dialogService.showDialogData(
      ProjectManagementComponent, '1200px',null, null, project
    );
    if (response) this.loadData();
  }

  async delete(project: Project) {
    const data = `projects/${project.id}`    
    let response = await this.dialogService.showDialogData( DeleteComponent, '300px', null, true, data);
    if (response) {
      setTimeout(() => {
        this.loadData();
      }, 500);
    }
  }
  
  ngOnDestroy(): void {
    this.mediaSub$.unsubscribe()
  }

}
