import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comunidades-form',
  templateUrl: './comunidades-form.component.html',
  styleUrls: ['./comunidades-form.component.scss']
})
export class ComunidadesFormComponent {
  public name: string = "";
  public description: string = "";
  public maxMembers: number = 50;
  public comunidadForm!: FormGroup;

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
  }

  get title() {
    return this.titleService.getTitle();
  }

  ngOnInit(): void {
    this.titleService.setTitle("Crea tu comunidad!");

    this.comunidadForm = this.formBuilder.group({
      name: ['', Validators.required, Validators.minLength(5)],
      description: ['', Validators.required, Validators.minLength(10)],
      maxMembers: ['50', Validators.min(1)],
    });
  }
}
