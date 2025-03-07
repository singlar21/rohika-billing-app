import { Database, ref, get, set, update } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  constructor(private db: Database) {}

  async incrementVisit() {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const visitRef = ref(this.db, `visits/${today}`);

    const snapshot = await get(visitRef);
    if (snapshot.exists()) {
      const currentCount = snapshot.val().count || 0;
      await update(visitRef, { count: currentCount + 1 });
    } else {
      await set(visitRef, { count: 1 });
    }
  }

  async getVisitCount(): Promise<number> {
    const today = new Date().toISOString().split('T')[0]; // Get YYYY-MM-DD
    const visitRef = ref(this.db, `visits/${today}`);

    const snapshot = await get(visitRef);
    return snapshot.exists() ? snapshot.val().count : 0;
  }

  getTotalVisitCount(): Observable<number> {
    const visitRef = ref(this.db, `visits`);
    return from(get(visitRef).then(snapshot => {
      if (!snapshot.exists()) return 0; // No data yet

      const data = snapshot.val();
      return Object.values(data).reduce((sum: number, entry: any) => sum + (entry.count || 0), 0);
    }));
  }
  
}
