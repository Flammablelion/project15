import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyCards } from 'src/app/shared/interfaces/cards.interface';
import { MyTypes } from 'src/app/shared/interfaces/cards.interface';


@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  @Output() addNote = new EventEmitter<MyCards>();
  @Input() editCard: MyCards;
  @Input() types: MyTypes;
  @Output() addType = new EventEmitter<MyTypes>();
  @Output() deleteType = new EventEmitter<number>();
  cardForm: FormGroup;
  typeForm: FormGroup;
  editType:boolean = false;
  typeName:string;

  onDeleteType(index:number){
    this.deleteType.emit(index);
  }
  onAddType(){
     const type = this.typeForm.value;
     this.addType.emit(type);
  }
  getClear() {
    this.cardForm.reset;
    this.ngOnInit();
  }
  onAddNote() {
    const card = this.cardForm.value;
    this.addNote.emit(card);
  }


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const controls = {
      name: [null, [Validators.required, Validators.maxLength(100)]],
      inputText: [null, [Validators.required,]],
      type: [1,[Validators.required]]
    };
    const typeControls = {
      name: [null, [Validators.required, Validators.maxLength(100)]],
    };

    this.cardForm = this.fb.group(controls);
    this.typeForm = this.fb.group(typeControls);
  }

}
