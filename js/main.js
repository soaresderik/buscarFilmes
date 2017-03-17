document.getElementById('formulario').addEventListener('submit', pesquisarFilme);

function pesquisarFilme(e){
	var filmePesquisa = document.getElementById('pesquisar').value;
	getFilmes(filmePesquisa);

	e.preventDefault();
}

function getFilmes(filmePesquisa){
axios.get('http://www.omdbapi.com?s=' + filmePesquisa)
  .then(function (response) {
    console.log(response);
    var filmes = response.data.Search;
    var mostrarFilmes = '';

    for(var i = 0; i < filmes.length; i++){
    	mostrarFilmes += '<div class="col-sm-6 col-md-4">' +
    					 		'<div class="thumbnail ">' +
    					 	      ' <img src="'+ filmes[i].Poster +'" class="img-thumbnail clearfix">' +
    					 	      	'<div class="caption">'+
    					 	      	'<h5>' + filmes[i].Title +'</h5>' +
    					 	      	'<p><a href="#" class="btn btn-primary clearfix" role="button" onclick="filmeDetalhes(\'' + filmes[i].imdbID +'\')">Mais Detalhes</a></p>' +
    					 	      	'</div>' +
    							'</div>' +
    					 '</div>';
    }

    document.getElementById('filmes').innerHTML = mostrarFilmes;
  })
  .catch(function (error) {
    console.log(error);
  });
}


function filmeDetalhes(id){
	sessionStorage.setItem('filmeID', id);
	window.location = 'filme.html';
	return false;
}

function mostraFilme(){
	var filmeID = sessionStorage.getItem('filmeID');

axios.get('http://www.omdbapi.com?i=' + filmeID)
  .then(function (response) {
    console.log(response);
    var filme = response.data;
    console.log(filme);
    var mostrarFilmes = `

			<div class="row">
				<div class="col-md-6">
				<img src="${filme.Poster}" class="img-responsive" >
					<h3><strong>${filme.Title}</strong></h3>
				</div>
				<div class="col-md-6">
					<div class="well">
						<ul class="list-group">
							<li class="list-group-item"><strong>Gênero:</strong>${filme.Genre}</li>
							<li class="list-group-item"><strong>Lançamento:</strong>${filme.Released}</li>
							<li class="list-group-item"><strong>Avaliado por:</strong>${filme.Rated}</li>
							<li class="list-group-item"><strong>IMDB avaliação:</strong>${filme.imdbRating}</li>
							<li class="list-group-item"><strong>Diretor:</strong>${filme.Director}</li>
							<li class="list-group-item"><strong>Escritor:</strong>${filme.Writer}</li>
							<li class="list-group-item"><strong>Atores:</strong>${filme.Actors}</li>
						</ul>
							<h3>Descrição</h3>
							${filme.Plot}
							<hr>
							<a href="http://imdb.com/title/${filme.imdbID}" target="_blank" class="btn btn-success">Ver no iMDB</a><br>
							<a href="index.html" class="btn btn-default">Voltar a Pesquisar</a>
					</div>
				</div>
			</div>
		`;

    document.getElementById('filmes').innerHTML = mostrarFilmes;
  })
  .catch(function (error) {
    console.log(error);
  });
}