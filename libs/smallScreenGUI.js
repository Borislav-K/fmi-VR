function addSmallScreenOption(gui) {
    if (!gui) {
        gui = new dat.GUI();
    }
    let options = {
        shrink: false,
    };

    gui.add(options, 'shrink').name('За големи екрани').onChange(function () {
        if (options.shrink) {
            window.removeEventListener('resize', onWindowResizeAnaglyph, false);
            window.addEventListener('resize', resizeWithShrink, false);
            resizeWithShrink();
        } else {
            window.removeEventListener('resize', resizeWithShrink, false);
            window.addEventListener('resize', onWindowResizeAnaglyph, false);
            renderer.domElement.style.cssText = 'padding: 0';
            onWindowResizeAnaglyph();
        }
    })
}

function resizeWithShrink() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    let newWidth = window.innerWidth * 0.86;
    let newHeight = window.innerHeight * 0.86;
    renderer.domElement.style.cssText =
        `padding: ${(window.innerHeight - newHeight) / 2}px ${(window.innerWidth - newWidth) / 2}px`;
    effect.setSize(newWidth, newHeight, true);
    //HUAWEI P30 LITE OBSERVATIONS - 6.9cm distance between a point in 2 screen divisions (bad image)
    //                             - 6cm distance (good image) - approximately 13% less
}