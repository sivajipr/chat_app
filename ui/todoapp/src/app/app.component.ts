import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, HttpClientModule, CommonModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	title = 'todoapp';
	notes:any = []
	readonly apiUrl = 'http://localhost:8000/'
	constructor(private http:HttpClient){
		
	}

	getNotes(){
		this.http.get(this.apiUrl).subscribe((data)=>{
			console.log('datatdadtdtatdadt', data)
			this.notes = data
		})
	}

	addNote(){
		const name = (<HTMLInputElement>document.getElementById('name')).value
		const description = (<HTMLInputElement>document.getElementById('description')).value
		console.log('hahahahah', name)
		var formData = new FormData()
		formData.append('name', name)
		formData.append('desc', description)

		this.http.post(this.apiUrl+'add', formData).subscribe((data)=>{
			console.log('datatdadtdtatdadt', data)
			alert(data)
			this.getNotes()
		})
	}

	deleteNote(id:any){
		this.http.delete(this.apiUrl+'delete?id='+id).subscribe((data)=>{
			console.log('datatdadtdtatdadt', data)
			alert(data)
			this.getNotes()
		})
	}

	ngOnInit(){
		this.getNotes()
	}
}
