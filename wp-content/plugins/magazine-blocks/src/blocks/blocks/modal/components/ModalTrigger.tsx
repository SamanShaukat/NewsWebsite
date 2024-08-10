import { RichText } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import React from "react";
import placeholderImage from "../../../../images/placeholder.png";
import { Icon } from "../../../components";
import { cn } from "../../../utils";

const ModalTrigger: React.FC<{
	triggerText: string;
	setTriggerText: (text: string) => void;
	setButtonText: (text: string) => void;
	type: "button" | "text" | "icon" | "image";
	icon?: string;
	imageUrl?: string;
	imageAltText?: string;
	buttonIcon?: {
		icon?: string;
		enable?: boolean;
	};
	buttonIconPosition?: "before" | "after";
	buttonText?: string;
	onOpen: () => void;
	size?: any;
	buttonStyle?: string;
}> = (props) => {
	const {
		triggerText,
		setTriggerText,
		type,
		icon,
		imageUrl = placeholderImage,
		buttonIcon,
		buttonIconPosition,
		imageAltText,
		buttonText,
		setButtonText,
		onOpen,
		size,
		buttonStyle,
	} = props;

	const Trigger = () => {
		switch (type) {
			case "text":
				return (
					<RichText
						tagName="span"
						placeholder={__("Add Your Text Here", "blockart")}
						value={triggerText}
						onChange={setTriggerText}
						onClick={onOpen}
					/>
				);
			case "icon":
				return (
					<span onClick={onOpen}>
						<Icon name={icon} />
					</span>
				);
			case "image":
				return (
					<img onClick={onOpen} src={imageUrl} alt={imageAltText} />
				);
			default:
				return (
					<div
						onClick={onOpen}
						className={cn(
							"blockart-button",
							size && `is-${size}`,
							buttonStyle && `is-style-${buttonStyle}`
						)}
					>
						{"" !== buttonIcon?.icon &&
							buttonIcon?.enable &&
							"before" === buttonIconPosition && (
								<span className="blockart-button-icon">
									<Icon
										type="frontendIcon"
										name={buttonIcon.icon}
									/>
								</span>
							)}
						<RichText
							tagName="span"
							placeholder={__("Click Here", "blockart")}
							value={buttonText ?? ""}
							className="blockart-inline-editing"
							onChange={setButtonText}
							allowedFormats={[]}
						/>
						{buttonIcon &&
							"" !== buttonIcon.icon &&
							buttonIcon.enable &&
							"after" === buttonIconPosition && (
								<span className="blockart-button-icon">
									<Icon
										type="frontendIcon"
										name={buttonIcon.icon}
									/>
								</span>
							)}
					</div>
				);
		}
	};

	return (
		<div
			className={cn(
				"blockart-modal-trigger",
				`blockart-modal-trigger-${type}`
			)}
		>
			<Trigger />
		</div>
	);
};

export default ModalTrigger;
