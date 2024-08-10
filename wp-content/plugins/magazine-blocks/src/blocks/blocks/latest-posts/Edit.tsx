import { withSelect } from "@wordpress/data";
import { dateI18n, __experimentalGetSettings } from "@wordpress/date";
import { Fragment } from "@wordpress/element";
import { EditProps } from "blocks/types";
import React from "react";
import classnames from "classnames";
import { Icon } from "../../components";

import { useBlockStyle } from "../../hooks";

import { useClientId, useCopyPasteStyles, useDeviceType } from "@blocks/hooks";

import "../assets/sass/blocks/latest-posts/style.scss";
import InspectorControls from "./components/InspectorControls";
import { useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { Button, Flex, FlexItem } from "@wordpress/components";
import { latestPosts } from "../../components/icon/icons.json";

interface Props extends EditProps<any> {
	categories: Array<any>;
	posts: Array<any>;
	tags: Array<any>;
	numberOfPosts: number;
	page: number;
	author: Array<any>;
}

const Edit: React.ComponentType<Props> = (props) => {
	const {
		posts,
		className,
		attributes: {
			enableHeading,
			label,
			layout,
			column,
			layout1AdvancedStyle,
			layout2AdvancedStyle,

			excerptLimit,
			enableExcerpt,
			enableReadMore,
			readMoreText,

			enablePagination,

			metaPosition,
			enablePostTitle,
			enableAuthor,
			enableDate,

			hoverAnimation,
			hideOnDesktop,
		},
		setAttributes,
		categories,
		tags,
		numberOfPosts,
		page,
	} = props;

	const { clientId } = useClientId(props);
	const { deviceType } = useDeviceType();
	const { CopyPasterStyleBlockControl } = useCopyPasteStyles();
	const { Style } = useBlockStyle({
		blockName: "latest-posts",
		clientId,
		attributes: props.attributes,
		deviceType,
	});

	const blockProps = useBlockProps();

	const classNames = classnames(
		`mzb-latest-posts mzb-latest-posts-${clientId}`,
		className,
		hideOnDesktop && "magazine-blocks-hide-on-desktop"
	);

	const classNames2 = classnames(
		`mzb-posts mzb-${layout} mzb-post-col--${column || "4"}`,
		{
			[`mzb-${layout1AdvancedStyle}`]: layout === `layout-1`,
			[`mzb-${layout2AdvancedStyle}`]: layout === `layout-2`,
		}
	);

	// Fetch the next page of posts
	const loadMorePosts = (nextPage: number) => {
		// Update the block's attributes to trigger a re-render with the next page
		setAttributes({ page: nextPage });
	};

	const NumberedPagination = ({
		totalPages,
		currentPage,
		onPageChange,
	}: {
		totalPages: number;
		currentPage: number;
		onPageChange: (val: number) => void;
	}) => {
		if (totalPages < 2) {
			return null; // Don't render pagination if there's only one page
		}

		const pages = Array.from(
			{ length: totalPages },
			(_, index) => index + 1
		);

		return (
			<Flex>
				{/* eslint-disable-next-line */}
				{pages.map((page) => (
					<FlexItem key={page}>
						<Button
							isPrimary={page === currentPage}
							onClick={() => onPageChange(page)}
						>
							{page}
						</Button>
					</FlexItem>
				))}
			</Flex>
		);
	};

	// Render numbered pagination
	const pagination = (
		<NumberedPagination
			totalPages={Math.ceil(numberOfPosts / 4)}
			currentPage={page}
			onPageChange={loadMorePosts}
		/>
	);

	return (
		<Fragment>
			<InspectorControls
				attributes={props.attributes}
				setAttributes={setAttributes}
				categories={categories}
				tags={tags}
			/>
			<CopyPasterStyleBlockControl withBlockControls />
			<Style />
			<div>
				<div className={classNames}>
					{enableHeading === true && (
						<div className={`mzb-post-heading`}>
							<h2> {label} </h2>
						</div>
					)}
					<div className={classNames2}>
						<Fragment>
							{posts?.map((post, id) => {
								const maxWords = excerptLimit; // Replace with your desired word limit
								const excerpt = post.excerpt.rendered
									.split(" ")
									.slice(0, maxWords)
									.join(" ");
								return (
									<div key={id} className="mzb-post">
										{post
											?.magazine_blocks_featured_image_url
											?.full?.[0] && (
											<div
												className={`mzb-featured-image ${hoverAnimation}`}
											>
												<img
													src={
														post
															.magazine_blocks_featured_image_url
															.full[0]
													}
												/>
											</div>
										)}
										{(enableDate ||
											enableAuthor ||
											enablePostTitle) && (
											<>
												<div className="mzb-post-content">
													{metaPosition ===
														"bottom" && (
														<>
															{enablePostTitle ===
																true && (
																<h3 className="mzb-post-title">
																	<a
																		href={
																			post.link
																		}
																	>
																		{
																			post
																				.title
																				.rendered
																		}
																	</a>
																</h3>
															)}
															{(enableAuthor ||
																enableDate) && (
																<>
																	<div className="mzb-post-entry-meta">
																		{enableAuthor ===
																			true && (
																			<span className="mzb-post-author">
																				<img
																					className="author-display-image"
																					src={
																						post.magazine_blocks_author_image
																					}
																				/>
																				<a
																					href={
																						post
																							.magazine_blocks_author
																							.author_link
																					}
																				>
																					{" "}
																					{
																						post
																							.magazine_blocks_author
																							.display_name
																					}{" "}
																				</a>
																			</span>
																		)}

																		{enableDate ===
																			true && (
																			<span className="mzb-post-date">
																				<Icon
																					type="blockIcon"
																					name="calendar"
																					size={
																						24
																					}
																				/>
																				<a href="#">
																					{" "}
																					{dateI18n(
																						__experimentalGetSettings()
																							.formats
																							.date,
																						post.date_gmt,
																						undefined
																					)}{" "}
																				</a>
																			</span>
																		)}
																	</div>
																</>
															)}
														</>
													)}

													{metaPosition === "top" &&
														(enableAuthor ||
															enableDate) && (
															<>
																<div className="mzb-post-entry-meta">
																	{enableAuthor ===
																		true && (
																		<span className="mzb-post-author">
																			<img
																				className="author-display-image"
																				src={
																					post.magazine_blocks_author_image
																				}
																			/>
																			<a
																				href={
																					post
																						.magazine_blocks_author
																						.author_link
																				}
																			>
																				{" "}
																				{
																					post
																						.magazine_blocks_author
																						.display_name
																				}{" "}
																			</a>
																		</span>
																	)}

																	{enableDate ===
																		true && (
																		<span className="mzb-post-date">
																			<Icon
																				type="blockIcon"
																				name="calendar"
																				size={
																					24
																				}
																			/>
																			<a href="#">
																				{" "}
																				{dateI18n(
																					__experimentalGetSettings()
																						.formats
																						.date,
																					post.date_gmt,
																					undefined
																				)}{" "}
																			</a>
																		</span>
																	)}
																</div>

																{enablePostTitle ===
																	true && (
																	<h3 className="mzb-post-title">
																		<a
																			href={
																				post.link
																			}
																		>
																			{
																				post
																					.title
																					.rendered
																			}
																		</a>
																	</h3>
																)}
															</>
														)}

													{(enableExcerpt ||
														enableReadMore) && (
														<div className="mzb-entry-content">
															{enableExcerpt && (
																<div
																	className="mzb-entry-summary"
																	dangerouslySetInnerHTML={{
																		__html: excerpt,
																	}}
																/>
															)}
															{enableReadMore && (
																<div className="mzb-read-more">
																	<a
																		href={
																			post
																				.excerpt
																				.rendered
																		}
																	>
																		{
																			readMoreText
																		}
																	</a>
																</div>
															)}
														</div>
													)}
												</div>
											</>
										)}
									</div>
								);
							})}
							{enablePagination && (
								<div className="mzb-pagination-numbers">
									{pagination}
								</div>
							)}
						</Fragment>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

// @ts-ignore
export default withSelect((select, props) => {
	const { getEntityRecords } = select("core");
	const {
		attributes: {
			category,
			tag,
			order = "desc",
			orderBy = "date",
			authorName,
			excludedCategory,
			page,
		},
	} = props;

	// Fetch all categories
	const categories =
		getEntityRecords("taxonomy", "category", { per_page: -1 }) || [];

	// Store the latest post per category, ensuring no duplicates
	const latestPosts: any[] = [];
	const fetchedPostIds = new Set();

	categories.forEach((cat: { id: any }) => {
		const postsInCategory = getEntityRecords("postType", "post", {
			categories: cat.id,
			order,
			orderby: orderBy,
			per_page: 1,
		});

		if (postsInCategory && postsInCategory.length > 0) {
			const latestPost = postsInCategory[0];
			if (!fetchedPostIds.has(latestPost.id)) {
				latestPosts.push(latestPost);
				fetchedPostIds.add(latestPost.id);
			}
		}
	});

	return {
		posts: latestPosts,
		categories,
	};
})(Edit);
