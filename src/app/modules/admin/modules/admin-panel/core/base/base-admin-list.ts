import { Directive, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreModels } from '@core/models';
import { ErrorService } from '@core/services/error.service';
import { StorageService } from '@core/services/storage.service';
import { IServerListService } from '../../../../../../core/interfaces/server-list.service.interface';

@Directive()
export abstract class BaseAdminListComponent<T> implements OnInit {
    /* services */
    protected abstract readonly service: IServerListService<T>;
    protected readonly errorService: ErrorService;
    protected readonly storageService: StorageService;

    public modes: CoreModels.IMode[] = [
        { value: 'id', viewValue: 'ID' }
    ];

    public sorts = {
        id: true,
        userId: false,
        date: false,
        email: false
    }

    public items: T[];

    public dataSource: MatTableDataSource<any>;

    public isLoad: boolean = false;

    public modeControl = new FormControl(this.modes[0].value);
    public valueControl = new FormControl(null);

    constructor(
        private readonly injector: Injector
    ) {
        this.errorService = this.injector.get(ErrorService);
    }

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    ngOnInit(): void {
        this.getItems();
    }

    protected getItems() {
        this.service.get().subscribe(
            items => {
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

    protected filter() { }

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
}