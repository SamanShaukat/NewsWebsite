import React from "react";
import { __ } from "@wordpress/i18n";
import AdvancedControls from "../../../components/common/AdvancedControls";
import InspectorTabs, {
	AdvancedInspectorControls,
	GeneralInspectorControls,
	StyleInspectorControls,
} from "../../../components/common/InspectorTabs";
import ResponsiveControls from "../../../components/common/ResponsiveControls";
import Panel from "../../../components/common/Panel";
import {
	ToggleButton,
	ToggleButtonGroup,
	PopoverDrawer,
	ColorPicker,
} from "../../../controls";
import {
	TextAlignCenter,
	TextAlignLeft,
	TextAlignRight,
} from "../../../components/icons/Icons";
import ZStack from "../../../components/common/ZStack";
import {
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	position,
} from "@chakra-ui/react";
import Reset from "../../../controls/common/Reset";

type Props = {
	attributes: any;
	setAttributes: (attributes: any) => void;
	categories?: any[];
	tags?: any[];
	authorOptions?: any[];
};

const InspectorControls: React.ComponentType<Props> = (props) => {
	const {
		attributes: {
			alignment,
			color,
			blockPadding,
			blockMargin,
			hideOnDesktop,
			hideOnTablet,
			hideOnMobile,
		},
		setAttributes,
	} = props;
	return (
		<>
			<InspectorTabs />
			<GeneralInspectorControls>
				<Panel title={__("General", "magazine-blocks")} initialOpen>
					<ToggleButtonGroup
						value={alignment}
						onChange={(value) => {
							setAttributes({ alignment: value });
						}}
						label={__("Text Alignment", "magazine-blocks")}
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
			</GeneralInspectorControls>
			<StyleInspectorControls>
				<Panel title={__("Text", "magazine-blocks")} initialOpen>
					<PopoverDrawer
						label={__("Text Color", "magazine-blocks")}
						trigger={(props) => (
							<PopoverDrawer.Trigger {...props}>
								<ZStack
									items={[
										{
											color: color,
											id: "color",
										},
									]}
								/>
							</PopoverDrawer.Trigger>
						)}
						closeOnFocusOutside
					>
						<Tabs position="relative">
							<TabList>
								<Tab>{__("Normal", "magazine-blocks")}</Tab>
							</TabList>

							<TabPanels>
								<TabPanel>
									<Reset
										saved={color}
										resetKey="color"
										onReset={(v) =>
											setAttributes({ color: v })
										}
										buttonProps={{
											position: "absolute",
											top: "12px",
											right: "10px",
										}}
									></Reset>
									<ColorPicker
										value={color}
										onChange={(v) =>
											setAttributes({ color: v })
										}
									></ColorPicker>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</PopoverDrawer>
				</Panel>
			</StyleInspectorControls>
			<AdvancedInspectorControls>
				<AdvancedControls
					blockMargin={blockMargin}
					setAttributes={setAttributes}
					blockPadding={blockPadding}
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
