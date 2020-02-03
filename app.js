//Film Class: Represents a Film
class Film {
  constructor(title, director, year) {
    this.title = title;
    this.director = director;
    this.year = year;
  }
}

//UI Class: Handle UI Tasks
class UI {
  static displayFilms() {
    const StoredFilms = Store.getFilms();

    const films = StoredFilms;
    //This method is responsible for adding film to list
    //Below is the forEach loop to loop through the list
    //MethodBelow
    films.forEach((film) => UI.addFilmToList(film));
  }

  static addFilmToList(film) {
    //List that grabs from DOM
    const list = document.querySelector("#film-list");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${film.title}</td> 
        <td>${film.director}</td>
        <td>${film.year}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">
        X</a></td>
        `;
    // 
    list.appendChild(row);
  }
  static deleteFilm(el){
      if(el.classList.contains('delete')){
        el.parentElement.parentElement.remove();
      }
  }
      //Create Element Div using Javascript
      //Creating an Alert for the field Validation
      //Using JS and Bootstrap
  static showAlert(message, className){
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#film-form');
      container.insertBefore(div, form);
      //Vanish alert box in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(),
      3000);
  }
 
  static clearFields(){
      document.querySelector('#title').value ='';
      document.querySelector('#director').value ='';
      document.querySelector('#year').value ='';
  }
}

//Store Class: Handles Storage
class Store{
   static getFilms(){
    let films;
    if(localStorage.getItem('films')===null){
        films = [];
    } else {
        films = JSON.parse(localStorage.getItem('films'));
    }
    return films;

    }

   static addFilm(film){
       const films = Store.getFilms();
       films.push(film);
       localStorage.setItem('films', JSON.stringify(films));
}

static removeFilm(year){
    const films = Store.getFilms();

    films.forEach((film, index) =>{
        if(film.year === year){
            films.splice(index, 1);
    }
    });
    localStorage.setItem('films', JSON.stringify(films));
}
}
//Event: Display Films
document.addEventListener("DOMContentLoaded", UI.displayFilms);
//Event: Add a Film
document.querySelector('#film-form').addEventListener('submit', (e) => {
    //Prevent Actual Submit
    e.preventDefault();
    //Get Form Values
    const title = document.querySelector('#title').value;
    const director = document.querySelector('#director').value;
    const year = document.querySelector('#year').value;

    //Validate
    if(title === '' || director === '' || year === '') {
        UI.showAlert('Please fill in all empty fields', 'danger');
    } else {
        //Instatiate film
        const film = new Film(title, director, year);
//d
    //Add Film to UI
        UI.addFilmToList(film);

    //Add FIlm to local storage
        Store.addFilm(film);

    //Show Success Message

    UI.showAlert('Film Added', 'success');

    //Clear All Films from List
        UI.clearFields();
    }
});
//Event: Remove a Film
document.querySelector('#film-list').addEventListener('click', (e)=> {
    UI.deleteFilm(e.target)

//remove film from local storage
Store.removeFilm
(e.target.parentElement.previousElementSibling.textContent);

    //show success message of deleted film
    UI.showAlert('Film Deleted', 'info');
});
