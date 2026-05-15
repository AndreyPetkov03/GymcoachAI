import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { createClient } from '@supabase/supabase-js';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

const supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

@Injectable({ providedIn: 'root' })
export class GeminiService {
  constructor(private http: HttpClient) {}

  sendMessage(personaId: string, history: ChatMessage[], userText: string): Observable<string> {
    return new Observable(observer => {
      // Call Supabase Edge Function instead of Gemini directly
      supabase.functions.invoke('chat', {
        body: {
          personaId,
          history: history.map(msg => ({
            isUser: msg.role === 'user',
            text: msg.parts[0].text
          })),
          userText
        }
      }).then(({ data, error }) => {
        if (error) {
          console.error('Supabase function error:', error);
          observer.error(error);
          return;
        }
        
        console.log('Supabase response:', data);
        observer.next(data.response || 'No response.');
        observer.complete();
      }).catch(err => {
        console.error('Supabase invocation error:', err);
        observer.error(err);
      });
    });
  }
}
