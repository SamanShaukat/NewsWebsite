import { Swiper } from "swiper";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { SwiperOptions } from "swiper/types/swiper-options";

const DEFAULT_OPTIONS = {
	modules: [Autoplay, Keyboard, Navigation, Pagination],
	loop: true,
	slidesPerView: 1,
	spaceBetween: 20,
	speed: 500,
	autoplay: {
		delay: 5000,
	},
	navigation: true,
	pagination: true,
	keyboard: {
		enabled: true,
	},
	grabCursor: false,
	simulateTouch: false,
	createElements: true,
} as SwiperOptions;

export const initSlider = (
	container: HTMLDivElement | string,
	options?: SwiperOptions
) => {
	const params = {
		...DEFAULT_OPTIONS,
		...(options ?? {}),
	};

	return new Swiper(container, params);
};
