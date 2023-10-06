import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Cat } from 'src/app/shared/models';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent {

  @Input() catsVoteImg: any;
  @Input() errorMessage?: Observable<string>;

  @Output() addVote = new EventEmitter<Cat>();

  vote(cat: Cat): void { 
    this.addVote.emit(cat);
  }

}
