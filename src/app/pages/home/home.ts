import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

export interface Persona {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
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

  constructor(private router: Router) {}

  select(index: number) {
    this.selectedIndex.set(index);
  }

  startChat() {
    const persona = this.personas[this.selectedIndex()];
    this.router.navigate(['/chat', persona.id]);
  }
}
