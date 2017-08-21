import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from './../../../services/firebase.service';
import { CommDataService } from'./../../../services/comm-data.service';
import { ItineraryOverview, User } from './../../../objects';

@Component({
  selector: 'app-comm-intro',
  templateUrl: './comm-intro.component.html',
  styleUrls: ['./comm-intro.component.css']
})
export class CommIntroComponent implements OnInit {

  @Output() hideIntroEmit = new EventEmitter<boolean>();
  lastViewed: ItineraryOverview;
  lastUploaded: ItineraryOverview;
  topRated: ItineraryOverview;
  user: User;

  constructor(
    private fbs: FirebaseService,
    private cds: CommDataService
  ) { }

  ngOnInit() {
    this.fbs.getUser().subscribe((user: User) => {
      this.fbs.af.object('/itineraries/' + user.lastViewed).take(1).subscribe(itinerary => {
        this.lastViewed = itinerary;
      });
    })
    this.fbs.getLastUploadedObs().subscribe((itineraryStringObj) => {
      this.fbs.af.object('/itineraries/' + itineraryStringObj.key).take(1).subscribe(itinerary => {
        this.lastUploaded = itinerary;
      });
    })
    this.fbs.getTopRatedObs().subscribe((itineraryStringObj) => {
      this.fbs.af.object('/itineraries/'+ itineraryStringObj.key).take(1).subscribe((itinerary) => {
        this.topRated = itinerary;
      })
    })
  }

  pushToView(itinerary: ItineraryOverview){
    this.cds.pushToView(itinerary);
    this.hideIntro();
  }

  hideIntro(){
    // this.hideIntroEmit.emit(true);
  }
}
