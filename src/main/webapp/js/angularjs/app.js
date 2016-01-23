angular.module('app', [

    // app
    'app.home',
    'app.login',
    // 'app.user',
    'app.auth.service',
    'app.item.service',

    // // dx
    'dx.i18n',
    'dx.modal',
    // 'dx.utils',

    // // google sign in
    'directive.g+signin',
])

.config(['dxI18nProvider', function (dxI18nProvider) {
    dxI18nProvider.setResourceBundle(resourceBundle.messages['pt-br']);
}])

.config(['$urlRouterProvider', function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}])

.factory("dxResourcesBundle", function() {
    return {
        img: img,
        i18n: msg_i18n_pt_br,
    };
})

.factory('dxService', function($http, $q, dxConfig, dxPromise) {

    return function(url) {

        this.promise = dxPromise;

        this.url = function() {
            return dxConfig.apiUrl + '/' + url;
        };
    };

})

.filter('dxImg', [ function() { // FIXME
    return function(input) {
        return input ? resourceBundle.images[input] : input;
    };
}])

.run(function($rootScope, dxConfig) {
    $rootScope.googleClientId = dxConfig.settings.googleClientId;
})

.run(function($state, $rootScope, authService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, fromState) {
        if(toState.data && toState.data.requiresLogin && !authService.isAuthenticated()) {
            event.preventDefault();
            $state.go('login');
        }
    });
})

.service('yawpService', function($http, $q, dxConfig) {

    this.fetch = function() {
        // TODO
    };

    this.where = function() {
        // TODO
    };

})

.value('dxConfig', {
    rootUrl: window.location.protocol + '//' + window.location.host,
    apiUrl: this.rootUrl + '/api',
    settings: {
        googleClientId: '434805178213-3s9o2qb2kh4fau4vaaa64bbu68jiajig',
    },
})