export const Diagnostics = require('Diagnostics');
const NativeUI = require('NativeUI');
const Textures = require('Textures');
const Materials = require('Materials');
const Patches = require('Patches');

Promise.all([
    Textures.findFirst('jokerMask'),
    Textures.findFirst('maskPhoenix'),
    Textures.findFirst('maskJack'),
    Textures.findFirst('maskLeto'),
    Materials.findFirst('faceMaterial')
]).then(onReady);


function onReady(assets) {

    const texture0 = assets[0];
    const texture1 = assets[1];
    const texture2 = assets[2];
    const texture3 = assets[3];
    const faceMaterial = assets[4];

    const picker = NativeUI.picker;

    const index = 0;
    const selection = 0;

    const configuration = {

      selectedIndex: index,

      items: [
        {image_texture: texture0},
        {image_texture: texture1},
        {image_texture: texture2},
        {image_texture: texture3}
      ]

    };

    faceMaterial.diffuse = configuration.items[0].image_texture
    picker.configure(configuration);
    picker.visible = true;

    picker.selectedIndex.monitor().subscribe(function(index) {
      Patches.inputs.setScalar('selection', index.newValue);
      //Diagnostics.log(faceMaterial);
      faceMaterial.diffuse = configuration.items[index.newValue].image_texture;
    });
}
