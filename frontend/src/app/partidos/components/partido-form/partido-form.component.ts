import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgSelectOption } from '@angular/forms';
import { ICancha } from 'src/interfaces/ICancha';
import { CanchasService } from '../../services/canchas.service';

@Component({
  selector: 'app-partido-form',
  templateUrl: './partido-form.component.html',
  styleUrls: ['./partido-form.component.scss']
})
export class PartidoFormComponent {
  public form!: FormGroup;
  public canchas!: ICancha[];
  constructor(public formBuilder: FormBuilder, private canchasService:CanchasService){}
  ngOnInit(){
    this.form = this.formBuilder.group({
      fechaprogramada: ['', Validators.required],
      canchaid: ['', Validators.required]
    });
    this.canchasService.getMatchingCanchas().subscribe(
      {
        next: (res) => {this.canchas = res;}
      }
    )
  }
  public createMatch(){
    console.log(this.form.get('fechaprogramada')!.value);
    console.log(this.form.get('canchaid')!.value);
  }
}
