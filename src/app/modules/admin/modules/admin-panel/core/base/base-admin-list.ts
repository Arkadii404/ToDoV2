import { AdminDetailsComponent } from './../../../../../../shared/components/admin-details/admin-details.component';
import { Directive, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CoreModels } from '@core/models';
import { ErrorService } from '@core/services/error.service';
import { IServerListService } from '../../../../../../core/interfaces/server-list.service.interface';
import { StorageService } from '@core/services/storage.service';
import {MatDialog} from '@angular/material/dialog';


@Directive()
export abstract class BaseAdminListComponent<T> implements OnInit {
    /* services */
    protected abstract readonly service: IServerListService<T>;
    protected readonly errorService: ErrorService;
    protected readonly router: Router;
    protected readonly storageService: StorageService;
    protected readonly dialog: MatDialog;

    public modes: CoreModels.IMode[] = [
        { value: 'id', viewValue: 'ID' }
    ];

    public sorts = {
        id: true,
        userId: false,
        date: false,
        email: false
    }

    public items: any[];

    public dataSource: MatTableDataSource<any>;

    public isLoad: boolean = false;

    public modeControl = new FormControl(this.modes[0].value);
    public valueControl = new FormControl(null);

    constructor(
        private readonly injector: Injector
    ) {
        this.errorService = this.injector.get(ErrorService);
        this.router = this.injector.get(Router);
        this.storageService = this.injector.get(StorageService);
        this.dialog = this.injector.get(MatDialog);
    }

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    ngOnInit(): void {
        this.getItems();
    }

    protected getItems() {
        this.service.get().subscribe(
            items => {
                this.items = items;
                this.processItems(items);
                this.initTable(items);
                this.isLoad = true;
            },
            () => this.errorService.throwServerError('Can not get data')
        )
    }

    protected processItems(items: T[]) { };

    protected initTable(items: T[]) {
        this.dataSource = new MatTableDataSource(items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public filter() {
        let mode: string = this.modeControl.value;
        let value: string = this.valueControl.value;
        if (mode === 'none') {
          this.dataSource.data = this.items;
          this.reset();
        } else if (mode === 'id') {
          if (value.includes('<')) {
            this.dataSource.data = this.items.filter(item => item.id < Number(value.slice(1)));
          } else if (value.includes('>')) {
            this.dataSource.data = this.items.filter(item => item.id > Number(value.slice(1)));
          } else if (value.includes('-')) {
            let start: number = +value.split('-')[0];
            let end: number = +value.split('-')[1];
            this.dataSource.data = this.items.filter(item => item.id >= start && item.id <= end);
          } else {
            this.dataSource.data = this.items.filter(item => item.id == Number(value));
          }
        } else if (mode === 'user') {
          if (value.includes('<')) {
            this.dataSource.data = this.items.filter(item => item.userId < Number(value.slice(1)));
          } else if (value.includes('>')) {
            this.dataSource.data = this.items.filter(item => item.userId > Number(value.slice(1)));
          } else if (value.includes('-')) {
            let start: number = +value.split('-')[0];
            let end: number = +value.split('-')[1];
            this.dataSource.data = this.items.filter(item => item.userId >= start && item.userId <= end);
          } else {
            this.dataSource.data = this.items.filter(item => item.userId == Number(value));
          }
        }
      }

    public check(event: KeyboardEvent) {
        if (event.keyCode === 13) {
            this.filter();
        }
    }

    public sorting(data: string) {
        switch (data) {
            case 'id':
                this.sorts.id = !this.sorts.id;
                if (this.sorts.id) {
                    this.dataSource.data = this.dataSource.data.sort((a, b) => a.id - b.id)
                } else {
                    this.dataSource.data = this.dataSource.data.sort((a, b) => b.id - a.id)
                }
                break;
            case 'userId':
                this.sorts.userId = !this.sorts.userId;
                if (this.sorts.userId) {
                    this.dataSource.data = this.dataSource.data.sort((a, b) => a.userId - b.userId)
                } else {
                    this.dataSource.data = this.dataSource.data.sort((a, b) => b.userId - a.userId)
                }
                break;
            case 'date':
                this.sorts.date = !this.sorts.date;
                if (this.sorts.date) {
                    this.dataSource.data = this.dataSource.data.sort((a, b) => {
                        if (a.date > b.date) {
                            return -1;
                        } else if (a.date < b.date) {
                            return 1;
                        } else {
                            return 0;
                        }
                    })
                } else {
                    this.dataSource.data = this.dataSource.data.sort((a, b) => {
                        if (b.date > a.date) {
                            return -1;
                        } else if (b.date < a.date) {
                            return 1;
                        } else {
                            return 0;
                        }
                    })
                }
                break;
            case 'email':
                this.sorts.email = !this.sorts.email;
                if (this.sorts.email) {
                    this.dataSource.data = this.dataSource.data.sort((a, b) => {
                        if (a.email > b.email) {
                            return -1;
                        } else if (a.email < b.email) {
                            return 1;
                        } else {
                            return 0;
                        }
                    })
                } else {
                    this.dataSource.data = this.dataSource.data.sort((a, b) => {
                        if (b.email > a.email) {
                            return -1;
                        } else if (b.email < a.email) {
                            return 1;
                        } else {
                            return 0;
                        }
                    })
                }
                break;
        }
    }

    public reset() {
        this.dataSource.data = this.items;
        this.valueControl.reset();
    }

    public showDetails(event: MouseEvent, target: string, dto: T) {
        if (!(event.target as HTMLElement).closest('.mat-form-field-infix')) {
           this.openDialog(dto, target)
        }
    }

    private openDialog(dto: T, target: string) {
        this.dialog.open(AdminDetailsComponent, {
            data: {
                target,
                dto 
            }
        })
    }

}