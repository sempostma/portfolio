import { Project } from '../../models';
declare var AOS: any;

export default function ProjectsListComponent(angular: any) {
    angular.module('portfolio')
        .component('projectsList', {
            templateUrl: './scripts/components/projects-list-component/projects.list.component.html',
            
            controller: ['projectsService', function (projectsService: any) {
                let loading = true;
                const $ctrl = this;
                $ctrl.filters = {};
                projectsService.getProjects()
                    .then((projects: any) => {
                        $ctrl.projects = <Project[]>projects.data;
                        $ctrl.filteredProjects = $ctrl.projects;
                    });
                $ctrl.isFiltersEmpty = function() {
                    return Object.keys($ctrl.filters).length < 1;
                }
                function escapeRegExp(str: string) {
                    return (str || '').replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
                }
                function applyFilter() {
                    console.log('herer')
                    const searchRegex = new RegExp(escapeRegExp($ctrl.searchStr), 'i');
                    $ctrl.filteredProjects = $ctrl.projects.filter((p: Project) => {
                        return (p.webApp === ($ctrl.filters['webApp'] || p.webApp))
                        && (p.mobileApp === ($ctrl.filters['mobileApp'] || p.mobileApp))
                        && (p.desktopApp === ($ctrl.filters['desktopApp'] || p.desktopApp))
                        && (p.util === ($ctrl.filters['util'] || p.util))
                        && searchRegex.test(p.title)
                            // || searchRegex.test(p.keywords.join(' '))
                            // || searchRegex.test(p.content)
                    });
                }
                $ctrl.filter = function(appType: string) {
                    $ctrl.filters[appType] = !$ctrl.filters[appType]
                    applyFilter();
                }
                $ctrl.search = function() {
                    applyFilter();
                }
                $ctrl.removeFilter = function() {
                    $ctrl.filters = {};
                    applyFilter();
                }

            }]  
        });
}