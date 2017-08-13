let GAME;

window.onload = function() {
    GAME = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.WEBGL, 'app', null, false, false);
    GAME.state.add('WELCOME', WELCOME, false);
    GAME.state.add('PLAYING', PLAYING, true);
};

window.addEventListener('resize', function() {
    console.log('resize event');
    if (GAME.state.states[GAME.state.current].resize) {
        GAME.state.states[GAME.state.current].resize();
    }
}.bind(this));

let REQUIRED = () => { throw new Error('param is required'); };