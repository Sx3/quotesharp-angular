define(['app'], function (app) {
	app
	.factory('ResponseFunctions', [
		function () {
			return {
				displayFeedback: function (response, status) {
					if (status === 200)
					{
						var list = "";
						for (i in response.msg)
						{
							list += response.msg[i]+' , ';
						}
						
						var successful = {
							alertHidden: false,
							customAlert: 'alert-success',
							feedback: list
						};
						return successful;
					}
					else
					{
						var list = "<ul>";
						for (i in response.msg)
						{
							list += "<li>"+response.msg[i]+"</li>";
						}
						list+="</ul>";

						var unsuccessful = {
							alertHidden: false,
							customAlert: 'alert-danger',
							feedback: list
						};
						return unsuccessful;
					}

				}
			};
		}
	]);
});

