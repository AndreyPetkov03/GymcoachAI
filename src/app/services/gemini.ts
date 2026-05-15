import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

@Injectable({ providedIn: 'root' })
export class GeminiService {
  constructor(private http: HttpClient) {}

  sendMessage(personaId: string, history: ChatMessage[], userText: string): Observable<string> {
    const url = `${environment.supabaseUrl}/functions/v1/chat`;
    
    const body = {
      personaId,
      history: history.map(msg => ({
        isUser: msg.role === 'user',
        text: msg.parts[0].text
      })),
      userText
    };

    console.log('Calling Supabase function:', url);
    console.log('Request body:', body);

    return from(
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${environment.supabaseKey}`
        },
        body: JSON.stringify(body)
      })
      .then(async res => {
        if (!res.ok) {
          const errorText = await res.text();
          console.error('Response error:', res.status, errorText);
          throw new Error(`HTTP ${res.status}: ${errorText}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Function response:', data);
        return data.response || 'No response.';
      })
    );
  }
}
