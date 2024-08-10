import { Media } from "@blocks/components";
import { __ } from "@wordpress/i18n";
import React from "react";
import AdvancedControls from "../../../components/common/AdvancedControls";
import InspectorTabs, {
	AdvancedInspectorControls,
	GeneralInspectorControls,
	StyleInspectorControls,
} from "../../../components/common/InspectorTabs";
import Panel from "../../../components/common/Panel";
import ResponsiveControls from "../../../components/common/ResponsiveControls";
import ZStack from "../../../components/common/ZStack";
import {
	ButtonFilled,
	ButtonLink,
	ButtonOutline,
	ButtonPlain,
	TextAlignCenter,
	TextAlignLeft,
	TextAlignRight,
} from "../../../components/icons/Icons";
import {
	Background,
	Border,
	ColorPicker,
	Dimensions,
	IconPicker,
	PopoverDrawer,
	Select,
	Slider,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "../../../controls";
import Reset from "../../../controls/common/Reset";
// import { isCSSVariable } from "../../../utils";

type Props = {
	attributes: any;
	setAttributes: (attributes: any) => void;
};

const InspectorControls: React.ComponentType<Props> = (props) => {
	const {
		attributes: {
			className,
			hideOnDesktop,
			hideOnTablet,
			hideOnMobile,
			blockMargin,
			blockPadding,
			blockZIndex,
			cssID,
			icon,
			style,
			size,
			buttonPadding,
			image,
			modalTrigger,
			buttonIcon,
			tButtonIconPosition,
			tButtonIconSize,
			tButtonIconGap,
			closeIconPosition,
			closeIcon,
			alignment,
			width,
			height,
			maxHeight,
			modalBackground,
			padding,
			border,
			closeIconSize,
			color,
			triggerTextColor,
			triggerTextTypography,
			iconColor,
			popupBackground,
			triggerButtonBackground,
			triggerBtnTextColor,
			triggerBtnTextTypo,
		},
		setAttributes,
	} = props;
	return (
		<>
			<InspectorTabs />
			<GeneralInspectorControls>
				<Panel title={__("Trigger", "blockart")} initialOpen>
					<ToggleButtonGroup
						value={modalTrigger}
						label="Type"
						onChange={(val) => setAttributes({ modalTrigger: val })}
						groupProps={{
							sx: {
								".chakra-button": {
									minH: "32px",
									svg: {
										w: "40px !important",
										h: "6",
									},
									"&[data-active]": {
										svg: {
											fill: "#fff !important",
										},
									},
								},
							},
						}}
					>
						<ToggleButton value="button">
							{__("Button", "blockart")}
						</ToggleButton>
						<ToggleButton value="icon">
							{__("Icon", "blockart")}
						</ToggleButton>
						<ToggleButton value="image">
							{__("Image", "blockart")}
						</ToggleButton>
						<ToggleButton value="text">
							{__("Text", "blockart")}
						</ToggleButton>
					</ToggleButtonGroup>

					{modalTrigger === "button" && (
						<>
							<ToggleButtonGroup
								value={style}
								onChange={(v) => {
									setAttributes({ style: v });
								}}
								label={__("Button Type", "blockart")}
								resetAttributeKey="style"
								groupProps={{
									sx: {
										".chakra-button": {
											minH: "32px",
											svg: {
												w: "40px !important",
												h: "6",
											},
											"&[data-active]": {
												svg: {
													fill: "#fff !important",
												},
											},
										},
									},
								}}
							>
								<ToggleButton value="filled">
									<ButtonFilled />
								</ToggleButton>
								<ToggleButton value="outline">
									<ButtonOutline />
								</ToggleButton>
								<ToggleButton value="link">
									<ButtonLink />
								</ToggleButton>
								<ToggleButton value="plain">
									<ButtonPlain />
								</ToggleButton>
							</ToggleButtonGroup>
							{("filled" === style || "outline" === style) && (
								<>
									<ToggleButtonGroup
										value={size}
										onChange={(v) => {
											setAttributes({ size: v });
										}}
										label={__("Size", "blockart")}
										resetAttributeKey="size"
										groupProps={{
											sx: {
												".chakra-button": {
													minH: "32px",
													svg: {
														w: 6,
														h: 6,
													},
												},
											},
										}}
									>
										<ToggleButton value="small">
											Small
										</ToggleButton>
										<ToggleButton value="medium">
											Medium
										</ToggleButton>
										<ToggleButton value="large">
											Large
										</ToggleButton>
									</ToggleButtonGroup>
								</>
							)}
							<IconPicker
								hasToggle={true}
								value={buttonIcon || {}}
								onChange={(val) =>
									setAttributes({ buttonIcon: val })
								}
							/>
							{buttonIcon?.enable && (
								<>
									<ToggleButtonGroup
										value={tButtonIconPosition}
										onChange={(v) => {
											setAttributes({
												tButtonIconPosition: v,
											});
										}}
										label={__("Icon Position", "blockart")}
										resetAttributeKey="tButtonIconPosition"
										groupProps={{
											sx: {
												".chakra-button": {
													minH: "32px",
													svg: {
														w: 6,
														h: 6,
													},
													"&[data-active]": {
														svg: {
															fill: "#fff !important",
														},
													},
												},
											},
										}}
									>
										<ToggleButton value="before">
											{__("Before Text", "blockart")}
										</ToggleButton>
										<ToggleButton value="after">
											{__("After Text", "blockart")}
										</ToggleButton>
									</ToggleButtonGroup>
									<Slider
										resetAttributeKey="tButtonIconSize"
										label={__("Icon Size", "blockart")}
										min={0}
										max={50}
										value={tButtonIconSize}
										onChange={(val: any) =>
											setAttributes({
												tButtonIconSize: val,
											})
										}
										responsive
										units={["px", "em", "%"]}
									/>
									<Slider
										resetAttributeKey="tButtonIconGap"
										label={__("Icon Gap", "blockart")}
										min={0}
										max={60}
										value={tButtonIconGap}
										onChange={(val: any) =>
											setAttributes({
												tButtonIconGap: val,
											})
										}
										responsive
										units={["px", "em", "%"]}
									/>
								</>
							)}
						</>
					)}
					{modalTrigger === "icon" && (
						<>
							<IconPicker
								value={icon}
								onChange={(val) => setAttributes({ icon: val })}
								hasToggle={false}
							/>
							<PopoverDrawer
								label={__("Icon Color", "blockart")}
								trigger={(props) => {
									const Trigger = () => (
										<PopoverDrawer.Trigger {...props}>
											<ZStack
												items={[
													{
														color: iconColor,
														id: "iconColor",
													},
												]}
											/>
										</PopoverDrawer.Trigger>
									);
									return <Trigger />;
								}}
							>
								<ColorPicker
									onChange={(val) =>
										setAttributes({ iconColor: val })
									}
									label={__("Color", "blockart")}
									value={iconColor}
									resetKey={"iconColor"}
								/>
							</PopoverDrawer>
						</>
					)}
					{modalTrigger === "image" && (
						<>
							<Media
								onChange={(val: any) =>
									setAttributes({ image: val })
								}
								label={__("Image", "blockart")}
								type={"image"}
								value={image ? image : {}}
							/>
						</>
					)}
				</Panel>
				<Panel title={__("Content Size", "blockart")}>
					<Slider
						label={__("Modal Width", "blockart")}
						value={width}
						onChange={(val) => setAttributes({ width: val })}
						min={0}
						max={100}
						step={5}
						forceShowUnit
						resetAttributeKey={"width"}
						responsive
						defaultUnit="%"
					/>
					<Slider
						onChange={(val: any) =>
							setAttributes({ maxHeight: val })
						}
						label={__("Max Height", "blockart")}
						units={["px", "em", "%"]}
						responsive={true}
						min={0}
						max={1500}
						value={maxHeight}
						resetAttributeKey={"maxHeight"}
					/>
					<Slider
						onChange={(val: any) => setAttributes({ height: val })}
						label={__("Popup Height", "blockart")}
						units={["px", "em", "%"]}
						responsive={true}
						min={130}
						max={1500}
						value={height}
						resetAttributeKey={"height"}
					/>
				</Panel>
				<Panel title={__("Close Button", "blockart")}>
					<IconPicker
						value={closeIcon}
						onChange={(val) => setAttributes({ closeIcon: val })}
						hasToggle={false}
					/>
					<Select
						label={__("Icon Position", "blockart")}
						value={closeIconPosition}
						onChange={(val) =>
							setAttributes({ closeIconPosition: val })
						}
						options={[
							{
								label: __("Popup Top Left", "blockart"),
								value: "popup-top-left",
							},
							{
								label: __("Popup Top Right", "blockart"),
								value: "popup-top-right",
							},
							{
								label: __("Window Top Left", "blockart"),
								value: "window-top-left",
							},
							{
								label: __("Window Top Right", "blockart"),
								value: "window-top-right",
							},
						]}
					/>
					<Slider
						resetAttributeKey="closeIconSize"
						label={__("Icon Size", "blockart")}
						min={0}
						max={50}
						value={closeIconSize}
						onChange={(val: any) =>
							setAttributes({ closeIconSize: val })
						}
						responsive
						units={["px", "em", "%"]}
					/>
					<PopoverDrawer
						label={__("Icon Color", "blockart")}
						trigger={(props) => {
							const Trigger = () => (
								<PopoverDrawer.Trigger {...props}>
									<ZStack
										items={[{ color: color, id: "color" }]}
									/>
								</PopoverDrawer.Trigger>
							);
							return <Trigger />;
						}}
					>
						<ColorPicker
							onChange={(val) => setAttributes({ color: val })}
							label={__("Color", "blockart")}
							value={color}
							resetKey={"color"}
						/>
					</PopoverDrawer>
				</Panel>
			</GeneralInspectorControls>
			<StyleInspectorControls>
				<Panel title={__("Properties", "blockart")} initialOpen>
					<ToggleButtonGroup
						value={alignment}
						onChange={(v) => {
							setAttributes({ alignment: v });
						}}
						label={__("Text Alignment", "blockart")}
						responsive
						resetAttributeKey="alignment"
						groupProps={{
							sx: {
								".chakra-button": {
									minH: "32px",
									svg: {
										w: 6,
										h: 6,
									},
									"&[data-active]": {
										svg: {
											fill: "#fff !important",
										},
									},
								},
							},
						}}
					>
						<ToggleButton value="left">
							<TextAlignLeft />
						</ToggleButton>
						<ToggleButton value="center">
							<TextAlignCenter />
						</ToggleButton>
						<ToggleButton value="right">
							<TextAlignRight />
						</ToggleButton>
					</ToggleButtonGroup>
				</Panel>
				{modalTrigger === "button" && (
					<>
						<Panel title={__("Button", "blockart")}>
							<PopoverDrawer
								label={__("Text Color", "blockart")}
								trigger={(props) => {
									const Trigger = () => (
										<PopoverDrawer.Trigger {...props}>
											<ZStack
												items={[
													{
														color: triggerBtnTextColor,
														id: "triggerBtnTextColor",
													},
												]}
											/>
										</PopoverDrawer.Trigger>
									);
									return <Trigger />;
								}}
							>
								<ColorPicker
									onChange={(val) =>
										setAttributes({
											triggerBtnTextColor: val,
										})
									}
									label={__("Color", "blockart")}
									value={triggerBtnTextColor}
									resetKey={"triggerBtnTextColor"}
								/>
							</PopoverDrawer>
							<PopoverDrawer label={__("Background", "blockart")}>
								<Reset
									saved={triggerButtonBackground}
									resetKey="triggerButtonBackground"
									onReset={(v) => {
										setAttributes({
											triggerButtonBackground: v,
										});
									}}
									buttonProps={{
										position: "absolute",
										top: "12px",
										right: "10px",
									}}
								/>
								<Background
									value={triggerButtonBackground}
									onChange={(v) =>
										setAttributes({
											triggerButtonBackground: v,
										})
									}
								/>
							</PopoverDrawer>
							{size && "custom" === size && (
								<Dimensions
									value={buttonPadding || {}}
									responsive
									label={__("Padding", "blockart")}
									defaultUnit="px"
									units={["px", "rem", "em", "%"]}
									onChange={(val) =>
										setAttributes({ buttonPadding: val })
									}
									type="buttonPadding"
								/>
							)}
							<Typography
								resetAttributeKey="triggerBtnTextTypo"
								value={triggerBtnTextTypo}
								onChange={(val: any) =>
									setAttributes({
										triggerBtnTextTypo: val,
									})
								}
							/>
						</Panel>
					</>
				)}
				{modalTrigger === "text" && (
					<>
						<Panel title={__("Text", "blockart")}>
							<PopoverDrawer
								label={__("Text Color", "blockart")}
								trigger={(props) => {
									const Trigger = () => (
										<PopoverDrawer.Trigger {...props}>
											<ZStack
												items={[
													{
														color: triggerTextColor,
														id: "triggerTextColor",
													},
												]}
											/>
										</PopoverDrawer.Trigger>
									);
									// if (isCSSVariable(triggerTextColor)) {
									// 	return (
									// 		<Box position="relative">
									// 			<Trigger />
									// 			<Global
									// 				position="absolute"
									// 				fill="primary.500"
									// 				height="14px"
									// 				width="14px"
									// 				top="-5px"
									// 				left="-10px"
									// 				bg="white"
									// 				borderRadius="full"
									// 			/>
									// 		</Box>
									// 	);
									// }
									return <Trigger />;
								}}
							>
								<ColorPicker
									onChange={(val) =>
										setAttributes({ triggerTextColor: val })
									}
									label={__("Color", "blockart")}
									value={triggerTextColor}
									resetKey={"triggerTextColor"}
								/>
							</PopoverDrawer>
							<Typography
								resetAttributeKey="triggerTextTypography"
								value={triggerTextTypography}
								onChange={(val) =>
									setAttributes({
										triggerTextTypography: val,
									})
								}
							/>
						</Panel>
					</>
				)}
				<Panel title={__("Modal", "blockart")}>
					<Dimensions
						label={__("Padding", "blockart")}
						value={padding}
						resetAttributeKey={"padding"}
						onChange={(v) => {
							setAttributes({ padding: v });
						}}
						responsive={true}
						units={["px", "em", "%"]}
					/>
					<PopoverDrawer label={__("Background", "blockart")}>
						<Reset
							saved={modalBackground}
							resetKey="modalBackground"
							onReset={(v) => {
								setAttributes({ modalBackground: v });
							}}
							buttonProps={{
								position: "absolute",
								top: "12px",
								right: "10px",
							}}
						/>
						<Background
							value={modalBackground}
							onChange={(v) =>
								setAttributes({ modalBackground: v })
							}
						/>
					</PopoverDrawer>
					<Border
						resetAttributeKey="border"
						value={border}
						onChange={(val) => setAttributes({ border: val })}
					/>
				</Panel>
				<Panel title={__("Popup", "blockart")}>
					<PopoverDrawer label={__("Background", "blockart")}>
						<Reset
							saved={popupBackground}
							resetKey="popupBackground"
							onReset={(v) => {
								setAttributes({ popupBackground: v });
							}}
							buttonProps={{
								position: "absolute",
								top: "12px",
								right: "10px",
							}}
						/>
						<Background
							value={popupBackground}
							onChange={(v) =>
								setAttributes({ popupBackground: v })
							}
						/>
					</PopoverDrawer>
				</Panel>
			</StyleInspectorControls>
			<AdvancedInspectorControls>
				<AdvancedControls
					blockMargin={blockMargin}
					setAttributes={setAttributes}
					blockPadding={blockPadding}
					blockZIndex={blockZIndex}
					cssID={cssID}
					className={className}
					// hasblockHTML={false}
				/>
				<ResponsiveControls
					{...{
						hideOnDesktop,
						hideOnTablet,
						hideOnMobile,
						setAttributes,
					}}
				/>
			</AdvancedInspectorControls>
		</>
	);
};

export default InspectorControls;
