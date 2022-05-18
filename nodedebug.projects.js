const path = require('path');
const fs = require('fs');

const technologies = require('./client/technologies.json');
const projects =
    [
        {
            title: 'Embedded Testing Language(ETL) for C#',
            keywords: ['ASP', 'NET', 'CORE', '2.0', 'ETL', 'C#', 'Embedded', 'Testing', 'Language'],
            technologies: ['ASPDOTNET', 'C#', 'DOTNET', 'DOTNETCORE', 'NDepend', 'Git', 'Github'],
            console: {
                name: 'ETL',
                testConnection: {
                    url: 'https://afirusportfolio-api.herokuapp.com/api/ETL',
                    method: 'GET'
                },
                connection: {
                    url: 'https://afirusportfolio-api.herokuapp.com/api/ETL',
                    method: 'POST'
                },
                hint: 'ASSERT 2 * 6 / (1 + 3) == 3'
            },
            content: {
                text: `ETL is a work in progress testing language that is written in and is meant for C#.<br />
            It is build upon the ASP .Net Core 2.0 Framework.<br />
            <a href="https://github.com/bunkersem/ETL">View on Github</a>`,
            },
            webApp: false,
            desktopApp: false,
            util: true,
            mobileApp: false
        },
        {
            title: 'Webshop',
            keywords: [],
            technologies: ['ExpressJS', 'Bootstrap', 'Passport', 'Javascript', 'SCSS', 'BabelJS', 'ESLint', 'GulpJS', 'NodeJS', 'JQuery', 'CSS', 'HTML5', 'Git', 'Github'],
            content: {
                text: `
            <a href="https://github.com/bunkersem/project-tango">View on Github</a><br />
            <a href="http://spelletjeskast.herokuapp.com/">View on Heroku</a>`,
                images: [
                    'https://imgur.com/1po4xn2.png',
                    'https://imgur.com/HzeAPGe.png',
                    'https://imgur.com/ZZKwLd7.png',
                    'https://imgur.com/EnWoL7L.png'
                ]
            },
            webApp: true,
            desktopApp: false,
            util: false,
            mobileApp: false
        },
        {
            title: 'OV Fiets App',
            keywords: ['OV', 'Fiets', 'Bike', 'Public Transport'],
            technologies: ['HTML5', 'Cordova', 'OnsenUI', 'JQuery', 'CSS', 'Javascript'],
            content: {
                text: `
            Ov Fiets App is an which helps you easily monitor the amount of bikes at a rental location.
            <a href="https://play.google.com/store/apps/details?id=com.EchoSierraStudio.Ov_Fiets_App">View on Google Play</a><br />
            `,
                images: [
                    'https://imgur.com/P0kanTR.png',
                    'https://imgur.com/H4nI9a1.png',
                    'https://imgur.com/O935est.png',
                    'https://imgur.com/5YeFhbV.png',
                    'https://imgur.com/yynwOhG.png',

                ]
            },
            webApp: false,
            desktopApp: false,
            util: false,
            mobileApp: true,
        },
        {
            title: 'Solar System Newtonian Sim 3D',
            keywords: ['Newtonian', '3D', 'Sim', 'Solar', 'System'],
            technologies: ['Unity3D', 'C#'],
            content: {
                text: `
            Reorganize our solar system, adjust orbits and edit planets with an easy to use interface. You can use this application to learn about orbital mechanics, physics and the solar system. The game is a sandbox type game. When you start playing the solar system will initialize to its real world state using an external API. This means that the game and the real world locations and rotations, etc, of all the planets in our solar system will be synchronized when you start the game.
            <a href="https://play.google.com/store/apps/details?id=com.EchoSierraStudio.NewtonianSimulation3D">View on Google Play</a><br />
            `,
                images: [
                    'https://imgur.com/Ew5OyYO.jpg',
                    'https://imgur.com/qw4OBXe.jpg',
                    'https://imgur.com/8HnFWxp.jpg',
                    'https://imgur.com/pTWcyVp.jpg',
                    'https://imgur.com/vTdY8fo.jpg'
                ]
            },
            webApp: false,
            desktopApp: false,
            util: false,
            mobileApp: true,
        },
        {
            title: 'Top Down Defence',
            keywords: ['Top Down', 'Defence', 'Game'],
            technologies: ['Unity3D', 'C#'],
            content: {
                text: `
            Top Down Defence is a top down - tower defense game, made with the beautiful game asset pack provided by Kenny NL. It has infinite leveling but i doubt you will get further than lvl100. Vindicta features a great variety of enemy types such as the "low health, very fast and difficult to hit" enemies, and the "hard to kill but slow" enemies. The turrets have extensive upgrading capabilities so even in late game stages the game is still hard to beat.
            <a href="https://play.google.com/store/apps/details?id=com.EchoSierraStudio.Vindicta">View on Google Play</a><br />
            `,
                images: [
                    'https://imgur.com/7rvH4Hq.jpg',
                    'https://imgur.com/XoPOtV1.jpg',
                    'https://imgur.com/edFeFLw.jpg',
                    'https://imgur.com/QWh6yu7.jpg',
                    'https://imgur.com/RJqsP0I.jpg'
                ]
            },
            webApp: false,
            desktopApp: false,
            util: false,
            mobileApp: true,
        },

        {
            title: 'Mind Viewer',
            keywords: ['Javascript', 'Mind', 'Viewer', 'Mapper'],
            technologies: ['Electron', 'NodeJS', 'JQuery', 'CSS', 'HTML5', 'JavaScript'],
            content: {
                text: `
            An easy to use cross-platform application which helps in creating mind maps & simple diagrams.
            Download <a href="https://www.dropbox.com/s/i7y8044r36n05ln/MindMap-windows.zip?dl=0">Here</a><br />
            `,
                images: [
                    'https://imgur.com/migbBCq.png',
                    'https://imgur.com/g3IAGN4.png',
                    'https://imgur.com/Dx7T0ZY.png',
                    'https://imgur.com/YNumc7H.png',
                ]
            },
            webApp: false,
            desktopApp: true,
            util: false,
            mobileApp: false,
        },
        {
            title: 'Color Adjustor (CA)',
            keywords: ['C', 'CA', 'Color Adjustor', 'Hex', 'RGB', 'RGBA'],
            technologies: ['C'],
            content: {
                text: `
            A Command line tool to quickly change hex colors and get rgb values.
            Download <a href="https://www.dropbox.com/s/ed9k1ci4xsabr66/ca.rar?dl=0">Here</a><br />
            `,
                images: [
                    'https://imgur.com/S8ocjYo.png',
                    'https://imgur.com/CpWSfvJ.png',
                    'https://imgur.com/NgK7RuD.png',
                    'https://imgur.com/NwIoZBS.png',
                ]
            },
            webApp: false,
            desktopApp: false,
            util: true,
            mobileApp: false,
        },
        {
            title: 'Periodic Table',
            keywords: ['Periodic', 'Table', 'React', 'Component', 'CSS', 'HTML5'],
            technologies: ['React', 'NodeJS', 'BabelJS', 'Javascript', 'HTML5', 'CSS', 'Git', 'Github'],
            content: {
                text: `
            A Periodic Table Template which is easily customizable.
            <iframe src="https://bunkersem.github.io/periodic-table/"></iframe>`
            },
            webApp: true,
            desktopApp: false,
            util: false,
            mobileApp: false,
        },
        {
            title: 'This Website',
            keywords: ['Periodic', 'Table', 'React', 'Component'],
            technologies: ['AngularJS', 'Webpack', 'NodeJS', 'SCSS', 'ASPDOTNET', 'Heroku', 'Webpack', 'Javascript', 'CSS', 'HTML5', 'ESLint', 'TSLint', 'Git', 'Github'],
            content: {
                text: `
            This Porfolio Website`,
            },
            webApp: true,
            desktopApp: false,
            util: false,
            mobileApp: false,
        },
        {
            title: "Json Gui",
            keywords: [
                "JSON",
                "Gui",
                "Angular",
                "Component"
            ],
            technologies: [
                "Angular",
                "Webpack",
                "NodeJS",
                "SCSS",
                "JavaScript",
                "Typescript2",
                "HTML5",
                "ESLint",
                "TSLint",
                "Git",
                "GitHub",
                "Electron",
            ],
            content: {
                text: `
            JSON GUI
            JsonGui is a simple program for visually editing json content. It uses a schema to generate the gui. 
            The schema can be created in two different ways. 
            You can get it from an external source (file or plain text) or you can generate it from existing json content.<br />
            Made With: <a href="https://github.com/maximegris/angular-electron">Angular-Electron</a>
            <iframe src="https://bunkersem.github.io/jsongui/"></iframe>
            View on <a href="https://github.com/bunkersem/jsongui/tree/master">Github</a><br />
            `
            },
            webApp: true,
            desktopApp: true,
            util: true,
            mobileApp: false
        },
        {
            title: "Mars Rover Explorer",
            keywords: [
                "Mars",
                "Rover",
                "Explorer",
                "Rusty Rover",
                "Rusty",
            ],
            technologies: [
                "Unity3D",
                "C#",
            ],
            content: {
                text: `
                Mars Rover Explorer (Rusty Rover) is a game where you can spawn a (<a href="https://en.wikipedia.org/wiki/Opportunity_(rover)">opportunity</a> like) rover anywhere on mars.
                You can explore the surface, do missions, or slace around. All of this in a number of settings like Daytime, Morning, Evening, Night (the rover has lights), Dust Storm and Clear Skies.
                View on <a href="https://afirus.itch.io/mars-rover-explorer">Itch.io</a><br />
                `,
                images: [
                    'https://imgur.com/xmsG52W.jpg',
                    'https://imgur.com/2mFeRxC.jpg',
                    'https://imgur.com/EjAExvk.jpg',
                    'https://imgur.com/1kAbY6C.jpg',
                    'https://imgur.com/vcFvG3S.jpg',
                    'https://imgur.com/aLnf1nO.jpg',
                    'https://imgur.com/lrqpJCE.jpg',
                    'https://imgur.com/7KWWIUU.jpg',
                    'https://imgur.com/E4UvBV6.jpg',
                ],
            },
            webApp: false,
            desktopApp: true,
            util: false,
            mobileApp: true
        },
        {
            title: "Air Control Madness",
            keywords: [
                "Air",
                "Control",
                "Maddness",
                "Airport",
                "Planes",
                "ATC",
            ],
            technologies: [
                "Unity3D",
                "C#",
            ],
            content: {
                text: `
                Air Control Madness is one of the first games i made. The goal of the game is guide an ever increasing amount of traffic safely to the runway.
                View on <a href="https://play.google.com/store/apps/details?id=com.EchoSierraStudio.AirControlMadness">Goole Play &#x2708;</a><br />
                `,
                images: [
                    'https://imgur.com/CJOMFHB.jpg',
                    'https://imgur.com/DPwDZ1D.jpg',
                    'https://imgur.com/15bvnPf.jpg',
                    'https://imgur.com/Bv095Iw.jpg',
                    'https://imgur.com/0PJeNh6.jpg',
                    'https://imgur.com/zY5xGp5.jpg',
                    'https://imgur.com/ygqSPVm.jpg',
                    'https://imgur.com/nEofl3m.jpg',
                ],
            },
            webApp: false,
            desktopApp: false,
            util: false,
            mobileApp: true
        },
        {
            title: 'Newtonian Sim 2D',
            keywords: ['Newtonian', '2D', 'Sim', 'Solar', 'System'],
            technologies: ['Unity3D', 'C#'],
            content: {
                text: `
            A simple 2d sandbox game in which swiping across the screen creates small orbiting bodies.
            <a href="https://play.google.com/store/apps/details?id=com.EchoSierraStudio.NewtonianSimulation2D">View on Google Play</a><br />
            `,
                images: [
                    'https://imgur.com/1PYBr5x.jpg',
                    'https://imgur.com/N5NfdVY.jpg',
                    'https://imgur.com/3UGSWfF.jpg',
                    'https://imgur.com/ftbhYnI.jpg',
                    'https://imgur.com/lYx4lkb.jpg',
                    'https://imgur.com/ve7VJLi.jpg',

                ]
            },
            webApp: false,
            desktopApp: false,
            util: false,
            mobileApp: true,
        },
        {
            title: 'Base Converter',
            keywords: ['Base', 'Converter', 'Hex', 'Octal', 'Numeric', 'Decimal'],
            technologies: ['HTML5', 'Cordova', 'OnsenUI', 'JQuery', 'CSS', 'Javascript'],
            content: {
                text: `
                This app lets you represent a number in another base. The application provides four default output numbers (hexadecimal, octal, binary and decimal). You can change the input base to a limit of 36. Which is the largest amount of characters you have, to represent a number (0-9 + A-Z).
                <a href="https://play.google.com/store/apps/details?id=com.EchoSierraStudio.NumericCalculator">View on Google Play</a><br />
            `,
                images: [
                    'https://imgur.com/9IyIYVr.png',
                    'https://imgur.com/w4Hau6x.png',
                    'https://imgur.com/1mGVcGA.png',
                    'https://imgur.com/6bTwZeo.png',
                    'https://imgur.com/JO1q5Mw.png',
                    'https://imgur.com/eoDQJZn.png',


                ]
            },
            webApp: false,
            desktopApp: false,
            util: false,
            mobileApp: true,
        },
        {
            title: 'Tappy Plane',
            keywords: ['Tappy', 'Plane', 'Tappy Bird'],
            technologies: ['Unity3D', 'C#'],
            content: {
                text: `
                A Tappy bird like game.
                <a href="https://play.google.com/store/apps/details?id=com.EchoSierraStudio.TappyPlane">View on Google Play</a><br />
            `,
                images: [
                    'https://imgur.com/b9RDswR.jpg',
                    'https://imgur.com/S3Fn5TM.jpg',
                    'https://imgur.com/M3BKlld.jpg',
                    'https://imgur.com/aprqEZX.jpg',
                    'https://imgur.com/vVxL2YE.jpg',
                ]
            },
            webApp: false,
            desktopApp: false,
            util: false,
            mobileApp: true,
        },
        {
            title: 'Tappy Turbulance',
            keywords: ['Tappy', 'Plane', 'Tappy Bird'],
            technologies: ['Unity3D', 'C#'],
            content: {
                text: `
                Another Tappy bird&#x1F426; like game.
                <a href="https://play.google.com/store/apps/details?id=com.EchoSierraStudio.TappyTurbulance">View on Google Play</a><br />
            `,
                images: [
                    'https://imgur.com/LadocfB.jpg',
                    'https://imgur.com/4L60M1N.jpg',
                    'https://imgur.com/PUnayBc.jpg',
                    'https://imgur.com/TGgGLdf.jpg',
                    'https://imgur.com/IB3HKzL.jpg',
                    'https://imgur.com/uRlfBJN.jpg',
                    'https://imgur.com/8j9yhRE.jpg',
                    'https://imgur.com/1SOxbd4.jpg',
                ]
            },
            webApp: false,
            desktopApp: false,
            util: false,
            mobileApp: true,
        },
        {
            title: 'ATC Manager',
            keywords: ['ATC', 'Plane', 'Airplanes', 'Air Traffic Control', 'Air', 'Traffic', 'Control'],
            technologies: ['Unity3D', 'C#'],
            content: {
                text: `
                ATC Manager is a realistic ATC Control manager which features a variety of real world airlines and aircraft all with their own specifications, dynamic runway use, infinite flights, different speed settings, a pause menu, an easy to use interface.
                <a href="https://play.google.com/store/apps/details?id=com.EchoSierraStudio.ATCManager">View on Google Play</a><br />
            `,
                images: [
                    'https://imgur.com/MkXjBJs.png',
                    'https://imgur.com/rnN1jbZ.png',
                    'https://imgur.com/4KV4m2D.png',
                    'https://imgur.com/NLz1aw1.png',
                    'https://imgur.com/B6NTdj3.png',
                    'https://imgur.com/YK5m7Gu.png',
                    'https://imgur.com/crLpSku.png',
                    'https://imgur.com/fiEXjhX.png',
                    'https://imgur.com/I3dvRKL.png',
                ]
            },
            webApp: false,
            desktopApp: false,
            util: false,
            mobileApp: true,
        },
        {
            title: 'Universe Creator',
            keywords: ['Atom', 'Molecule', 'Universe', 'Creator', 'Crane'],
            technologies: ['Unity3D', 'C#'],
            content: {
                text: `
                In this game you need to combine your skills and knowledge to reacreate molecules. 
                <a href="https://play.google.com/store/apps/details?id=com.EchoSierraStudio.UniverseCreator">View on Google Play</a><br />
            `,
                images: [
                    'https://imgur.com/D4Dsdk2.jpg',
                    'https://imgur.com/Tfjm8lS.jpg',
                    'https://imgur.com/vtMU6mg.jpg',
                    'https://imgur.com/7JLmc5V.jpg',
                    'https://imgur.com/iDKUzHb.jpg',
                    'https://imgur.com/MyDxY6c.jpg',
                    'https://imgur.com/YoMPFGI.jpg',
                    'https://imgur.com/NjFUrYz.jpg',
                    'https://imgur.com/iBkx8fu.jpg',
                    'https://imgur.com/AMsuzDn.jpg',
                    'https://imgur.com/jMq5PPv.jpg',
                    'https://imgur.com/FKXAUVN.jpg',
                    'https://imgur.com/4iToy9f.jpg',
                ]
            },
            webApp: false,
            desktopApp: false,
            util: false,
            mobileApp: true,
        },
        {
            title: 'Forum Example',
            keywords: ['Forum', 'Example', 'Posts', 'Account'],
            technologies: ['ExpressJS', 'Bootstrap', 'Javascript', 'SCSS', 'BabelJS', 'ESLint', 'GulpJS', 'NodeJS', 'JQuery', 'CSS', 'HTML5', 'Git', 'Github', 'Firebase'],
            content: {
                text: `
                A Simple Forum Example
                <iframe src="https://bunkersem.github.io/forum_example/"></iframe><br />
                `,
            },
            webApp: true,
            desktopApp: false,
            util: false,
            mobileApp: false,
        },
        {
            title: 'Design Website',
            keywords: ['Design', 'Website', 'Bootstrap', 'Jekyll'],
            technologies: ['Jekyll', 'Bootstrap', 'Javascript', 'SCSS', 'ESLint', 'JQuery', 'CSS', 'HTML5', 'Git', 'Github'],
            content: {
                text: `
                A Simple Design Website
                <iframe src="https://bunkersem.github.io/effie_design/"></iframe><br />
                `,
                images: [
                    'https://imgur.com/1rQDyfF.jpg',
                    'https://imgur.com/nFajgBl.jpg',
                    'https://imgur.com/ka1NZJr.jpg',
                    'https://imgur.com/z5VWDJU.jpg',
                    'https://imgur.com/ourb0uC.jpg',
                ]
            },
            webApp: true,
            desktopApp: false,
            util: false,
            mobileApp: false,
        },
        // {
        //     title: 'Protected Url',
        //     keywords: ['Protected', 'Url', 'Encrypted', 'Secure'],
        //     technologies: ['ExpressJS', 'Bootstrap', 'Javascript', 'EJS', 'ESLint', 'JQuery', 'CSS', 'HTML5', 'Git', 'Github'],
        //     content: {
        //         text: `
        //         Protect your url by putting it behind a login dialog  🔗🔒🔑
        //         <iframe src="http://protected-url.herokuapp.com/"></iframe><br />
        //         `,
        //     },
        //     webApp: true,
        //     desktopApp: false,
        //     util: false,
        //     mobileApp: false,
        // },
    ]


const technologieNames = technologies.map(p => p.name);
const technologyLowerCaseMap = (function () {
    var obj = {};
    technologieNames.forEach(n => {
        obj[n.toLowerCase()] = n;
    });
    return obj;
})();
projects.forEach(p => {
    p.technologies = p.technologies.map(t => {
        if (technologieNames.some(tn => tn.toLowerCase() === t.toLowerCase()) === false) {
            console.error(`${t} does not exist\n(Allowed Values: ${technologieNames.sort().join(', ')})`);
            process.exit(1);
        }
        return technologyLowerCaseMap[t.toLowerCase()];
    });
});
fs.writeFileSync(path.join(__dirname, './client/projects.json'), JSON.stringify(projects, null, 2));


