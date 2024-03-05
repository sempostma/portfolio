import { Technology } from '../../models';


export default function ProjectComponent (angular: any) {
    angular.module('portfolio')
        .component('project', {
            templateUrl: './scripts/components/project-component/project.component.html',
            bindings: {
                project: '<',
            },
            controller: ['technologiesService', '$sce', function(technologiesService: any, $sce: any) {
                const $ctrl = this;
                
                technologiesService.getTechnologies().then((response: any) => {
                    const technologies = <Technology[]>response.data;
                    const technologieNames = technologies.map(t => t.name);
                    $ctrl.technologies = $ctrl.project.technologies
                        .map((pt: string) => technologies
                        .find(t => t.name.toLowerCase() === pt.toLowerCase()))
                })
                $ctrl.$onInit = function() {
                    $ctrl.project = $ctrl.project;
                    $ctrl.projContentText = $sce.trustAsHtml($ctrl.project.content.text);
                }
            }]
        });
}
