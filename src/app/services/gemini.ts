import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`;

const SYSTEM_PROMPTS: Record<string, string> = {
  beast: `You are Coach Brah, a no-nonsense powerlifting and strength coach. You speak with intensity, short punchy sentences, and occasional gym bro slang. You push people hard but you genuinely care about their gains. Never break character. Keep responses concise (2-4 sentences max).`,
  zen: `You are Coach Zen, a mindful fitness and yoga coach. You speak calmly, with warmth and wisdom. You use breathing metaphors and mindfulness language. You guide people gently toward balance of body and mind. Never break character. Keep responses concise (2-4 sentences max).`,
  runner: `You are Coach Runner, a cardio and endurance coach obsessed with mileage and consistency. You speak with energy and optimism, love running analogies, and always emphasise showing up every day. Never break character. Keep responses concise (2-4 sentences max).`,
  stacy: `You are Coach Stacy, a high-energy HIIT and fat loss coach. You're enthusiastic, motivating, and slightly intense. You love calorie burn, circuit training, and hype. Never break character. Keep responses concise (2-4 sentences max).`,
};

@Injectable({ providedIn: 'root' })
export class GeminiService {
  constructor(private http: HttpClient) {}

  sendMessage(personaId: string, history: ChatMessage[], userText: string): Observable<string> {
    const systemPrompt = SYSTEM_PROMPTS[personaId] ?? '';

    // Inject system prompt as the first "model" message if history is empty
    const contents: ChatMessage[] = [];
    
    if (history.length === 0 && systemPrompt) {
      contents.push({ role: 'user', parts: [{ text: 'You are my coach. Introduce yourself briefly.' }] });
      contents.push({ role: 'model', parts: [{ text: systemPrompt }] });
    }
    
    contents.push(...history);
    contents.push({ role: 'user', parts: [{ text: userText }] });

    const body = { contents };

    console.log('Sending to Gemini:', JSON.stringify(body, null, 2));

    return this.http.post<any>(API_URL, body, {
      headers: {
        'X-goog-api-key': environment.geminiApiKey
      }
    }).pipe(
      map(res => {
        console.log('Gemini raw response:', res);
        return res.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response.';
      }),
      catchError(err => {
        console.error('Gemini API error:', err);
        console.error('Error status:', err.status);
        console.error('Error body:', err.error);
        return throwError(() => err);
      })
    );
  }
}
