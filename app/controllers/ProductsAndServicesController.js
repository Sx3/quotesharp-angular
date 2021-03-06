define(['app', 'jquery', 'QuotesharpAPI', 'services/ResponseFunctions'], function (app, $) {
	app
	.controller('ProductsAndServicesController', [
		'$scope',
		'$location',
		'QuotesharpAPI',
		'ResponseFunctions',
		function (
		$scope,
		$location,
		QuotesharpAPI,
		ResponseFunctions
		) {
			if (!localStorage.authenticated) {
				$location.path('/login');
			}
			getProductsAndServices();
			getCategoriesForHtmlSelect();
			$scope.responseAlert = {};
			$scope.responseAlert.alertHidden = true;

			$scope.loggedUser = localStorage.username;
			$scope.userOrganization = localStorage.organization;

			$scope.logout = function () {
				QuotesharpAPI.auth.logout()
				.success(function () {
					localStorage.clear();

					$location.path('/login');
				});
			};


			function getProductsAndServices()
			{
				$scope.newProductStatus = true;
				QuotesharpAPI.productsAndServices.getAllProductsAndServices()
				.success(function (response) {
					$scope.productsAndServices = response.data;
				})
				.error(function (response) {

				});
			}

			function getCategoriesForHtmlSelect() {
				QuotesharpAPI.categories.getCategoriesForHtmlSelect()
				.success(function (response) {
					$scope.htmlCategories = response.data;
				})
				.error(function (response) {

				});
			}

			$scope.saveNewProduct = function (newProductCode, newProductName, newProductPrice, newProductDetails, newProductParent, newProductStatus)
			{

				QuotesharpAPI.productsAndServices.saveNewProductOrService(newProductCode, newProductName, newProductPrice, newProductDetails, newProductParent, newProductStatus)
				.success(function (response, status) {
					clearNewProductInputs();
					getCategoriesForHtmlSelect();
					getProductsAndServices();
					$scope.responseAlert = ResponseFunctions.displayFeedback(response, status);
				})
				.error(function (response, status) {
					$scope.responseAlert = ResponseFunctions.displayFeedback(response, status);
				});
			};

			$scope.updateProduct = function (productData) {

				QuotesharpAPI.productsAndServices.updateProductOrService(productData)
				.success(function (response, status) {
					getProductsAndServices();
					getCategoriesForHtmlSelect();
					$scope.responseAlert = ResponseFunctions.displayFeedback(response, status);
				})
				.error(function (response, status) {
					$scope.responseAlert = ResponseFunctions.displayFeedback(response, status);
				});
			};
			function clearNewProductInputs() {
				$scope.newProductCode = null;
				$scope.newProductName = null;
				$scope.newProductPrice = null;
				$scope.newProductDetails = null;
				$scope.newProductParent = null;
				$scope.newProductStatus = null;
			}
		}]);
});

