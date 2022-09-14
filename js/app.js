!(function () {
	// Strict mode
	"use strict";

	/**
	 * @type {Function} Main function
	 * @param {Window} _w Window object
	 * @param {Document} _d Document object
	 * @param {HTMLElement} _r Root element object
	 */
	const main = function (_w, _d, _r) {
		/**
		 * @type {Function} Image format support detection
		 * @param {String} filePath Format to check
		 */
		const imgSupported = (format, filePath) => {
			if (typeof format !== "string" || typeof filePath !== "string") return;
			const img = new Image();
			img.src = filePath;
			img.onerror = () => {
				_r.classList.add(`no-${format.toLowerCase()}`);
				return false;
			};
		};
		imgSupported("webp", "../img/bg.webp");

		// initialize variables
		let centerX = _w.innerWidth / 2;
		let centerY = _w.innerHeight / 2;
		let mousePosX = centerX;
		let mousePosY = centerY;

		/**
		 * @type {Function} Update center variables
		 */
		const updateCenter = () => {
			centerX = _w.innerWidth / 2;
			centerY = _w.innerHeight / 2;
		};

		/**
		 * @type {Function} Update Mouse position variables
		 * @param {Object | Event} args Window object
		 */
		const updateMousePos = (args) => {
			if (typeof args !== "object") return;
			mousePosX = args.x || args.e.pageX;
			mousePosY = args.y || args.e.pageY;
		};

		// mouse events
		["mousemove", "touchmove", "touchstart"].forEach((listener) => {
			_d.addEventListener(listener, (event) => {
				updateMousePos({ e: event });
			});
		});

		// window interaction events
		["load", "resize"].forEach((listener) => {
			_w.addEventListener(listener, () => {
				updateCenter();
				updateMousePos({ x: centerX, y: centerY });
			});
		});

		// get all parallax items and define transform variables
		const sceneItems = _d.getElementsByClassName("parallax");
		let transformX = 0;
		let transformY = 0;
		let performancePrev = 0;
		/**
		 * @type {FrameRequestCallback} Render everything on scene
		 */
		const sceneRenderer = () => {
			const performanceNow = performance.now(),
				elapsed = performanceNow - performancePrev,
				calculated = Math.max(~~((1 / elapsed) * 112.5), 6);

			// define distance variables
			let distanceX = centerX - mousePosX - transformX,
				distanceY = centerY - mousePosY - transformY;

			// calculate transform
			transformX += distanceX / calculated;
			transformY += distanceY / calculated;

			// update all parallax items
			for (const item of sceneItems) {
				if (!(item instanceof HTMLElement)) return;
				const depth = Number(item.getAttribute("data-depth"));
				item.style.transform = `translate3d(${~~((transformX * depth) / 10) / 10}px, ${~~((transformY * depth) / 10) / 10}px, 0px)`;
			}
			performancePrev = performanceNow;
			requestAnimationFrame(sceneRenderer);
		};
		requestAnimationFrame(sceneRenderer);
	};

	// Run main function when DOM is loaded
	main(window, document, document.documentElement, document.body);

	// End of script
	return 0;
})();
