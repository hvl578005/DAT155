"use strict";

import {
    AmbientLight, Color,
    Mesh,
    MeshBasicMaterial,
    MeshPhongMaterial,
    Object3D, PointLight, Sphere,
    SphereGeometry,
    TextureLoader
} from "./build/three.module.js";
import SimpleColorMaterial from "./SimpleColorMaterial.js";

export default class SolarSystem{
    //Bruker solsystemets constructor for å sette opp planetene. Tar inn Three.js sin scene som parameter, siden vi må legge objekter til i denne
    constructor(scene) {
        //En mesh trenger Geometry (bufferdata, transformasjoner - hvor ligger verticene våre) og Material (hvordan skal objektet fargelegges)

        //Variabler for å opprette geometrien til en kule
        //Se https://threejs.org/docs/index.html#api/en/geometries/SphereGeometry for effekten av width- og heightSegments (åpne Controls oppe til høyre i sphere-vinduet)
        let radius = 10;
        let widthSegments = 64;
        let heightSegments = 64;

        //Opprett geometri for solen vår
        let sunGeometry = new SphereGeometry(radius, widthSegments, heightSegments);

        //Opprett materiale som bestemmer hvordan solen skal fargelegges
        let sunTextureUrl = 'assets/texture_sun.jpg'; //Hvor ligger teksturen?
        let sunTexture = new TextureLoader().load(sunTextureUrl); //Bruker Three.js sin TextureLoader for å laste inn teksturen
        //Opprett en instans av Three.js sin MeshBasicMaterial - et enkelt materiale som ikke tar hensyn til lys
        //(Kommentert ut siden vi heller vil bruke vår egen-lagde shader)
        //let sunMaterial = new MeshBasicMaterial({map: sunTexture});

        //Opprett en instans av vårt egen-lagde Material
        //Parametere: tekstur, og en Three.js Color som skal brukes for å farge teksturen mer - her for å farge den rødt
        let sunMaterial = new SimpleColorMaterial({
            mapInParameters: sunTexture,
            colorInParameters: new Color(0xFF0000)
        })

        //Oppretter selve sol-Meshen, som nå består av et Geometry-objekt og et Material-objekt
        this.sun = new Mesh(sunGeometry, sunMaterial);

        //Legge solen til scenen
        scene.add(this.sun);

        //Oppretter et usynlig Object3D som Mars skal rotere rundt.
        this.marsOrbitNode = new Object3D();
        //Legger det usynlige objektet som barn av solen
        this.sun.add(this.marsOrbitNode);

        //Samme prosedyre for Mars
        //Last inn tekstur og gi denne til et Material
        let marsTextureUrl = 'assets/mars.jpg';
        let marsTexture = new TextureLoader().load(marsTextureUrl);

        //Bruk av Specular Map - definerer hvor "shiny" forskjellige områder på objektet skal være
        //Bruk av Normal Map - Lager illusjon av høyde og dybde ved at en tekstur brukes for å
        // definere endringer i normalene over objektet
        let marsSpecularMap = new TextureLoader().load("assets/mars-spec2k.jpg");
        let marsNormalMap = new TextureLoader().load("assets/mars_1k_normal.jpg");
        //Bruker her MeshPhongMaterial - litt mer avansert Material som forholder seg til lys
        let marsMaterial = new MeshPhongMaterial({map: marsTexture,
                                                            shininess:1.0,
                                                            specular: marsSpecularMap,
                                                            normalMap: marsNormalMap
                                                            });


        //Forandrer radius - gjør jorden halvparten så stor som solen
        radius = 0.8;
        let marsGeometry = new SphereGeometry(radius, widthSegments, heightSegments);

        //Oppretter Mesh for jorden ved å gi Geometry og Material
        this.mars = new Mesh(marsGeometry, marsMaterial);

        //Flytter jorden litt til høyre for solen
        this.mars.position.x = 24;

        //Legger jorden som barn av earthOrbitNode - this.earth arver nå rotasjoner som gjøres på this.earthOrbitNode
        this.marsOrbitNode.add(this.mars);

        //Oppretter et usynlig Object3D som jorden vår skal rotere rundt.
        this.earthOrbitNode = new Object3D();
        //Legger det usynlige objektet som barn av solen
        this.sun.add(this.earthOrbitNode);

        //Samme prosedyre for jorden vår
        //Last inn tekstur og gi denne til et Material
        let earthTextureUrl = 'assets/texture_earth.jpg';
        let earthTexture = new TextureLoader().load(earthTextureUrl);


        //Fikk ikke gjort på forelesning:
        //Bruk av Specular Map - definerer hvor "shiny" forskjellige områder på objektet skal være
        //Bruk av Normal Map - Lager illusjon av høyde og dybde ved at en tekstur brukes for å definere endringer i normalene over objektet
        let earthSpecularMap = new TextureLoader().load("assets/earthspec1k.jpg");
        let earthNormalMap = new TextureLoader().load("assets/2k_earth_normal_map.png");
        //Bruker her MeshPhongMaterial - litt mer avansert Material som forholder seg til lys
        let earthMaterial = new MeshPhongMaterial({map:earthTexture,
            shininess:1.0,
            specular: earthSpecularMap,
            normalMap: earthNormalMap
        });


        //Forandrer radius - gjør jorden halvparten så stor som solen
        radius = 1.0;
        let earthGeometry = new SphereGeometry(radius, widthSegments, heightSegments);

        //Oppretter Mesh for jorden ved å gi Geometry og Material
        this.earth = new Mesh(earthGeometry, earthMaterial);

        //Flytter jorden litt til høyre for solen
        this.earth.position.x = 21;

        //Legger jorden som barn av earthOrbitNode - this.earth arver nå rotasjoner som gjøres på this.earthOrbitNode
        this.earthOrbitNode.add(this.earth);

        this.mercuryOrbitNode = new Object3D();
        this.sun.add(this.mercuryOrbitNode);

        let mercuryTextureUrl = 'assets/mercurymap.jpg';
        let mercuryTexture = new TextureLoader().load(mercuryTextureUrl);

        let mercuryMaterial = new MeshPhongMaterial({map: mercuryTexture,
            shininess:1.0,
            specular: marsSpecularMap,
            normalMap: marsNormalMap
        });

        radius = 0.6;
        let mercuryGeometry = new SphereGeometry(radius, widthSegments, heightSegments);

        this.mercury = new Mesh(mercuryGeometry, mercuryMaterial);

        this.mercury.position.x = 15;

        this.mercuryOrbitNode.add(this.mercury);

        // NY PLANET VENUS

        this.venusOrbitNode = new Object3D();
        this.sun.add(this.venusOrbitNode);

        let venusTextureUrl = 'assets/venusmap.jpg';
        let venusTexture = new TextureLoader().load(venusTextureUrl);

        //velger mars specularmap og mars normal map fordi jeg fant ikke venus specular eller venus normal

        let venusMaterial = new MeshPhongMaterial({map: venusTexture,
            shininess:1.0,
            specular: marsSpecularMap,
            normalMap: marsNormalMap
        });

        radius = 1.0;
        let venusGeometry = new SphereGeometry(radius, widthSegments, heightSegments);

        this.venus = new Mesh(venusGeometry, venusMaterial);

        this.venus.position.x = 18;

        this.venusOrbitNode.add(this.venus);

        // NY PLANET JUPITER

        this.jupiterOrbitNode = new Object3D();
        this.sun.add(this.jupiterOrbitNode);

        let jupiterTextureUrl = 'assets/jupitermap.jpg';
        let jupiterTexture = new TextureLoader().load(jupiterTextureUrl);

        //velger mars specularmap og mars normal map fordi jeg fant ikke venus specular eller venus normal

        let jupiterMaterial = new MeshPhongMaterial({map: jupiterTexture,
            shininess:1.0,
            specular: marsSpecularMap,
            normalMap: marsNormalMap
        });

        radius = 2.7;
        let jupiterGeometry = new SphereGeometry(radius, widthSegments, heightSegments);

        this.jupiter = new Mesh(jupiterGeometry, jupiterMaterial);

        this.jupiter.position.x = 30;

        this.jupiterOrbitNode.add(this.jupiter);

        // NY PLANET SATURN

        this.saturnOrbitNode = new Object3D();
        this.sun.add(this.saturnOrbitNode);

        let saturnTextureUrl = 'assets/saturnmap.jpg';
        let saturnTexture = new TextureLoader().load(saturnTextureUrl);

        //velger mars specularmap og mars normal map fordi jeg fant ikke venus specular eller venus normal

        let saturnMaterial = new MeshPhongMaterial({map: saturnTexture,
            shininess:1.0,
            specular: marsSpecularMap,
            normalMap: marsNormalMap
        });

        radius = 2.5;
        let saturnGeometry = new SphereGeometry(radius, widthSegments, heightSegments);

        this.saturn = new Mesh(saturnGeometry, saturnMaterial);

        this.saturn.position.x = 37;

        this.saturnOrbitNode.add(this.saturn);

        // NY PLANET URANUS

        this.uranusOrbitNode = new Object3D();
        this.sun.add(this.uranusOrbitNode);

        let uranusTextureUrl = 'assets/uranusmap.jpg';
        let uranusTexture = new TextureLoader().load(uranusTextureUrl);

        //velger mars specularmap og mars normal map fordi jeg fant ikke venus specular eller venus normal

        let uranusMaterial = new MeshPhongMaterial({map: uranusTexture,
            shininess:1.0,
            specular: marsSpecularMap,
            normalMap: marsNormalMap
        });

        radius = 1.5;
        let uranusGeometry = new SphereGeometry(radius, widthSegments, heightSegments);

        this.uranus = new Mesh(uranusGeometry, uranusMaterial);

        this.uranus.position.x = 43;

        this.uranusOrbitNode.add(this.uranus);

        // SISTE PLANET NEPTUN

        this.neptunOrbitNode = new Object3D();
        this.sun.add(this.neptunOrbitNode);

        let neptunTextureUrl = 'assets/neptunmap.jpg';
        let neptunTexture = new TextureLoader().load(neptunTextureUrl);

        //velger mars specularmap og mars normal map fordi jeg fant ikke venus specular eller venus normal

        let neptunMaterial = new MeshPhongMaterial({map: neptunTexture,
            shininess:1.0,
            specular: marsSpecularMap,
            normalMap: marsNormalMap
        });

        radius = 1.5;
        let neptunGeometry = new SphereGeometry(radius, widthSegments, heightSegments);

        this.neptun = new Mesh(neptunGeometry, neptunMaterial);

        this.neptun.position.x = 47;

        this.neptunOrbitNode.add(this.neptun);

        //Det nye Materialet forholder seg til lys, og vil være helt svart.
        //Legger derfor til lys i scenen - PointLight lyser i alle retninger rundt seg
        this.sunLight = new PointLight(0xffffff, 3);
        //Legger lyset som barn av solen
        this.sun.add(this.sunLight);

        //Legger til et mykere AmbientLight for å representere bakgrunnsbelysning - gjør at vi såvidt kan se baksiden av jorden vår
        this.ambientLight = new AmbientLight(0xffffff, 0.05);
        scene.add(this.ambientLight); //Legg bakgrunnslyset til i scenen.

    }

