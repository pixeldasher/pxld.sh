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
		 * @param {String} format Format to check
		 * @param {String} dataUri Base64 encoded URI of object
		 */
		const imgSupported = (format, dataUri) => {
			if (!format || !dataUri) return;
			const img = new Image();
			img.src = `data:image/${format};base64,${dataUri}`;
			img.onerror = () => {
				_r.classList.add(`no-${format.toLowerCase()}`);
				return false;
			};
		};
		imgSupported(
			"avif",
			"AAAAHGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZgAAAPBtZXRhAAAAAAAAAChoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAbGliYXZpZgAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAEUAAAAFQAAAChpaW5mAAAAAAABAAAAGmluZmUCAAAAAAEAAGF2MDFDb2xvcgAAAABoaXBycAAAAElpcGNvAAAAFGlzcGUAAAAAAAAAAQAAAAEAAAAOcGl4aQAAAAABCAAAAAxhdjFDgQAcAAAAABNjb2xybmNseAABAAEAAQAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB1tZGF0EgAKBxgADlgICAkyCB/xgAAghQm0"
		);
		imgSupported("webp", "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==");

		// initialize variables
		let centerX = _w.innerWidth / 2,
			centerY = _w.innerHeight / 2;
		let mousePosX = centerX,
			mousePosY = centerY;

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
			if (typeof args === "undefined") return;
			mousePosX = args.x ?? args.e.pageX;
			mousePosY = args.y ?? args.e.pageY;
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
		let transformX = 0,
			transformY = 0;
		/**
		 * @type {FrameRequestCallback} Render everything on scene
		 */
		const sceneRenderer = () => {
			// define distance variables
			let distanceX = centerX - mousePosX - transformX,
				distanceY = centerY - mousePosY - transformY;

			// calculate transform
			transformX += distanceX / 12;
			transformY += distanceY / 12;

			// update all parallax items
			for (const item of sceneItems) {
				if (!(item instanceof HTMLElement)) return;
				const depth = Number(item.getAttribute("data-depth"));
				item.style.transform = `translate3d(${~~(transformX * depth) / 100}px, ${~~(transformY * depth) / 100}px, 0px)`;
			}
			requestAnimationFrame(sceneRenderer);
		};
		requestAnimationFrame(sceneRenderer);
	};

	// Run main function when DOM is loaded
	window.addEventListener("DOMContentLoaded", () => {
		main(window, document, document.documentElement, document.body);
	});

	// End of script
	return 0;
})();
