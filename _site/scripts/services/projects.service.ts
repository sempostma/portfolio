import { Project } from '../models';

export default function ProjectsService(angular: any) {
    angular.module('portfolio')
        .service('projectsService', ['$http', function($http: any) {
            this.getProjects = function (): Project[] {
                return $http.get('./projects.json');
            }
        }]);
}