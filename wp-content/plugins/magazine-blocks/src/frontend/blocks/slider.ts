import domReady from "@wordpress/dom-ready";

domReady(() => {
	import("@splidejs/splide").then(({ Splide }) => {
		new Splide(".splide", {
			perPage: 1,
			pauseOnHover: false,
			interval: 2000,
			type: "loop",
		}).mount();
	});

	const { $$, each, toArray } = window.magazineBlocksUtils;
	const swiperEls = $$(
		'[class*="mzb-slider"] .swiper'
	) as unknown as Array<HTMLElement>;

	if (!swiperEls.length) return;

	import("swiper/modules").then(
		({ Navigation, Pagination, Autoplay, Keyboard }) => {
			import("swiper").then(({ Swiper }) => {
				each(toArray(swiperEls), (el) => {
					const config = JSON.parse(el.dataset?.swiper ?? "{}");

					new Swiper(el, {
						modules: [Navigation, Pagination, Autoplay, Keyboard],
						loop: true,
						slidesPerView:
							config.sliderStyle === "style3"
								? config.slidesPerView
								: 1,
						spaceBetween: 20,
						speed: config.speed ?? 500,
						autoplay: config.autoplay ? { delay: 5000 } : false,
						navigation: config.arrows ?? true,
						pagination: config.pagination ?? false,
						keyboard: {
							enabled: true,
						},
						grabCursor: false,
						simulateTouch: false,
						createElements: config.arrows ?? false,
					});
				});
			});
		}
	);
});
