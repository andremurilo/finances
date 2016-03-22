var app = angular.module('finances', []);

app.controller('main', function($scope, $http){
	$scope.app = "Finanças";
	$scope.data = {};
	$scope.tipos = [
		"combustível",
		"estacionamento",
		"medicamentos",
		"comida",
		"restaurante",
		"mercado",
		"celular",
		"cinema",
		"jogos",
		"roupas",
		"presentes",
		"outros"
	];

	$scope.postApi = function(data){
		var mes;
		var date = new Date();
		var mesDate = date.getMonth();
		var ano = date.getFullYear();
		ano = ano.toString().slice(2);

		switch(mesDate){
			case 0:
				mes = "Janeiro";
				break;
			case 1:
				mes = "Fevereiro";
				break;
			case 2:
				mes = "Março";
				break;
			case 3:
				mes = "Abril";
				break;
			case 4:
				mes = "Maio";
				break;
			case 5:
				mes = "Junho";
				break;
			case 6:
				mes = "Julho";
				break;
			case 7:
				mes = "Agosto";
				break;
			case 8:
				mes = "Setembro";
				break;
			case 9:
				mes = "Outubro";
				break;
			case 10:
				mes = "Novembro";
				break;
			case 11:
				mes = "Dezembro";
				break;
		}

		data.mes = mes + "/" + ano;

		if(data.mes !== "" && data.tipo !== "" && data.valor !== ""){
			$http({
				method: "post",
				url: "https://sheetsu.com/apis/01df4f65",
				data: data,
				headers: { 'Content-Type': 'application/json' }
			}).success(function(){
				Materialize.toast('Despesa registrada', 4000);
			}).error(function(){
				Materialize.toast('Erro', 4000);
			});
		}
	}
});

app.filter("camel", function () {
	return function (input) {
		var listaDeNomes = input.split(" ");
		var listaDeNomesFormatada = listaDeNomes.map(function (nome) {
			if (/(da|de)/.test(nome)) return nome;
			return nome.charAt(0).toUpperCase() + nome.substring(1).toLowerCase();
		});
		return listaDeNomesFormatada.join(" ");
	};
});