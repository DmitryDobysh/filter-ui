import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddFilterComponent } from './add-filter/add-filter.component';
import { ApiService } from '../../services/api.service';
import { FiltersItem } from '../../entities/filter';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, NgbDropdown, ReactiveFormsModule, FormsModule, AddFilterComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit, OnDestroy {
  list: FiltersItem[] = [];
  mode = 'modal';
  isShow = false;

  constructor(private modal: NgbModal, private api: ApiService) {}

  onReady() {
    this.isShow = false;
  }

  addFilter() {
    if (this.mode === 'non-modal' ) {
      this.isShow = true;

      return;
    }

    const modalRef = this.modal.open(AddFilterComponent, { keyboard: false, size: 'lg' });
    modalRef.componentInstance.ready.pipe(take(1)).subscribe(() => {
      modalRef.close();
    })
  }

  onDelete(id: number) {

  }

  ngOnInit(): void {
    // this.loadPage();
  }

  loadPage() {
    this.getData();
  }

  getData() {
    this.api.requestGet({ route: 'filters' }).subscribe((res) => {
      this.list = res;
    })
  }

  onFilter() {
    this.getData();
  }

  ngOnDestroy(): void { }
}
