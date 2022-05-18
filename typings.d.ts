declare module "*.json" {
    const value: any;
    export default value;
}
declare global {
    interface Window { Pageable: any; }
    function initD3TechStackBubble(onReady: (runAnimation: () => any) => any): any
}

export {};
