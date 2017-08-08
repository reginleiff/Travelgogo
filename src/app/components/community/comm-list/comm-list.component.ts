import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ItineraryOverview } from './../../../objects';
import { FirebaseService } from './../../../services/firebase.service';
import { CommDataService } from './../../../services/comm-data.service';

@Component({
  selector: 'app-comm-list',
  templateUrl: './comm-list.component.html',
  styleUrls: ['./comm-list.component.css']
})
export class CommListComponent implements OnInit {

  itineraries: Array<ItineraryOverview>;
  filteredItineraries: Array<ItineraryOverview>;
  search: FormControl;

  constructor(
    private fbs: FirebaseService,
    private cds: CommDataService
  ) { }

  ngOnInit() {
    this.search = new FormControl();
    this.fbs.getAllItineraryObs().subscribe(data => {
      this.itineraries = data
      this.filteredItineraries = this.itineraries;
    });
  }

  filter(str: string): void {
    let newList = new Array<ItineraryOverview>();
    let ss = str.toLowerCase();
    for(let i of this.itineraries){
      let aName = i.authorName.toLowerCase();
      let desc = i.description.toLowerCase();
      let title = i.title.toLowerCase();
        // if name, description or title contains substring
        if(aName.includes(ss) || desc.includes(ss) || title.includes(ss)){
            newList.push(i);
        }
    }
    this.filteredItineraries = newList;
  } 
  pushToView(itinerary: ItineraryOverview): void {
    this.cds.pushToView(itinerary);
  }
}
