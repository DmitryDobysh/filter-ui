import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../services/api.service';
import { CommonModule, NgFor } from '@angular/common';
import { take } from 'rxjs';
import { ReplacePipe } from '../../../pipes/replace.pipe';

export enum Field {
  Amount = 'AMOUNT',
  Date = 'DATE',
  Title = 'TITLE',
}

export enum Selection {
  Select1 = 'SELECT_1',
  Select2 = 'SELECT_2',
  Select3 = 'SELECT_3',
}

export enum AmountCondition {
  More = 'MORE',
  Less = 'LESS',
}

export enum TitleCondition {
  StartsWith = 'STARTS_WITH',
  EndsWith = 'ENDS_WITH',
}

export enum DateCondition {
  From = 'FROM',
  To = 'TO',
}

@Component({
  selector: 'app-add-filter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgbDatepicker, NgbModule, ReplacePipe],
  templateUrl: './add-filter.component.html',
  styleUrl: './add-filter.component.scss'
})
export class AddFilterComponent {
  form!: UntypedFormGroup;

  fields = Object.values(Field);
  selections = Object.values(Selection);

  Field = Field
  AmountConditions = Object.values(AmountCondition);
  TitleConditions = Object.values(TitleCondition);
  DateConditions = Object.values(DateCondition);

  @Output() ready = new EventEmitter<void>();

  get criteries(): UntypedFormGroup[] {
    return (this.form.get('criteria') as UntypedFormArray).controls as UntypedFormGroup[]
  }

  constructor(private fb: UntypedFormBuilder,
    private api: ApiService,) {
    }

  ngOnInit(): void {
    this.form = this.fb.group({
      filterName: ['', Validators.required],
      criteria: this.fb.array([
        this.fb.group({
          "field": Field.Amount,
          "condition": [AmountCondition.More, Validators.required],
          "value": ['', Validators.required]
        }),
        // this.fb.group({
        //   "field": Field.Title,
        //   "condition": [TitleCondition.StartsWith, Validators.required],
        //   "value": ["Meow", Validators.required],
        // }),
        // this.fb.group({
        //   "field": Field.Date,
        //   "condition": [DateCondition.From, Validators.required],
        //   "value": ["2021-10-25", Validators.required],
        // })
      ]),
      selection: Selection.Select1
    });

    console.log(this.form);
  }

  addField() {
    (this.form.get('criteria') as UntypedFormArray).push(this.fb.group({
      "field": Field.Amount,
      "condition": [AmountCondition.More, Validators.required],
      "value": ['', Validators.required]
    }))
  }

  deleteField(index: number) {
    (this.form.get('criteria') as UntypedFormArray).removeAt(index)
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.form.disable();

    console.log(this.form.value);

    this.api.requestPost({ route: 'filters', payload: this.form.value})
      .subscribe(res => {
        console.log(res);
        this.ready.next();
      });
  }
}
