import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MyCards } from './shared/interfaces/cards.interface';
import { MyTypes } from './shared/interfaces/cards.interface';
import { NoteHTTPDbService } from './shared/services/note-http-db.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private noteHTTPDbService :NoteHTTPDbService){

  }

  title = 'project15';
  card: MyCards[] = [];
  types: MyTypes[] = [];



   
  async onAddNote(note: MyCards){    
    try{
      note.date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

      await this.noteHTTPDbService.postNotes(note);
      
    }catch(err){
      console.error(err);
    }
    this.getData();
  }

  async onDeleteCard(index:number) {
    try{
      await this.noteHTTPDbService.deleteNotes(index);
      
    }catch(err){
      console.error(err);
    }
    this.getData();
  }

  async onSetEdit(id:number,note: MyCards){
    try{
      note.reDate = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString() + ` Ред..`;
      await this.noteHTTPDbService.editNote(id,note);
      
    }catch(err){
      console.error(err);
    }
    this.getData();
  }

  ngOnInit(){
    this.getData();
    this.getTypes();
  }

  async getData() {
    try {
      this.card = await this.noteHTTPDbService.getNotes();
    } catch (err) {
      console.error(err);
    }
  }
  async getTypes() {
    try {
      this.types = await this.noteHTTPDbService.getTypes();
    } catch (err) {
      console.error(err);
    }
  }


}
