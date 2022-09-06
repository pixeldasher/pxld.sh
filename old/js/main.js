document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        onLoad();
    }
}
const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--fullheight', `${window.innerHeight}px`);
}
window.addEventListener('resize', appHeight);
appHeight();

function onLoad(e) {
    if (((/iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) && !window.MSStream)) {
        let scene = document.getElementsByClassName("scene")[0];
        scene.remove();
    } else {
        let scene = document.getElementsByClassName("scene")[0];
        let parallaxInstance = new Parallax(scene);

        parallaxInstance.friction(0.0825, 0.0825);

        let ios = document.getElementsByClassName("ios")[0];
        ios.remove();
    }

    anime(
        {
        targets: ".logo",
        scale: [2.55, 1],
        delay: 150,
        duration: 1425,
        easing: "easeOutExpo",
        }
    );
    anime(
        {
        targets: ".transition",
        opacity: ["100%", "0%"],
        delay: 950,
        duration: 1450,
        easing: "easeInOutExpo",
        }
    );
    anime(
        {
        targets: "nav",
        height: ["calc(100vh + 0vmin + 0em)", "calc(0vh + 7.5vmin + 2em)"],
        delay: 900,
        duration: 1550,
        easing: "easeInOutExpo",
        }
    );
    anime(
        {
        targets: ".title",
        backgroundPosition: ["center 125%", "center 50%"],
        delay: 900,
        duration: 1550,
        easing: "easeInOutExpo",
        }
    );
    anime(
        {
        targets: ".bg",
        backgroundPosition: ["center 70.325%", "center 78.725%"],
        delay: 900,
        duration: 1550,
        easing: "easeInOutExpo",
        }
    );
    anime(
        {
        targets: "nav",
        backgroundColor: ["rgba(0,0,0,1)", "rgba(0,0,0,0.00001)"],
        delay: 1125,
        duration: 1275,
        easing: "easeInOutExpo",
        }
    );
    anime(
        {
        targets: ".blocker",
        opacity: ["100%", "0%"],
        backgroundColor: ["rgba(0,0,0,1)", "rgba(0,0,0,0)"],
        backgroundSize: ["auto calc(11.75vmin + 2em)", "auto calc(8.125vmin + 2em)"],
        delay: 200,
        duration: 500,
        easing: "easeInOutExpo",
        }
    );

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.height = 1024;

    function noise(ctx) {
        
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        const iData = ctx.createImageData(w, h);
        const buffer32 = new Uint32Array(iData.data.buffer);
        const len = buffer32.length;
    
        for(i = 0; i < len;i++)
            
        if (Math.random() < 0.5) buffer32[i] = 0xffffffff;

        ctx.putImageData(iData, 0, 0);
    }
    
    (function loop() {
        window.setTimeout(function() {
            noise(ctx);
            requestAnimationFrame(loop)
        }, 28)
    })();
};