import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { Challenge } from './challenge.model';
import { DayStatus } from './day.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChallengeService {
  private _currentChallenge = new BehaviorSubject<Challenge>(null);

  constructor(private http: HttpClient) {}

  get currentChallenge() {
    // .JA. Ensure to return an Observable for get method returning a Subject instance. So you avoid the call of next() outside the service.
    return this._currentChallenge.asObservable();
  }

  createNewChallenge(title: string, description: string) {
    const newChallenge = new Challenge(
      title,
      description,
      new Date().getFullYear(),
      new Date().getMonth()
    );
    // Save it to server
    this._currentChallenge.next(newChallenge);
  }

  updateChallenge(title: string, description: string) {
    // .JA. take(1) will return only one object and unsubscribe, avoiding memory leak
    this._currentChallenge.pipe(take(1)).subscribe(challenge => {
      const updatedChallenge = new Challenge(
        title,
        description,
        challenge.year,
        challenge.month,
        challenge.days
      );
      // Send to a server
      this._currentChallenge.next(updatedChallenge);
    });
  }

  updateDayStatus(dayInMonth: number, status: DayStatus) {
    this._currentChallenge.pipe(take(1)).subscribe(challenge => {
      if (!challenge || challenge.days.length < dayInMonth) {
        return;
      }
      const dayIndex = challenge.days.findIndex(
        d => d.dayInMonth === dayInMonth
      );
      challenge.days[dayIndex].status = status;
      this._currentChallenge.next(challenge);
      console.log(challenge.days[dayIndex]);
      // Save this to a server
    });
  }
}
