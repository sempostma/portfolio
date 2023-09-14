export interface Project {
    title: string;
    keywords: string[];
    content: string;
    webApp: boolean;
    desktopApp: boolean;
    util: boolean;
    mobileApp: boolean;
}

export interface Technology {
    cat: string;
    name: string;
    value: number;
    icon: string;
    desc: string;    
}