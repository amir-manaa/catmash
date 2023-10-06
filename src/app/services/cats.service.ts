import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, map, catchError, throwError, BehaviorSubject } from 'rxjs';
import { apiCats, Voting, Cat } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  private readonly API_URL = environment.apiUrl;

  private voteListSubject = new BehaviorSubject<Voting[]>([]);
  votesList$ = this.voteListSubject.asObservable();

  private votesNumberSubject = new BehaviorSubject<number>(0);
  votesNumber$ = this.votesNumberSubject.asObservable();

  catsImgList$ = this.http.get<apiCats>(`${this.API_URL}/cats.json`).pipe(
    map(cats => cats.images),
    // tap(catsImg => console.log('Cats Image List', catsImg)),
    catchError(this.handleError)
  )

  addVote(cat: Cat) {
    const votesList = this.voteListSubject.value;
    const currentCat = votesList.find(vote => vote.id === cat.id);
    (currentCat) ? 
      votesList[votesList.indexOf(currentCat)].vote = votesList[votesList.indexOf(currentCat)].vote+1 : 
      votesList.push({id: cat.id, url: cat.url, vote: 1});
    
    this.voteListSubject.next(votesList);

    this.updateVotesNumer();
  }

  constructor(
    private http: HttpClient
  ) { }

  private updateVotesNumer() {
    this.votesNumberSubject.next(this.votesNumberSubject.value + 1);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
