import { select } from "@wordpress/data";
import { COMMON_BLOCK_ATTRIBUTES } from "../../constants";

const attributes = {
	clientId: {
		type: String,
	},
	apiKey: {
		type: String,
	},
	postalCode: {
		type: Number,
	},
	alignment: {
		type: Object,
		style: [
			{
				selector: "{{WRAPPER}} { justify-content: {{VALUE}}; }",
			},
		],
	},
	color: {
		type: String,
		style: [
			{
				selector: "{{WRAPPER}} { color: {{VALUE}}; }",
			},
		],
	},
	...COMMON_BLOCK_ATTRIBUTES,
};
export default attributes;
