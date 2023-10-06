import { Component, OnInit, OnDestroy } from '@angular/core';
import { CatsService } from 'src/app/services';
import { Subject, BehaviorSubject } from 'rxjs';
import { Cat } from 'src/app/shared/models';
import { generateRandomBetween } from 'src/app/shared/helpers/helpers';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.scss']
})
export class CatListComponent implements OnInit, OnDestroy {

  notifier = new Subject();

  private errorMessageSubject$ = new BehaviorSubject<string>('');
  errorMessage = this.errorMessageSubject$.asObservable();

  votesNumber$ = this.catsService.votesNumber$;

  catsItems: Cat[] = [];
  initialCasItems: Cat[] = [];
  catsImg: Cat[] = [];

  constructor(
    private catsService: CatsService
  ) {}

  ngOnInit(): void {
    this.getCats();
  }

  private getCats(): void {
    this.catsService.catsImgList$.subscribe({
      next: cats => {
        this.initialCasItems = cats;
        this.catsItems = cats;
        this.getRandomCats();
      },
      error: err => this.errorMessageSubject$.next(err)
    })
  }

  vote(cat: Cat) {
    this.getRandomCats();
    this.catsService.addVote(cat);
  }

  private getRandomCats(): void {
    this.catsImg = [];
    const catIndex1 = generateRandomBetween(0, this.catsItems.length);
    const catIndex2 = generateRandomBetween(0, this.catsItems.length, catIndex1);
    this.catsImg.push(this.catsItems[catIndex1], this.catsItems[catIndex2]);
  }

  ngOnDestroy(): void {
    this.notifier.complete();
  }
}
