import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

export interface Persona {
  id: string;
  name: string;
  role: string;
  description: string;
  emoji: string;
  color: string;
  glow: string;
}

@Component({
  selector: 'app-home',
  imports: [NgClass],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  personas: Persona[] = [
    {
      id: 'beast',
      name: 'Coach Beast',
      role: 'Powerlifting & Strength',
      description: 'No excuses. Pure iron. Beast will push you past every limit you thought you had.',
      emoji: '🏋️',
      color: '#ff4d4d',
      glow: 'rgba(255, 77, 77, 0.4)',
    },
    {
      id: 'zen',
      name: 'Coach Zen',
      role: 'Mindful Fitness & Yoga',
      description: 'Balance your body and mind. Zen guides you through movement, breath, and recovery.',
      emoji: '🧘',
      color: '#6c63ff',
      glow: 'rgba(108, 99, 255, 0.4)',
    },
    {
      id: 'spark',
      name: 'Coach Spark',
      role: 'HIIT & Fat Loss',
      description: 'High energy, high results. Spark turns every session into a calorie-torching mission.',
      emoji: '⚡',
      color: '#f5a623',
      glow: 'rgba(245, 166, 35, 0.4)',
    },
  ];

  selectedIndex = signal(1);

  constructor(private router: Router) {}

  select(index: number) {
    this.selectedIndex.set(index);
  }

  startChat() {
    const persona = this.personas[this.selectedIndex()];
    this.router.navigate(['/chat', persona.id]);
  }
}
