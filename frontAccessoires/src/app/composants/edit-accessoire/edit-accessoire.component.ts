import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccessoireService } from '../../services/accessoire.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-accessoire',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-accessoire.component.html',
  styleUrl: './edit-accessoire.component.css'
})
export class EditAccessoireComponent implements OnInit {
  formAcc!: FormGroup;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private accessoireService: AccessoireService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.formAcc = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      prix: [0, [Validators.required, Validators.min(0)]]
    });

    this.accessoireService.getAccessoires().subscribe(data => {
      const acc = data.find((a: any) => a._id === this.id);
      if (acc) {
        this.formAcc.patchValue(acc);
      }
    });
  }

  update(): void {
    this.accessoireService.updateAccessoire(this.id, this.formAcc.value).subscribe(() => {
      this.router.navigate(['/liste']);
    });
  }
}
