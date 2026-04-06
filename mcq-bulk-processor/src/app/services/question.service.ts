import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParsedQuestion, ParseRequest, ParsedFlatQuestion } from '../models/question.model';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  // Live backend deployed on Render.
  private readonly API_URL = 'https://new-question-submission.onrender.com';

  constructor(private http: HttpClient) {}

  /** Step 1: POST /convert — raw text → structured questions */
  convertText(rawText: string): Observable<ParsedQuestion[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    return this.http.post<ParsedQuestion[]>(`${this.API_URL}/convert`, rawText, { headers });
  }

  /** Step 2: POST /parse — sends questions + metadata to backend */
  parseQuestions(payload: ParseRequest): Observable<ParsedFlatQuestion[]> {
    return this.http.post<ParsedFlatQuestion[]>(`${this.API_URL}/parse`, payload);
  }

  /** Step 3: GET /export — trigger browser file download */
  exportToExcel(): void {
    window.location.href = `${this.API_URL}/export`;
  }
}
