!(function () {
	// strict js mode
	"use strict";

	// main function
	const main = function (w, d, r) {
		// img format support detection
		const imgSupported = (format = false, dataUri = false) => {
			if (!format || !dataUri) return;
			const img = new Image();
			img.src = `data:image/${format};base64,${dataUri}`;
			img.onerror = () => {
				r.classList.add(`no-${format.toLowerCase()}`);
				return false;
			};
		};
		imgSupported(
			"avif",
			"AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D"
		);
		imgSupported("webp", "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==");

		// initialize variables
		let centerX = w.innerWidth / 2,
			centerY = w.innerHeight / 2;
		let mousePosX = centerX,
			mousePosY = centerY;

		// update functions
		const updateCenter = () => {
			centerX = w.innerWidth / 2;
			centerY = w.innerHeight / 2;
		};
		const updateMousePos = (args) => {
			mousePosX = args.x || args.e.pageX;
			mousePosY = args.y || args.e.pageY;
		};

		// mouse events
		["mousemove", "touchmove", "touchstart"].forEach((listener) => {
			d.addEventListener(listener, (event) => {
				updateMousePos({ e: event });
			});
		});

		// window interaction events
		["load", "resize"].forEach((listener) => {
			w.addEventListener(listener, () => {
				updateCenter();
				updateMousePos({ x: centerX, y: centerY });
			});
		});

		// calculate parallax positions
		const sceneItems = d.querySelectorAll(".parallax");
		let transformX = 0,
			transformY = 0;
		const parallaxRenderer = () => {
			// define distance variables
			let distanceX = centerX - mousePosX - transformX,
				distanceY = centerY - mousePosY - transformY;

			// calculate transform
			transformX += distanceX / 12;
			transformY += distanceY / 12;

			// update all parallax items
			sceneItems.forEach((item) => {
				const depth = item.getAttribute("data-depth");
				item.style.transform = `translate3d(${~~(transformX * depth) / 100}px, ${~~(transformY * depth) / 100}px, 0px)`;
			});
		};

		// render everything on scene
		(function sceneRenderer() {
			parallaxRenderer();
			requestAnimationFrame(sceneRenderer);
		})();
	};

	// when document is loaded
	document.addEventListener("DOMContentLoaded", main(window, document, document.documentElement));
})();
