import { Component, OnInit, Output,EventEmitter,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyCards, MyTypes } from 'src/app/shared/interfaces/cards.interface';
import { NoteHTTPDbService } from 'src/app/shared/services/note-http-db.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card!: MyCards;
  @Input() type: MyTypes ={id:0,name:""};
  types: MyTypes[] = [];
  
  @Output() deleteCard =
  new EventEmitter<number>();
  @Output() setEdit =
  new EventEmitter<MyCards>();
  
  cardForm : FormGroup;
  editActive :boolean = false;
   

  onDeleteCard(){
   this.deleteCard.emit(this.card.id)
  }
  
  
  onSetEdit(){
    const note = this.cardForm.value;
    this.setEdit.emit(note);
    this.editActive = false;
  }
  async getTypeByID(){
    try {
      this.type = await this.noteHTTPDbService.getType(this.card.type);
    } catch (err) {
      console.error(err);
    }
  }
  async getTypes(){
    try {
      this.types = await this.noteHTTPDbService.getTypes();
    } catch (err) {
      console.error(err);
    }
  }


  constructor(private fb: FormBuilder,private noteHTTPDbService :NoteHTTPDbService) { }

   ngOnInit(): void {
    this.getTypeByID();
    this.getTypes();

    const controls = {
      name: [null, [Validators.required, Validators.maxLength(100)]],
      inputText: [null, [Validators.required]],
      type: [null, [Validators.required]],
    };
  
    this.cardForm = this.fb.group(controls);
    if (this.card) {
      this.cardForm.patchValue(this.card);
    }
   
  
  }


}
