import {
    Mesh,
    MeshPhongMaterial,
    SphereBufferGeometry,
    TextureLoader,
    Object3D,
    BackSide,
    FrontSide
} from "../lib/three.module.js";
import {PlaneBufferGeometry} from "../lib/three.module.js";
import {BoxBufferGeometry} from "../lib/three.module.js";
import {BoxGeometry} from "../lib/three.module.js";
import {MeshBasicMaterial} from "../lib/three.module.js";

export default class Skydome extends Object3D{
    constructor() {
        super();
        let loader = new TextureLoader();
        let skyGeometry = new BoxGeometry(3000, 3000, 3000);
        //let skyTexture = loader.load("resources/skydome/skytexture.jpg");

        let sky1 = loader.load("resources/skydome/clouds1_down.bmp");
        let sky2 = loader.load("resources/skydome/clouds1_up.bmp");
        let sky3 = loader.load("resources/skydome/clouds1_west.bmp");
        let sky4 = loader.load("resources/skydome/clouds1_east.bmp");
        let sky5 = loader.load("resources/skydome/clouds1_south.bmp");
        let sky6 = loader.load("resources/skydome/clouds1_north.bmp");

        // mat6, mat5, mat2, mat1, mat4, mat3
        // front, back, up, down, right, left

        //mat3, mat2, mat4, mat1, mat5, mat6
        // left, up, right, down, back, front

        //mat3, mat4, mat2, mat1, mat5, mat6
        // left, right, up, down, back, front

        //mat4, mat3, mat2, mat1, mat6, mat5
        // right, left, up, down, front, back


        //let skyMaterial = new MeshBasicMaterial({
         //   map: skyTexture,
          //  opacity: 10,
           // side: BackSide

        //});

        let mat1 = new MeshBasicMaterial({
            map: sky1,
            opacity: 10,
            side: BackSide
        });

        let mat2 = new MeshBasicMaterial({
            map: sky2,
            opacity: 10,
            side: BackSide
        });

        let mat3 = new MeshBasicMaterial({
            map: sky3,
            opacity: 10,
            side: BackSide
        });

        let mat4 = new MeshBasicMaterial({
            map: sky4,
            opacity: 10,
            side: BackSide
        });

        let mat5 = new MeshBasicMaterial({
            map: sky5,
            opacity: 10,
            side: BackSide
        });

        let mat6 = new MeshBasicMaterial({
            map: sky6,
            opacity: 10,
            side: BackSide
        });

        let materials = [];

        //mat4, mat3, mat2, mat1, mat6, mat5

        materials.push(mat4);
        materials.push(mat3);
        materials.push(mat2);
        materials.push(mat1);
        materials.push(mat6);
        materials.push(mat5);

        let sky = new Mesh(skyGeometry, materials);


        this.add(sky);
    }
}