    animate(){
        //Når App-klassen ber solsystemet om å animere seg: roter planetene
        this.rotateObject(this.sun, [0.0, 0.005, 0.0]);
        this.rotateObject(this.earthOrbitNode, [0.0, 0.0005, 0.0]);
        this.rotateObject(this.earth, [0.0, 0.02, 0.0]);
        this.rotateObject(this.marsOrbitNode, [0.0, 0.00005, 0.0]);
        this.rotateObject(this.mars, [0.0, 0.02, 0.0]);
        this.rotateObject(this.mercuryOrbitNode, [0.0, 0.0089, 0.0]);
        this.rotateObject(this.mercury, [0.0, 0.02, 0.0]);
        this.rotateObject(this.venusOrbitNode, [0.0, 0.00023, 0.0]);
        this.rotateObject(this.venus, [0.0, 0.02, 0.0]);
        this.rotateObject(this.jupiterOrbitNode, [0.0, 0.002, 0.0]);
        this.rotateObject(this.jupiter, [0.0, 0.005, 0.0]);
        this.rotateObject(this.saturnOrbitNode, [0.0, 0.0092, 0.0]);
        this.rotateObject(this.saturn, [0.0, 0.005, 0.0]);
        this.rotateObject(this.uranusOrbitNode, [0.0, 0.0099, 0.0]);
        this.rotateObject(this.uranus, [0.0, 0.005, 0.0]);
        this.rotateObject(this.neptunOrbitNode, [0.0, 0.00014, 0.0]);
        this.rotateObject(this.neptun, [0.0, 0.005, 0.0]);
    }

    rotateObject(object, rotation){
        //Hjelpe-metode for å rotere et objekt
        object.rotation.x += rotation[0];
        object.rotation.y += rotation[1];
        object.rotation.z += rotation[2];
    }
}