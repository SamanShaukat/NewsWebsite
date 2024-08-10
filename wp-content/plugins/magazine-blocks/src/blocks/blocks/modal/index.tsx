import React from "react";
import { Icon } from "../../components";
import metadata from "./block.json";
import Edit from "./Edit";
import Save from "./Save";
import "./style.scss";

export const name = metadata.name;

export const settings = {
	...metadata,
	icon: <Icon type="blockIcon" name="modal" size={24} />,
	edit: Edit,
	save: Save,
};
