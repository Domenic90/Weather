import { Component, OnInit, EventEmitter} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  public weatherSearchForm: any;

  public weatherData: any;

  //istanza di un nuovo oggetto per gli eventi nel tag button
  city = new EventEmitter<string>();

  //nel costruttore dichiaro le variabili e assegno il tipo in base a ciò che mi occorre importando i moduli e i servizi
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  //richiamo variabili in ngOnInit per farle partire subito dopo aver inserito i dati nel form html
  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location: [''],
    });
  }

  //metodo per richiesta e lettura dati da api.service
  sendToAPI(formValues: any) {
    this.apiService.getWeather(formValues.location).subscribe((data) => {
      this.weatherData = data;
      console.log(this.weatherData);
    });
  }

  //metodo per la gestione degli eventi nel tag button
  getCittaInput(city: any) {
    this.city.emit(city.target.value);
  }
}
