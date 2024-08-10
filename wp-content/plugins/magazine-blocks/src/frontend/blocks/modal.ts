(() => {
	const { $$, domReady } = window.magazineBlocksUtils;
	const initModal = () => {
		if ($$(".mzb-modal-wrapper")) {
			import("micromodal").then(({ default: MicroModal }) => {
				MicroModal.init();
			});
		}
	};
	domReady(initModal);
})();
