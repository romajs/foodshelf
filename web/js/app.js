angular.module('app', [
    'authService',
    'productService',
    'userService',
    'home',
    'login',
    'history',
    'dx.i18n',
    'dx.modal',
    'directive.g+signin',
    'yawp',
])

.value('config', {
    rootUrl: window.location.protocol + '//' + window.location.host,
    apiUrl: this.rootUrl + '/api',
    settings: {
        googleClientId: '434805178213-3s9o2qb2kh4fau4vaaa64bbu68jiajig',
    },
})

.config(function(yawpProvider) {
    yawpProvider.config(function (c) {
        c.baseUrl('http://localhost:8000/api');
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('about', {
        url: '/about',
        templateUrl: 'templates/about.html',
    }).state('help', {
        url: '/help',
        templateUrl: 'templates/help.html',
    }).state('not_found', {
        url: '/not_found',
        templateUrl: 'templates/not_found.html',
    })
    $urlRouterProvider.when('', function($state) {
       $state.go('home');
    }).when('/', function($state) {
       $state.go('home');
    }).otherwise('not_found');
})

.run(function($http, dxI18n) {
    $http.get('languages/pt-br.json').success(function(json) {
        dxI18n.set('pt-br', json);
    });
})

.run(function($rootScope, config) {
    $rootScope.googleClientId = config.settings.googleClientId;
})

.run(function($rootScope, $window, $state, authService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, fromState) {
        if(toState.data && toState.data.requireAuthentication && !authService.isAuthenticated()) {
            event.preventDefault();
            $state.go('login');
        }
    });
    $rootScope.historyBack = function() {
        $window.history.back();
    };
})
