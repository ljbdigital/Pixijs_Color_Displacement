import * as PIXI from 'pixi.js'

//TRY BELOW LINK
let _w = window.innerWidth; let _h = window.innerHeight;
var app = new PIXI.Application({width: _w, height: _h});

document.body.appendChild(app.view);
window.addEventListener('resize', () => {
    _w = window.innerWidth; _h = window.innerHeight;
    app.renderer.view.width = _w;
    app.renderer.view.height = _h - 60;
})

//Define variables and container
var posX, displacementSprite, displacementFilter, rgba, bg, vx, vy, posY;
var container = new PIXI.Container();
app.stage.addChild(container);

//Import filters and load images
import {RGBSplitFilter} from 'pixi-filters';
import two from './jelly.jpg'
let loader = PIXI.Loader.shared;
loader.add('two', './images/jelly.jpg')
loader.load((loader, resources) => {setup(loader, resources)});
loader.onLoad.add(() => {console.log('loaded')})
loader.onError.add(() => {console.log('err')}) 


function setup(loader, resources) {
    //Set filters and interactivity
    app.stage.interactive = true;
    rgba = new RGBSplitFilter([0, 10, 0, 0, 0, 0]);
    //Define image
    bg = new PIXI.Sprite(resources.two.texture);
    bg.width = _w; bg.height = _h;
    let x = app.view.width/2 - bg.width/2;
    let y = app.view.height/2 - bg.height/2;
    bg.position.x = x; bg.position.y = y;
    bg.scale.set(1,1)
    container.addChild(bg);
    //Add interactive effects
    app.stage.on('mousemove', onPointerMove).on('touchmove', onPointerMove);
    app.stage.on('mouseover', () => {
        container.filters = [rgba]
    })
    app.stage.on('mouseout', () => {
        const update = () => {
            container.filters = []
            posX = app.renderer.width/2; posY = app.renderer.height/2;
            displacementFilter.scale.x = 0.5;
            displacementFilter.scale.y = 0.5;
        }
        requestAnimationFrame(update)
    })     
}

function onPointerMove(eventData) {
    if (event.target === app.view) {
        alterColors()
        posX = eventData.data.global.x;
        posY = eventData.data.global.y;
    }
}

function alterColors() {
    rgba.red = [posY/100, posX/50]
    rgba.blue = [-posY/100, 10-posX/25]
    requestAnimationFrame(alterColors)
}


