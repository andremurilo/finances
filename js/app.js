var app = angular.module('finances', ['zingchart-angularjs']);

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
		var ano = date.getFullYear().toString().slice(2);

		var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

		data.mes = meses[date.getMonth()] + "/" + ano;
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

app.controller('graficos', function($scope, $http){

	var getApi = function(){
		$http.get("https://sheetsu.com/apis/ede2a696").success(function(api){
			$scope.resumoData = {
				type: "bar",
				"plot": {
					"animation": {
							speed: 2000,
							effect: 4,
							method: 5,
							sequence: 1
						}
					},
				"scale-x": {
					labels: api.result.map(function(data){
								return data.mes;
							})
				},
				"scale-y": {
						"values": "0:2250:250"
					},
				series: [
					{	
						"background-color": ,
						"values": api.result.map(function(data){
							return parseInt(data.receita);
						})
					},
					{
						"values": api.result.map(function(data){
							return parseInt(data.investimento);
						})
					},
					{
						"values": api.result.map(function(data){
							return parseInt(data.despesa);
						})
					}
				]
				
			}
			console.log($scope.resumoData);
		});
	}
	getApi();
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