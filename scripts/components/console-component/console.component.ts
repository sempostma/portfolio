
export default function ConsoleComponent (angular: any) {
    angular.module('portfolio')
        .component('console', {
            templateUrl: './scripts/components/console-component/console.component.html',
            bindings: {
                name: '@',
                console: '<'
            },
            controller:['$scope', '$http', function($scope: any, $http: any) {
                const $ctrl = this;
                $ctrl.oldContent = 'Connecting to Server...';
                $ctrl.content = '';
                $scope.init = function() {
                    $http({
                        method: $ctrl.console.testConnection.method,
                        url: $ctrl.console.testConnection.url
                    }).then(function(response: any) {
                        $ctrl.oldContent = '';
                        $ctrl.content = $ctrl.content || $ctrl.console.hint || '';
                    }, function(error: any) {
                        $ctrl.oldContent = ($ctrl.oldContent + '\nfailed to connect to server').trim();
                    })
                }
                $ctrl.keyPressHandler = function(e: KeyboardEvent) {
                    if (e.keyCode === 13) {
                        $ctrl.EnterKeyPressHandler(e);
                        e.preventDefault();
                    }
                }
                $ctrl.consoleClickHandler = function(e: MouseEvent) {
                    const target = <HTMLElement>e.target;
                    if (target.parentElement !== null) {
                        const elem = <HTMLElement>target.parentElement.querySelector('.writable');
                        elem.focus();
                    }
                }
                $ctrl.EnterKeyPressHandler = function(e: KeyboardEvent) {
                    $ctrl.oldContent = ($ctrl.oldContent + '\n' + $ctrl.content).trim();
                    const content = $ctrl.content || '';
                    $ctrl.content = '';
                    $http({
                        method: $ctrl.console.connection.method,
                        data: { 
                            Debug: false,
                            Code: content
                        },
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: $ctrl.console.connection.url
                    }).then(function(response: any) {
                        console.log(response);
                        $ctrl.oldContent = ($ctrl.oldContent + '\n' + (response.data || 'Script was succesfull')).trim();
                    }, function(error: any) {
                        $ctrl.oldContent = ($ctrl.oldContent + '\nfailed to connect to server').trim();
                    });
                }
            }]
        });
}
