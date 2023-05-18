import { expect, test } from "../setup/setupScriptComponent";
import { focusOnEditor } from "../utils/editor";
import { executeSlashCommand } from "../utils/slashmenu";
import { copyPasteAllExternal } from "../utils/copypaste";
import EditorWithTextArea from "../utils/components/EditorWithTextArea";

const alertHTML = "<div>Alert</div>";
const buttonHTML = "<div>Alert</div>";
const embedHTML = "<div>Alert</div>";
const imageHTML = "<div>Alert</div>";
const separatorHTML = "<div>Alert</div>";
const tableOfContentsHTML = "<div>Alert</div>";

test.beforeEach(async ({}, testInfo) => {
  testInfo.snapshotSuffix = "";
});

test("Alert Copy/Paste External", async ({ mount, page }) => {
  await mount(<EditorWithTextArea blockTypes={["alert"]} />);

  await focusOnEditor(page);
  await page.keyboard.type("Paragraph 1");
  await executeSlashCommand(page, "alert");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.type("Alert");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.type("Paragraph 2");

  const button = await page.locator(
    `[data-content-type="alert"] > div > div:first-child`
  );
  await button.first().click();

  await expect(await copyPasteAllExternal(page)).toEqual(alertHTML);
});

test("Button Copy/Paste External", async ({ mount, page }) => {
  await mount(<EditorWithTextArea blockTypes={["button"]} />);

  await focusOnEditor(page);
  await page.keyboard.type("Paragraph 1");
  await executeSlashCommand(page, "button");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.type("Paragraph 2");

  await expect(await copyPasteAllExternal(page)).toEqual(buttonHTML);
});

test("Embed Copy/Paste Internal", async ({ mount, page }) => {
  await mount(<EditorWithTextArea blockTypes={["embed"]} />);

  await focusOnEditor(page);
  await page.keyboard.type("Paragraph 1");
  await executeSlashCommand(page, "embed");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.type("Paragraph 2");

  await expect(await copyPasteAllExternal(page)).toEqual(embedHTML);
});

test("Image Copy/Paste Internal", async ({ mount, page }) => {
  await mount(<EditorWithTextArea blockTypes={["image"]} />);

  await focusOnEditor(page);
  await page.keyboard.type("Paragraph 1");
  await executeSlashCommand(page, "image");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.type("Caption");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.type("Paragraph 2");

  await expect(await copyPasteAllExternal(page)).toEqual(imageHTML);
});

test("Separator Copy/Paste Internal", async ({ mount, page }) => {
  await mount(<EditorWithTextArea blockTypes={["separator"]} />);

  await focusOnEditor(page);
  await page.keyboard.type("Paragraph 1");
  await executeSlashCommand(page, "separator");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.type("Paragraph 2");

  const html = await copyPasteAllExternal(page);

  // await page.pause();
  await expect(html).toEqual(separatorHTML);
});

test("Table of Contents Copy/Paste Internal", async ({ mount, page }) => {
  await mount(<EditorWithTextArea blockTypes={["toc"]} />);

  await focusOnEditor(page);
  await executeSlashCommand(page, "h1");
  await page.keyboard.type("Heading 1");
  await executeSlashCommand(page, "toc");
  await page.keyboard.press("ArrowDown");
  await executeSlashCommand(page, "h2");
  await page.keyboard.type("Heading 2");

  await expect(await copyPasteAllExternal(page)).toEqual(tableOfContentsHTML);
});