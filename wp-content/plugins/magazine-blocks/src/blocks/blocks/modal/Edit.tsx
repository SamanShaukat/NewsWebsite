/* eslint-disable no-console */
import "./editor.scss";
import "./style.scss";

import { InnerBlocks, RichText } from "@wordpress/block-editor";
import { withNotices } from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import classnames from "classnames";
import placeholderImage from "../../../images/placeholder.png";
import { EditProps } from "../../types";

import React from "react";
import { Icon } from "../../components";
import {
	useBlockStyle,
	useClientId,
	useCopyPasteStyles,
	useDeviceType,
} from "../../hooks";
import { cn } from "../../utils";
import InspectorControls from "./components/InspectorControls";

interface Props extends EditProps<any> {
	noticeUI: any;
	noticeOperations: any;
	name: string;
}

const Edit: React.ComponentType<Props> = (props) => {
	const {
		attributes: {
			image = {},
			imageSize,
			size,
			style,
			escPress,
			overlayClick,
			modalTrigger,
			triggerText,
			icon,
			tButtonIconPosition,
			buttonIcon,
			buttonText,
			closeIconPosition,
			closeIcon,
			triggerTextTypography,
			cssID,
			className,
		},
		setAttributes,
		noticeUI,
		noticeOperations,
	} = props;

	const { clientId } = useClientId(props);
	const { deviceType } = useDeviceType();
	const { CopyPasterStyleBlockControl } = useCopyPasteStyles();
	const { Style } = useBlockStyle({
		blockName: "modal",
		clientId,
		attributes: props.attributes,
		deviceType,
	});

	const defaultedAlt = image?.alt ? image.alt : "";
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

	const buttonClasses = classnames(
		"mzb-button-link",
		size && ("filled" === style || "outline" === style) && `is-${size}`,
		style && `is-style-${style}`
	);

	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		function handleOverlayClick(event: any) {
			if (
				overlayClick &&
				event.target.classList.contains("mzb-modal-popup")
			) {
				setIsModalOpen(false);
			}
		}

		function handleEscPress(event: any) {
			if (escPress && event.key === "Escape") {
				setIsModalOpen(false);
			}
		}

		document.addEventListener("keydown", handleEscPress);
		document.addEventListener("click", handleOverlayClick);

		return () => {
			document.removeEventListener("keydown", handleEscPress);
			document.removeEventListener("click", handleOverlayClick);
		};
	}, [escPress, overlayClick]);

	return (
		<>
			<InspectorControls
				attributes={props.attributes}
				setAttributes={setAttributes}
			/>
			<CopyPasterStyleBlockControl withBlockControls />
			<Style />
			<div
				className={classnames(
					`mzb-editor-preview-mode-${deviceType.toLowerCase()}`,
					`mzb-modal-${clientId}`,
					"mzb-modal-wrapper",
					{ "modal-open": isModalOpen }
				)}
				data-escpress={escPress ? "enable" : "disable"}
				data-overlayclick={overlayClick ? "enable" : "disable"}
			>
				<div className="mzb-editor-wrap">
					{"text" === modalTrigger && (
						<div
							className={cn(
								"mzb-modal-trigger",
								triggerTextTypography?._className
							)}
							onClick={() => setIsModalOpen(true)}
						>
							<RichText
								tagName="span"
								placeholder={__("Add Your Text Here", "mzb")}
								value={triggerText}
								className="mzb-modal-text"
								onChange={(value) =>
									setAttributes({ triggerText: value })
								}
							/>
						</div>
					)}
					{"icon" === modalTrigger && (
						<div
							className={cn(
								"mzb-modal-trigger",
								triggerTextTypography?._className
							)}
							onClick={() => setIsModalOpen(true)}
						>
							{"" !== icon && <Icon name={icon || {}} />}
						</div>
					)}
					{"image" === modalTrigger && (
						<figure
							className={cn(
								"mzb-modal-trigger",
								triggerTextTypography?._className
							)}
							onClick={() => setIsModalOpen(true)}
						>
							<img
								src={url || placeholderImage}
								alt={defaultedAlt}
								loading="lazy"
							/>
						</figure>
					)}
					{"button" === modalTrigger && (
						<div
							className={cn(
								"mzb-button mzb-button-wrapper mzb-modal-trigger",
								triggerTextTypography?._className
							)}
							onClick={() => setIsModalOpen(true)}
						>
							<div
								className={buttonClasses}
								rel="noopener noreferrer"
							>
								<span className="mzb-modal-content-wrapper">
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
									<RichText
										tagName="span"
										placeholder={__("Click Here", "mzb")}
										value={buttonText}
										className="mzb-inline-editing"
										onChange={(value) =>
											setAttributes({ buttonText: value })
										}
										allowedFormats={[]} //Removed the WP default link/bold/italic from the toolbar for button.
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
								</span>
							</div>
						</div>
					)}
				</div>
				<div
					className={cn("mzb-modal-popup", `mzb-block-${clientId}`, {
						active: isModalOpen,
					})}
				>
					<div className="mzb-modal-popup-wrap">
						<div className="mzb-modal-popup-content">
							<InnerBlocks
								renderAppender={
									InnerBlocks.DefaultBlockAppender
								}
							/>
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
								onClick={() => setIsModalOpen(false)}
							>
								{"" !== closeIcon && (
									<Icon name={closeIcon || {}} />
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default withNotices(Edit);
