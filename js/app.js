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

	var dataChart = {};
	var ctx = document.getElementById("graficoResumo").getContext("2d");
	Chart.defaults.global = {
		responsive: true
	}
	

	var getApi = function(){
		$http.get("https://sheetsu.com/apis/ede2a696").success(function(api){
			dataChart.labels = api.result.map(function(mes){
				return mes.mes;
			});

			dataChart.datasets = [
				{
					label: "Receita",
					fillColor: "rgba(220,220,220,0.5)",
		            strokeColor: "rgba(220,220,220,0.8)",
		            highlightFill: "rgba(220,220,220,0.75)",
		            highlightStroke: "rgba(220,220,220,1)",
					data: api.result.map(function(data){
						return data.receita;
					})
				},
				{
					label: "Despesa",
					fillColor: "rgba(151,187,205,0.5)",
		            strokeColor: "rgba(151,187,205,0.8)",
		            highlightFill: "rgba(151,187,205,0.75)",
		            highlightStroke: "rgba(151,187,205,1)",
					data: api.result.map(function(data){
						return data.despesa;
					})
				},
				{
					label: "Investimento",
					fillColor: "rgba(11,187,205,0.5)",
		            strokeColor: "rgba(151,187,205,0.8)",
		            highlightFill: "rgba(151,187,205,0.75)",
		            highlightStroke: "rgba(151,187,205,1)",
					data: api.result.map(function(data){
						return data.investimento;
					})
				}
			];

			console.log(dataChart);
			var graficoResumo = new Chart(ctx).Bar(dataChart, {
				barShowStroke: false
			});
		});
	}

	getApi();

	

	$scope.postApi = function(data){
		var mes;
		var date = new Date();
		var ano = date.getFullYear();
		ano = ano.toString().slice(2);

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