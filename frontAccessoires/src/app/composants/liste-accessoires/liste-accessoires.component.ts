import { Component, OnInit } from '@angular/core';
import { AccessoireService } from '../../services/accessoire.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-liste-accessoires',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './liste-accessoires.component.html',
  styleUrl: './liste-accessoires.component.css'
})
export class ListeAccessoiresComponent implements OnInit {
  accessoires: any[] = [];
  filteredAccessoires: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 4;
  searchTerm: string = '';

  constructor(private accessoireService: AccessoireService) {}

  ngOnInit(): void {
    this.loadAccessoires();
  }

  // Chargement initial
  loadAccessoires(): void {
    this.accessoireService.getAccessoires().subscribe(data => {
      this.accessoires = data;
      this.filterAccessoires();
    });
  }

  // Suppression avec confirmation SweetAlert
  supprimer(id: string): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.accessoireService.deleteAccessoire(id).subscribe(() => {
          this.loadAccessoires();
          Swal.fire('Supprimé !', 'L’accessoire a été supprimé.', 'success');
        });
      }
    });
  }

  // Filtrage par recherche
  filterAccessoires(): void {
    this.filteredAccessoires = this.accessoires.filter(acc =>
      acc.nom?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1;
  }

  // Pagination
  get paginatedAccessoires(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAccessoires.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredAccessoires.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }
}
