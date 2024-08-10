import { InnerBlocks, RichText } from "@wordpress/block-editor";
import { BlockSaveProps } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import React from "react";
import { Icon } from "../../components";
import { cn } from "../../utils";

const Save: React.ComponentType<BlockSaveProps<any>> = (props) => {
	const {
		clientId,
		modalTrigger,
		triggerText,
		icon,
		iconImage,
		image,
		imageSize,
		buttonText,
		buttonIcon,
		size,
		style,
		tButtonIconPosition,
		closeIconPosition,
		closeIcon,
		triggerTextTypography,
	} = props.attributes;

	const defaultedAlt = iconImage && iconImage?.alt ? iconImage?.alt : "";
	let url = "";

	if (image?.url) {
		url = image.url;
		const size = image.sizes;
		const imageSizes = imageSize;

		if (
			typeof size !== "undefined" &&
			typeof size[imageSizes] !== "undefined"
		) {
			url = size[imageSizes].url;
		}
	}

	const buttonClasses = cn(
		"mzb-button-link",
		size && ("filled" === style || "outline" === style) && `is-${size}`,
		style && `is-style-${style}`
	);

	return (
		<div className={cn("mzb-modal-wrapper", `mzb-modal-${clientId}`)}>
			<>
				{"text" === modalTrigger && (
					<div
						className={cn(
							"mzb-modal-trigger",
							triggerTextTypography?._className
						)}
						data-micromodal-trigger={`mzb-modal-${clientId}`}
					>
						<RichText.Content tagName="span" value={triggerText} />
					</div>
				)}
				{"icon" === modalTrigger && (
					<div
						className={cn(
							"mzb-modal-trigger",
							triggerTextTypography?._className
						)}
						data-micromodal-trigger={`mzb-modal-${clientId}`}
					>
						{"" !== icon && <Icon name={icon || {}} />}
					</div>
				)}
				{"image" === modalTrigger && (
					<div
						className={cn(
							"mzb-modal-trigger",
							triggerTextTypography?._className
						)}
						data-micromodal-trigger={`mzb-modal-${clientId}`}
					>
						<img src={url} alt={defaultedAlt} />
					</div>
				)}
				{"button" === modalTrigger && (
					<div
						className={cn(
							"mzb-button mzb-button-wrapper mzb-modal-trigger",
							triggerTextTypography?._className
						)}
					>
						<button
							className={buttonClasses}
							data-micromodal-trigger={`mzb-modal-${clientId}`}
						>
							{buttonIcon &&
								"" !== buttonIcon.icon &&
								buttonIcon.enable &&
								"before" === tButtonIconPosition && (
									<span className="mzb-button-icon">
										<Icon
											type="frontendIcon"
											name={buttonIcon.icon}
										/>
									</span>
								)}
							<RichText.Content
								className="mzb-inline-editing"
								tagName="span"
								placeholder={__("Click Here", "mzb")}
								value={buttonText}
							/>
							{buttonIcon &&
								"" !== buttonIcon.icon &&
								buttonIcon.enable &&
								"after" === tButtonIconPosition && (
									<span className="mzb-button-icon">
										<Icon
											type="frontendIcon"
											name={buttonIcon.icon}
										/>
									</span>
								)}
						</button>
					</div>
				)}
			</>
			<div
				className={`mzb-modal-popup active`}
				id={`mzb-modal-${clientId}`}
				aria-hidden="true"
			>
				<div className="mzb-modal-overlay" data-micromodal-close>
					<div className="mzb-modal-popup-wrap">
						<div className="mzb-modal-popup-content">
							<InnerBlocks.Content />
						</div>
						{("window-top-left" === closeIconPosition ||
							"window-top-right" === closeIconPosition ||
							"popup-top-left" === closeIconPosition ||
							"popup-top-right" === closeIconPosition) && (
							<div
								className={cn(
									"mzb-modal-popup-close",
									closeIconPosition
								)}
								data-micromodal-close
							>
								{"" !== closeIcon && (
									<Icon name={closeIcon || {}} />
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Save;
