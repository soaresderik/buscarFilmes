document.getElementById('formulario').addEventListener('submit', pesquisarFilme);

function pesquisarFilme(e){
	var filmePesquisa = document.getElementById('pesquisar').value;
	buscaFilmes(filmePesquisa);
	e.preventDefault();
}

function buscaFilmes(filmePesquisa){
	axios.get('http://www.omdbapi.com/?s=' + filmePesquisa)
  .then(function (response) {
    console.log(response);
    var filmes = response.data.Search;
    var mostrarFilmes = '';

    for(var i = 0; i < filmes.length; i++){
    	mostrarFilmes += `
			  <div class="col-sm-6 col-md-4">
			    <div class="thumbnail">
			      <img src="${filmes[i].Poster}" class="img-thumbnail">
			        <h4>${filmes[i].Title}</h4>
			        <p><a href="#" class="btn btn-primary" role="button" onclick="filmeDetalhes('${filmes[i].imdbID}')">Ver Detalhes</a></p>
			      </div>
			    </div>
			  </div>
    	`;
    }

    document.getElementById('filmes').innerHTML = mostrarFilmes;
  })
  .catch(function (error) {
    console.log(error);
  });
}

function filmeDetalhes(id){
	sessionStorage.setItem('filmeID', id);
	window.location = 'detalhes.html';
	return false;
}

function mostraFilme(){
	var filmeID = sessionStorage.getItem('filmeID');

	axios.get('http://www.omdbapi.com/?i=' + filmeID)
  .then(function (response) {
  	var filme = response.data;
    console.log(filme);
    var mostraFilme = `
                          <div class="col-md-6">
                            <img src="${filme.Poster}" class="img-responsive">
                              <h3><strong>${filme.Title}</strong></h3>
                          </div>
                          <div class="col-md-6">
                            <div class="well clearfix">
                              <ul class="list-group">
                                <li class="list-group-item"><strong>Gênero:</strong>${filme.Genre}</li>
                                <li class="list-group-item"><strong>Lancamento:</strong>${filme.Released}</li>
                                <li class="list-group-item"><strong>Duração:</strong>${filme.Runtime}</li>
                                <li class="list-group-item"><strong>Idiomas:</strong>${filme.Language}</li>
                                <li class="list-group-item"><strong>Prêmios:</strong>${filme.Awards}</li>
                                <li class="list-group-item"><strong>Atores:</strong>${filme.Actors}</li>
                              </ul>

                              <h3>Descrição</h3>
                              ${filme.Plot}
                              <hr>
                              <a href="http://imdb.com/title/${filme.imdbID}" target="_blank" class="btn btn-success pull-left">Ver no iMDB</a>
                              <a href="index.html" class="btn btn-default pull-right">Voltar a Pesquisar</a>
                            </div>
                          </div>
    `;

    document.getElementById('filmes').innerHTML = mostraFilme;
  })
  .catch(function (error) {
    console.log(error);
  });

}
