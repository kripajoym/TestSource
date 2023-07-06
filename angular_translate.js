/*when using angular-translate and variable content, the result will not be escaped correctly. This means your app is vulnerable for serious attacks.

 

Currently there is an issue with the sanitize mode, it will double encode UTF-8 characters or special characters. Recommendation: use the 'escape' strategy, until this is resolved.

Additionally, there are this defaults only valid for version 2:

null: nothing, unsecure default (will be removed in 3.0)
escaped: alias for 'escapeParameters' for backwards compatibility (since 2.7.0, will be removed in 3.0)
We enforce being completely backwards compatible, which means the escaping is disabled by default.

{{$translateProvider.useSanitizeValueStrategy(null); }}

However, we will enable the more secure variant sanitize in the future by default.

{{$translateProvider.useSanitizeValueStrategy('sanitize'); }}

We strongly recommend a secure strategy. Therefore a warning will be displayed as long as no strategy has been chosen explicitly.*/

//Code Snippet - Not sanitized or escaped

//In index.html

<!doctype html>
<html ng-app="myApp_not_escaped">
<head>
<script src="https://cdn.rawgit.com/SlexAxton/messageformat.js/v1.0.2/messageformat.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular-animate.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular-cookies.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular-sanitize.js"></script>
<script src="https://cdn.rawgit.com/angular-translate/bower-angular-translate/2.18.1/angular-translate.js"></script>
<script src="https://cdn.rawgit.com/angular-translate/bower-angular-translate-interpolation-messageformat/2.18.1/angular-translate-interpolation-messageformat.js"></script>
<script src="https://cdn.rawgit.com/angular-translate/bower-angular-translate-storage-cookie/2.18.1/angular-translate-storage-cookie.js"></script>
<script src="https://cdn.rawgit.com/angular-translate/bower-angular-translate-storage-local/2.18.1/angular-translate-storage-local.js"></script>
<script src="https://cdn.rawgit.com/angular-translate/bower-angular-translate-loader-url/2.18.1/angular-translate-loader-url.js"></script>
<script src="https://cdn.rawgit.com/angular-translate/bower-angular-translate-loader-static-files/2.18.1/angular-translate-loader-static-files.js"></script>
<script src="https://cdn.rawgit.com/angular-translate/bower-angular-translate-handler-log/2.18.1/angular-translate-handler-log.js"></script>
<script src="script.js"></script>
</head>
<body>

<div ng-controller="Ctrl">
<p>{{ 'HEADLINE' | translate }}</p>
<p translate="PARAGRAPH" translate-values="{username: '<span style=\'color:red;\'>HACKED</span>'}"></p>
</div>

</body>
</html>

var translations = {
HEADLINE: 'XSS possible!',
PARAGRAPH: 'Hello username!',
};

var app = angular.module('myApp_not_escaped', ['pascalprecht.translate']);

app.config(['$translateProvider', function ($translateProvider) {
$translateProvider.translations('en', translations);
$translateProvider.preferredLanguage('en');
// Using standard escaping (nothing)
}]);

app.controller('Ctrl', ['$scope', function ($scope) {

}]);