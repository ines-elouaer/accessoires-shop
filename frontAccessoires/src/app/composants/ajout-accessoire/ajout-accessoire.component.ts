import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccessoireService } from '../../services/accessoire.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajout-accessoire',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ajout-accessoire.component.html',
  styleUrl: './ajout-accessoire.component.css'
})
export class AjoutAccessoireComponent implements OnInit {
  formAcc!: FormGroup;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private accessoireService: AccessoireService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formAcc = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      prix: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  submit(): void {
    if (this.formAcc.valid) {
      const formData = new FormData();
      formData.append('nom', this.formAcc.get('nom')?.value);
      formData.append('description', this.formAcc.get('description')?.value);
      formData.append('prix', this.formAcc.get('prix')?.value);

      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }

      this.accessoireService.addAccessoire(formData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Accessoire ajouté',
            text: 'Votre accessoire a été enregistré avec succès !',
            confirmButtonColor: '#3085d6'
          }).then(() => {
            this.router.navigate(['/liste']);
          });
        },
        error: (err) => {
          console.error('Erreur lors de l’ajout :', err);
          Swal.fire('Erreur', 'Une erreur est survenue.', 'error');
        }
      });
    } else {
      Swal.fire('Invalide', 'Veuillez remplir tous les champs.', 'warning');
    }
  }
}
