var mainPlaneBodyGeom = new THREE.CylinderGeometry(1, 2, 10, 24),
    headFrustumPlaneGeom = new THREE.CylinderGeometry(2, 1.5, 1, 24, 8, true),
    headCoverPlaneGeom = new THREE.RingGeometry(0.6, 1.6, 24),
    headCylinderGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.3),
    fanGeom = new THREE.CylinderGeometry(0.3, 0.2, 3, 8, 1, false, 0, Math.PI),
    frontWingsGeom = new THREE.BoxGeometry(15, 2.7, 0.3),
    backWingsHorizontalGeom = new THREE.BoxGeometry(5, 1, 0.2),
    backWingsVerticalGeom = new THREE.BoxGeometry(3, 1.2, 0.2);


function buildPlane(size, mainColor, secondaryColor) {
    var plane = new THREE.Group(),
        mainMaterial = new THREE.MeshLambertMaterial({color: mainColor}),
        secondaryMaterial = new THREE.MeshLambertMaterial({color: secondaryColor}),
        mainMaterialDoubleSide = new THREE.MeshLambertMaterial({
            color: mainColor,
            side: THREE.DoubleSide
        }),
        secondaryMaterialDoubleSide = new THREE.MeshLambertMaterial({
            color: secondaryColor,
            side: THREE.DoubleSide
        });

    //Body and Head
    var mainBody = new THREE.Mesh(mainPlaneBodyGeom, mainMaterial),
        headFrustum = new THREE.Mesh(headFrustumPlaneGeom, mainMaterialDoubleSide),
        headCover = new THREE.Mesh(headCoverPlaneGeom, mainMaterial),
        headCylinder = new THREE.Mesh(headCylinderGeom, secondaryMaterial);
    headFrustum.translateY(-5.5);
    headCover.rotateX(Math.PI / 2);
    headCover.translateZ(6);
    headCylinder.translateY(-6);

    //Fans
    plane.fans = [];
    for (let i = 1; i <= 3; i++) {
        let fan = new THREE.Mesh(fanGeom, secondaryMaterialDoubleSide);
        fan.position.set(
            i === 2 ? 1.4 : -0.7,
            -6.1,
            1.2 * (2 - i)
        );
        fan.rotation.set(
            0,
            4 * Math.PI / 3 - (2 * Math.PI / 3) * (1 - i),
            -Math.PI / 2
        );
        plane.fans.push(fan);
    }
    plane.add(...plane.fans);

    //Wings
    var frontWings = new THREE.Mesh(frontWingsGeom, mainMaterial),
        backWingsHorizontal = new THREE.Mesh(backWingsHorizontalGeom, mainMaterial),
        backWingsVertical = new THREE.Mesh(backWingsVerticalGeom, mainMaterial);
    frontWings.position.set(0, -2, 1.2);
    backWingsHorizontal.position.set(0, 4, 0.8);
    backWingsVertical.position.set(0, 4, 1);
    backWingsVertical.rotation.y = Math.PI / 2;

    plane.add(mainBody, headFrustum, headCover, headCylinder, frontWings, backWingsHorizontal, backWingsVertical);
    plane.scale.set(size, size, size);
    return plane;
}