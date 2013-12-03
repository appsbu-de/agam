
var game = new Phaser.Game(480, 320, Phaser.CANVAS, 'gameContainer', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('level01', 'tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tileset('tiles', 'assets/tileset_1bit.png', 16, 16, -1, 0, 0);

}

var map;
var tileset;
var layer;
var pathfinder;

var cursors;
var sprite;
var marker;
var blocked = false;

function create() {

    game.stage.backgroundColor = '#ffffff';
    map = game.add.tilemap('level01');

    tileset = game.add.tileset('tiles');

    var walkables = [0];

    pathfinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
    pathfinder.setGrid(map.layers[0].data, walkables);

    layer = game.add.tilemapLayer(0, 0, 480, 320, tileset, map, 0);

    layer.resizeWorld();

    cursors = game.input.keyboard.createCursorKeys();
    marker = game.add.graphics();
    marker.lineStyle(2, 0x9d9d9d, 1);
    marker.drawRect(0, 0, 16, 16);
}

function findPathTo(tilex, tiley) {

    pathfinder.setCallbackFunction(function(path) {
        console.log(path);
        path = path || [];
        for(var i = 0, ilen = path.length; i < ilen; i++) {
            map.putTile(1, path[i].x, path[i].y);
        }
        blocked = false;

    });

    pathfinder.preparePathCalculation([1,1], [tilex,tiley]);
    pathfinder.calculatePath();
}

function update() {
    game.physics.collide(sprite, layer);

    marker.x = layer.getTileX(game.input.activePointer.worldX) * 16;
    marker.y = layer.getTileY(game.input.activePointer.worldY) * 16;

    if (game.input.mousePointer.isDown)
    {
        blocked = true;
        findPathTo(layer.getTileX(marker.x), layer.getTileY(marker.y));
    }

}

function render() {

}
