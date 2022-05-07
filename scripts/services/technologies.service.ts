import { Technology } from '../models';

export default function TechnologiesService(angular: any) {
    angular.module('portfolio')
        .service('technologiesService', ['$http', function($http: any) {
            const technologiesPromise = $http.get('./technologies.json');
            this.getTechnologies = function (): Technology[] {
                return technologiesPromise;
            }
        }]);
}