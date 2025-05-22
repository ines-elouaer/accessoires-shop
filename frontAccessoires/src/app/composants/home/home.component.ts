import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ Import nécessaire

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Ajouter RouterModule ici
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
