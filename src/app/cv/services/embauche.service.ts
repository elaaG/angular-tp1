import { Injectable, signal } from '@angular/core';
import { Cv } from '../model/cv';

@Injectable({
  providedIn: 'root',
})
export class EmbaucheService {
  private readonly _embauchees = signal<Cv[]>([]);
  readonly embauchees = this._embauchees.asReadonly();

  /**
   * Embauche une personne si elle ne l'est pas encore
   * Sinon il retourne false
   */
  embauche(cv: Cv): boolean {
    if (this._embauchees().some((embauchee) => embauchee.id === cv.id)) {
      return false;
    }
    this._embauchees.update((embauchees) => [...embauchees, cv]);
    return true;
  }
}
