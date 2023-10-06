import { Component, OnInit, OnDestroy } from '@angular/core';
import { CatsService } from 'src/app/services';
import { EMPTY, Subject, BehaviorSubject } from 'rxjs';
import { Cat } from 'src/app/shared/models';

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
    const catIndex1 = Math.floor(Math.random() * this.catsItems.length);
    const catIndex2 = Math.floor(Math.random() * this.catsItems.length);
    this.catsImg.push(this.catsItems[catIndex1], this.catsItems[catIndex2]);

    if (this.catsItems.length < 3) {
      this.initCatsLit();
    } else {
      this.updateCatsList(catIndex1, catIndex2);
    }
    
  }

  private initCatsLit() {
    this.catsService.catsImgList$.subscribe({
      next: cats => {
        this.catsItems = cats;
      },
      error: err => this.errorMessageSubject$.next(err)
    })
  }

  private updateCatsList(catIndex1: number, catIndex2: number): void {
    this.catsItems.splice(catIndex1, 1);
    this.catsItems.splice(catIndex2, 1);
  }

  ngOnDestroy(): void {
    this.notifier.complete();
  }
}
