import { Node } from "@tiptap/core";
import { Props, PropSchema } from "../blocks/types";
import {
  InlineContentConfig,
  InlineContentImplementation,
  InlineContentSchemaFromSpecs,
  InlineContentSpec,
  InlineContentSpecs,
} from "./types";
import { mergeCSSClasses } from "../../../../shared/utils";
import { camelToDataKebab } from "../blocks/internal";

// Function that wraps the `dom` element returned from 'blockConfig.render' in a
// `blockContent` div, which contains the block type and props as HTML
// attributes. If `blockConfig.render` also returns a `contentDOM`, it also adds
// an `inlineContent` class to it.
export function addInlineContentAttributes<
  BType extends string,
  PSchema extends PropSchema
>(
  element: HTMLElement,
  inlineContentType: BType,
  inlineContentProps: Props<PSchema>,
  propSchema: PSchema
): HTMLElement {
  // Sets inline content section class
  element.className = mergeCSSClasses(
    "bn-inline-content-section",
    element.className
  );
  // Sets content type attribute
  element.setAttribute("data-inline-content-type", inlineContentType);
  // Adds props as HTML attributes in kebab-case with "data-" prefix. Skips
  // props set to their default values.
  Object.entries(inlineContentProps)
    .filter(([prop, value]) => value !== propSchema[prop].default)
    .map(([prop, value]) => {
      return [camelToDataKebab(prop), value];
    })
    .forEach(([prop, value]) => element.setAttribute(prop, value));

  return element;
}

// This helper function helps to instantiate a InlineContentSpec with a
// config and implementation that conform to the type of Config
export function createInternalInlineContentSpec<T extends InlineContentConfig>(
  config: T,
  implementation: InlineContentImplementation<T>
) {
  return {
    config,
    implementation,
  } satisfies InlineContentSpec<T>;
}

export function createInlineContentSpecFromTipTapNode<
  T extends Node,
  P extends PropSchema
>(node: T, propSchema: P) {
  return createInternalInlineContentSpec(
    {
      type: node.name as T["name"],
      propSchema,
      content: node.config.content === "inline*" ? "styled" : "none",
    },
    {
      node,
    }
  );
}

export function getInlineContentSchemaFromSpecs<T extends InlineContentSpecs>(
  specs: T
) {
  return Object.fromEntries(
    Object.entries(specs).map(([key, value]) => [key, value.config])
  ) as InlineContentSchemaFromSpecs<T>;
}