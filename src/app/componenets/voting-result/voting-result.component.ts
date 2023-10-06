import { Component, OnInit, OnDestroy } from '@angular/core';
import { CatsService } from 'src/app/services';
import { Subject, takeUntil  } from 'rxjs';
import { Voting } from 'src/app/shared/models';

@Component({
  selector: 'app-voting-result',
  templateUrl: './voting-result.component.html',
  styleUrls: ['./voting-result.component.scss']
})
export class VotingResultComponent implements OnInit, OnDestroy {

  notifier = new Subject();  
  voteList: Voting[] = [];

  constructor(
    private catsService: CatsService
  ) {}

  ngOnInit(): void {
    this.catsService.votesList$
    .pipe(
      takeUntil(this.notifier)
    )
    .subscribe(votingResult => {
      votingResult.sort((c1, c2) => {
        return (c1.vote > c2.vote) ? -1 : 1;
      });
      this.voteList = votingResult;
    })
  }

  ngOnDestroy(): void {
    this.notifier.complete();
  }
}
