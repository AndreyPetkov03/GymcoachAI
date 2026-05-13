import { Component, signal, inject, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService, ChatMessage } from '../../services/gemini';

export interface Persona {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  color: string;
  glow: string;
}

export interface Message {
  from: 'user' | 'coach';
  text: string;
}

@Component({
  selector: 'app-home',
  imports: [NgClass, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewChecked {
  @ViewChild('messagesEl') private messagesEl!: ElementRef<HTMLElement>;

  private gemini = inject(GeminiService);
  personas: Persona[] = [
    {
      id: 'beast',
      name: 'Coach Brah',
      role: 'Powerlifting & Strength',
      description: 'No excuses. Pure iron. Brah will push you past every limit you thought you had.',
      image: 'CoachBrah.png',
      color: '#ff4d4d',
      glow: 'rgba(255, 77, 77, 0.4)',
    },
    {
      id: 'zen',
      name: 'Coach Zen',
      role: 'Mindful Fitness & Yoga',
      description: 'Balance your body and mind. Zen guides you through movement, breath, and recovery.',
      image: 'CoachZen.png',
      color: '#6c63ff',
      glow: 'rgba(108, 99, 255, 0.4)',
    },
    {
      id: 'runner',
      name: 'Coach Runner',
      role: 'Cardio & Endurance',
      description: 'Miles over excuses. Runner keeps you moving, breathing, and crushing your goals.',
      image: 'CoachRunner.png',
      color: '#f5a623',
      glow: 'rgba(245, 166, 35, 0.4)',
    },
    {
      id: 'stacy',
      name: 'Coach Stacy',
      role: 'HIIT & Fat Loss',
      description: 'High energy, high results. Stacy turns every session into a calorie-torching mission.',
      image: 'CoachStacy.png',
      color: '#f43f8e',
      glow: 'rgba(244, 63, 142, 0.4)',
    },
  ];

  selectedIndex = signal(1);
  chatOpen      = signal(false);
  messages      = signal<Message[]>([]);
  inputText     = '';
  isLoading     = signal(false);
  private apiHistory: ChatMessage[] = [];
  private shouldScroll = false;

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  private scrollToBottom() {
    const el = this.messagesEl?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }

  get activePersona(): Persona {
    return this.personas[this.selectedIndex()];
  }

  select(index: number) {
    this.selectedIndex.set(index);
  }

  startChat() {
    this.apiHistory = [];
    const opening = `Hey! I'm ${this.activePersona.name}. Ready to get to work? Tell me your goal.`;
    this.messages.set([{ from: 'coach', text: opening }]);
    this.apiHistory.push({ role: 'model', parts: [{ text: opening }] });
    this.chatOpen.set(true);
    this.shouldScroll = true;
  }

  closeChat() {
    this.chatOpen.set(false);
  }

  sendMessage() {
    const text = this.inputText.trim();
    if (!text || this.isLoading()) return;

    this.messages.update(m => [...m, { from: 'user', text }]);
    this.inputText = '';
    this.isLoading.set(true);
    this.shouldScroll = true;

    this.gemini.sendMessage(this.activePersona.id, this.apiHistory, text).subscribe({
      next: (reply) => {
        this.apiHistory.push({ role: 'user',  parts: [{ text }] });
        this.apiHistory.push({ role: 'model', parts: [{ text: reply }] });
        this.messages.update(m => [...m, { from: 'coach', text: reply }]);
        this.isLoading.set(false);
        this.shouldScroll = true;
      },
      error: (err) => {
        const status = err?.status;
        let msg = "Sorry, something went wrong. Try again!";
        if (status === 429) msg = "Rate limit reached — give it a few seconds and try again.";
        else if (status === 400) msg = "Bad request — something went wrong with the message format.";
        else if (status === 403) msg = "API key invalid or unauthorized.";
        this.messages.update(m => [...m, { from: 'coach', text: msg }]);
        this.isLoading.set(false);
        this.shouldScroll = true;
      }
    });
  }

  // px distance between card centres (card width + gap)
  private readonly STEP = 300;

  getPosition(i: number): 'active' | 'left' | 'right' | 'hidden' {
    const len = this.personas.length;
    const sel = this.selectedIndex();
    if (i === sel) return 'active';
    if (i === (sel + 1) % len) return 'left';
    if (i === (sel - 1 + len) % len) return 'right';
    return 'hidden';
  }

  getTransform(i: number): string {
    const pos = this.getPosition(i);
    switch (pos) {
      case 'left':   return `translateX(-${this.STEP}px) scale(0.82)`;
      case 'active': return `translateX(0)              scale(1)`;
      case 'right':  return `translateX(${this.STEP}px)  scale(0.82)`;
      default:       return `translateX(0)              scale(0.5)`;
    }
  }
}
