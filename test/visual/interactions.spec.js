const { test, expect } = require("@playwright/test");
const { preparePage, stabilizeVisuals } = require("./helpers");

test("publications Abs toggle opens and closes", async ({ page }) => {
  await preparePage(page, "light");
  await page.goto("/al-folio/publications/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const absButton = page.getByRole("button", { name: "Abs" }).first();
  await expect(absButton).toBeVisible();

  const panel = page.locator(".abstract.hidden").first();
  await absButton.click();
  await expect(panel).toHaveClass(/open/);

  await absButton.click();
  await expect(panel).not.toHaveClass(/open/);
});

test("publication popover works without bootstrap compat runtime", async ({ page }) => {
  await preparePage(page, "light");
  await page.goto("/al-folio/publications/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const popoverTrigger = page.locator('[data-toggle="popover"]').first();
  test.skip((await popoverTrigger.count()) === 0, "no popover trigger found in fixture data");

  await popoverTrigger.hover();
  await expect(page.locator(".af-popover")).toBeVisible();
});

test("publication venue badges share one width and use Tailwind category colors", async ({ page }) => {
  await preparePage(page, "light");
  await page.goto("/al-folio/publications/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const expectedColorTokens = {
    Next: { background: "oklch(82.8% 0.111 230.318)", text: "oklch(29.3% 0.066 243.157)" },
    AI: { background: "oklch(51.1% 0.096 186.391)", text: "oklch(98.4% 0.014 180.72)" },
    "Real-time": { background: "oklch(80.9% 0.105 251.813)", text: "oklch(28.2% 0.091 267.935)" },
    System: { background: "oklch(48.8% 0.243 264.376)", text: "oklch(97% 0.014 254.604)" },
    Healthcare: { background: "oklch(84.5% 0.143 164.978)", text: "oklch(26.2% 0.051 172.552)" },
    Mobile: { background: "oklch(85.5% 0.138 181.071)", text: "oklch(27.7% 0.046 192.524)" },
    Battery: { background: "oklch(50.8% 0.118 165.612)", text: "oklch(97.9% 0.021 166.113)" },
    Security: { background: "oklch(50% 0.134 242.749)", text: "oklch(97.7% 0.013 236.62)" },
  };

  const badges = await page.locator(".publications .abbr abbr.badge").evaluateAll((elements, colorTokens) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    const toRgb = (color) => {
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = color;
      context.fillRect(0, 0, 1, 1);
      const [red, green, blue] = context.getImageData(0, 0, 1, 1).data;
      return `rgb(${red}, ${green}, ${blue})`;
    };

    return elements.map((element) => {
      const badgeStyle = window.getComputedStyle(element);
      const label = element.querySelector("a, div") ?? element;
      const labelText = element.textContent.trim();
      const expected = colorTokens[labelText];
      return {
        label: labelText,
        width: element.getBoundingClientRect().width,
        backgroundColor: toRgb(badgeStyle.backgroundColor),
        color: toRgb(badgeStyle.color),
        labelColor: toRgb(window.getComputedStyle(label).color),
        expectedBackgroundColor: expected ? toRgb(expected.background) : null,
        expectedTextColor: expected ? toRgb(expected.text) : null,
      };
    });
  }, expectedColorTokens);

  expect(badges.length).toBeGreaterThan(0);
  for (const badge of badges) {
    expect(badge.width).toBeCloseTo(112, 1);
  }

  for (const badge of badges) {
    expect(badge.expectedBackgroundColor, `missing color contract for ${badge.label}`).not.toBeNull();
    expect(badge.backgroundColor).toBe(badge.expectedBackgroundColor);
    expect(badge.color).toBe(badge.expectedTextColor);
    expect(badge.labelColor).toBe(badge.expectedTextColor);
  }
});

test("publication labels and News dates use compact aligned columns", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "desktop columns collapse or auto-size on mobile");
  await preparePage(page, "light");

  await page.goto("/al-folio/publications/", { waitUntil: "networkidle" });
  const publicationColumns = await page.evaluate(() => {
    const row = document.querySelector(".publications .row");
    const label = row?.querySelector(":scope > .abbr");
    const content = row?.querySelector(":scope > [id]");
    if (!row || !label || !content) return null;
    const rowBox = row.getBoundingClientRect();
    return {
      labelWidth: label.getBoundingClientRect().width,
      contentOffset: content.getBoundingClientRect().x - rowBox.x,
    };
  });

  await page.goto("/al-folio/news/", { waitUntil: "networkidle" });
  const newsColumns = await page.evaluate(() => {
    const table = document.querySelector(".news table");
    const date = table?.querySelector(".news-date");
    const content = table?.querySelector(".news-content");
    if (!table || !date || !content) return null;
    const tableBox = table.getBoundingClientRect();
    return {
      labelWidth: date.getBoundingClientRect().width,
      contentOffset: content.getBoundingClientRect().x - tableBox.x,
      datePaddingLeft: Number.parseFloat(window.getComputedStyle(date).paddingLeft),
      contentPaddingLeft: Number.parseFloat(window.getComputedStyle(content).paddingLeft),
    };
  });

  for (const columns of [publicationColumns, newsColumns]) {
    expect(columns).not.toBeNull();
    expect(columns.labelWidth).toBeCloseTo(144, 1);
    expect(columns.contentOffset).toBeCloseTo(144, 1);
  }
  expect(newsColumns.datePaddingLeft).toBe(0);
  expect(newsColumns.contentPaddingLeft).toBe(0);
});

test("site design contract keeps legacy type sizes with the 1024px container", async ({ page }) => {
  await preparePage(page, "light");
  await page.goto("/al-folio/publications/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  const contract = await page.evaluate(() => {
    const stylesFor = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const computed = window.getComputedStyle(element);
      return {
        fontFamily: computed.fontFamily,
        fontSize: Number.parseFloat(computed.fontSize),
        paddingTop: Number.parseFloat(computed.paddingTop),
        paddingRight: Number.parseFloat(computed.paddingRight),
        paddingBottom: Number.parseFloat(computed.paddingBottom),
        paddingLeft: Number.parseFloat(computed.paddingLeft),
        marginTop: Number.parseFloat(computed.marginTop),
        marginBottom: Number.parseFloat(computed.marginBottom),
      };
    };

    const container = document.querySelector(".page-container");
    return {
      maxContentWidth: window.getComputedStyle(document.documentElement).getPropertyValue("--max-content-width").trim(),
      containerWidth: container?.getBoundingClientRect().width ?? null,
      viewportWidth: document.documentElement.clientWidth,
      horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      body: stylesFor("body"),
      pageTitle: stylesFor(".post-title"),
      sectionTitle: stylesFor(".publications h2.bibliography"),
      badge: stylesFor(".publications .abbr .badge"),
      publicationLinks: stylesFor(".publications .links"),
      publicationButton: stylesFor(".publications .links .btn"),
    };
  });

  expect(contract.maxContentWidth).toBe("1024px");
  expect(contract.containerWidth).toBeCloseTo(Math.min(contract.viewportWidth, 1024), 0);
  expect(contract.horizontalOverflow).toBeLessThanOrEqual(0);

  for (const sample of [contract.body, contract.pageTitle, contract.sectionTitle, contract.badge, contract.publicationButton]) {
    expect(sample).not.toBeNull();
    expect(sample.fontFamily).toContain("Noto Sans KR");
  }

  expect(contract.body.fontSize).toBeCloseTo(16, 2);
  expect(contract.pageTitle.fontSize).toBeCloseTo(32, 2);
  expect(contract.sectionTitle.fontSize).toBeCloseTo(28, 2);
  expect(contract.badge.fontSize).toBeCloseTo(12.4, 2);
  expect(contract.publicationButton.fontSize).toBeCloseTo(11.52, 2);

  expect(contract.badge.paddingTop).toBeCloseTo(7, 2);
  expect(contract.badge.paddingBottom).toBeCloseTo(7, 2);
  expect(contract.publicationButton.paddingTop).toBeCloseTo(6, 2);
  expect(contract.publicationButton.paddingBottom).toBeCloseTo(6, 2);
  expect(contract.publicationLinks.marginTop).toBeCloseTo(6, 2);
  expect(contract.publicationLinks.marginBottom).toBeCloseTo(6, 2);

  for (const sample of [contract.badge, contract.publicationButton]) {
    expect(sample.paddingRight).toBeCloseTo(16, 2);
    expect(sample.paddingLeft).toBeCloseTo(16, 2);
  }
  expect(contract.badge.marginBottom).toBeCloseTo(8, 2);
});

test("mobile navbar can expand/collapse", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile-only navigation behavior");

  await preparePage(page, "light");
  await page.goto("/al-folio/", { waitUntil: "networkidle" });

  const toggle = page.locator(".navbar-toggler").first();
  await expect(toggle).toBeVisible();

  const nav = page.locator(".navbar-collapse").first();
  await toggle.click();
  await expect(nav).toHaveClass(/show/);

  await toggle.click();
  await expect(nav).not.toHaveClass(/show/);
});

test("repositories page renders external stat cards with deterministic fixtures", async ({ page }) => {
  await preparePage(page, "light");
  await page.goto("/al-folio/repositories/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const repoImages = page.locator('img[src*="github-readme-stats"], img[src*="github-profile-trophy"]');
  await expect(repoImages.first()).toBeVisible();

  const renderedCount = await repoImages.evaluateAll((images) => images.filter((img) => img.complete && img.naturalWidth > 0).length);
  expect(renderedCount).toBeGreaterThan(0);
});

test("blog pagination uses core Tailwind-native styling contract", async ({ page }) => {
  await preparePage(page, "light");
  await page.goto("/al-folio/blog/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const pagination = page.locator(".af-pagination");
  await expect(pagination.first()).toBeVisible();

  const pageLink = page.locator(".af-page-link").first();
  await expect(pageLink).toBeVisible();

  const styles = await pageLink.evaluate((node) => {
    const computed = window.getComputedStyle(node);
    return {
      borderTopWidth: computed.borderTopWidth,
      backgroundColor: computed.backgroundColor,
      paddingTop: computed.paddingTop,
      paddingLeft: computed.paddingLeft,
    };
  });

  expect(styles.borderTopWidth).not.toBe("0px");
  expect(styles.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  expect(styles.paddingTop).not.toBe("0px");
  expect(styles.paddingLeft).not.toBe("0px");
});

test("navbar menu stays right-aligned on desktop pages", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "desktop-only alignment contract");

  await preparePage(page, "light");
  await page.goto("/al-folio/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const alignment = await page.evaluate(() => {
    const container = document.querySelector("#navbar .container");
    const menu = document.querySelector("#navbarNav .navbar-menu-list");
    if (!container || !menu) {
      return null;
    }
    const containerBox = container.getBoundingClientRect();
    const menuBox = menu.getBoundingClientRect();
    return {
      containerRight: containerBox.right,
      menuRight: menuBox.right,
    };
  });

  expect(alignment).not.toBeNull();
  expect(Math.abs(alignment.menuRight - alignment.containerRight)).toBeLessThanOrEqual(24);
});

test("navbar search button opens modal and toggle buttons use pointer cursor", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "navbar search/theme controls are collapsed under mobile menu");

  await preparePage(page, "light");
  await page.goto("/al-folio/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  await page.evaluate(() => {
    const ninjaKeys = document.querySelector("ninja-keys");
    if (!ninjaKeys || typeof ninjaKeys.open !== "function") {
      return;
    }
    ninjaKeys.__openCalled = false;
    const originalOpen = ninjaKeys.open.bind(ninjaKeys);
    ninjaKeys.open = () => {
      ninjaKeys.__openCalled = true;
      return originalOpen();
    };
  });

  await page.click("#search-toggle");
  const modalOpened = await page.evaluate(() => Boolean(document.querySelector("ninja-keys")?.__openCalled));
  expect(modalOpened).toBeTruthy();

  const searchCursor = await page.locator("#search-toggle").evaluate((el) => window.getComputedStyle(el).cursor);
  const themeCursor = await page.locator("#light-toggle").evaluate((el) => window.getComputedStyle(el).cursor);
  expect(searchCursor).toBe("pointer");
  expect(themeCursor).toBe("pointer");
});

test("related posts are wrapped in a valid list", async ({ page }) => {
  await preparePage(page, "light");
  await page.goto("/al-folio/blog/2023/tables/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const heading = page.getByRole("heading", { name: "Enjoy Reading This Article?" });
  await expect(heading).toBeVisible();

  const relatedList = heading.locator("xpath=following::ul[1]");
  await expect(relatedList).toBeVisible();
  await expect(relatedList.locator("li").first()).toBeVisible();

  const relatedLinkWeight = await relatedList
    .locator("a")
    .first()
    .evaluate((el) => Number.parseInt(window.getComputedStyle(el).fontWeight, 10) || 400);
  expect(relatedLinkWeight).toBeLessThanOrEqual(400);
});

test("inline code uses compact Noto Sans KR typography", async ({ page }) => {
  await preparePage(page, "light");
  await page.goto("/al-folio/blog/2023/sidebar-table-of-contents/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const inlineCodeStyle = await page.evaluate(() => {
    const candidate = Array.from(document.querySelectorAll("main code, [role='main'] code")).find((el) => !el.closest("pre"));
    if (!candidate) {
      return null;
    }
    const computed = window.getComputedStyle(candidate);
    const numericWeight = Number.parseInt(computed.fontWeight, 10);
    return {
      fontFamily: computed.fontFamily,
      fontSize: Number.parseFloat(computed.fontSize),
      fontWeight: Number.isNaN(numericWeight) ? (computed.fontWeight === "bold" ? 700 : 400) : numericWeight,
    };
  });

  expect(inlineCodeStyle).not.toBeNull();
  expect(inlineCodeStyle.fontFamily).toContain("Noto Sans KR");
  expect(inlineCodeStyle.fontSize).toBeLessThan(16);
  expect(inlineCodeStyle.fontWeight).toBeLessThanOrEqual(400);
});

test("project cards hover with upward lift animation", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "hover-specific assertion is desktop-only");

  await preparePage(page, "light");
  await page.goto("/al-folio/projects/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const card = page.locator(".projects .hoverable").first();
  await expect(card).toBeVisible();

  const before = await card.boundingBox();
  await card.hover();
  await page.waitForTimeout(150);
  const after = await card.boundingBox();

  expect(before).not.toBeNull();
  expect(after).not.toBeNull();
  expect(after.y).toBeLessThan(before.y);
});

test("teaching calendar toggle has pointer cursor and toggles calendar visibility", async ({ page }) => {
  await preparePage(page, "light");
  await page.goto("/al-folio/teaching/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const button = page.locator("#calendar-toggle-btn");
  await expect(button).toBeVisible();

  const buttonStyles = await button.evaluate((el) => {
    const computed = window.getComputedStyle(el);
    return { cursor: computed.cursor, fontSize: computed.fontSize };
  });
  expect(buttonStyles.cursor).toBe("pointer");
  expect(Number.parseFloat(buttonStyles.fontSize)).toBeGreaterThan(12);

  await button.click();
  await expect(page.locator("#calendar-container")).toBeVisible();
  await expect(button).toContainText("Hide Calendar");
});

test("toc sidebar renders with tocbot styling and data-toc-text label", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "TOC sidebar is hidden on mobile viewport");

  await preparePage(page, "light");
  await page.goto("/al-folio/blog/2023/sidebar-table-of-contents/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const tocSidebar = page.locator("#toc-sidebar");
  const tocLinks = tocSidebar.locator(".toc-link");
  await expect.poll(async () => tocLinks.count()).toBeGreaterThan(0);
  await expect(tocSidebar.getByText("Customizing")).toHaveCount(1);

  const firstLink = tocLinks.first();
  await firstLink.hover();
  const tocDecor = await firstLink.evaluate((el) => {
    const linkStyle = window.getComputedStyle(el);
    const listBorders = Array.from(document.querySelectorAll("#toc-sidebar .toc-list")).map((list) => window.getComputedStyle(list).borderLeftWidth);
    return {
      linkBorderLeftWidth: linkStyle.borderLeftWidth,
      listBorders,
    };
  });
  expect(tocDecor.linkBorderLeftWidth).toBe("0px");
  expect(tocDecor.listBorders.every((value) => value === "0px")).toBeTruthy();

  await page.getByRole("heading", { name: "Customizing Your Table of Contents" }).scrollIntoViewIfNeeded();
  await expect.poll(async () => tocSidebar.locator(".toc-link.is-active-link").count()).toBeGreaterThan(0);

  const activeDecor = await tocSidebar
    .locator(".toc-link.is-active-link")
    .first()
    .evaluate((el) => {
      const activeStyle = window.getComputedStyle(el);
      const activeMarkerStyle = window.getComputedStyle(el, "::before");
      return {
        activeColor: activeStyle.color,
        markerColor: activeMarkerStyle.backgroundColor,
      };
    });
  expect(activeDecor.markerColor).toBe(activeDecor.activeColor);
});

test("tailwind table engine provides search, pagination, and sorting in pretty tables", async ({ page }) => {
  await preparePage(page, "light");
  await page.goto("/al-folio/blog/2023/tables/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const interactiveTable = page.locator('table[data-search="true"]');
  await expect(interactiveTable).toBeVisible();
  await expect(interactiveTable).toHaveClass(/af-table-enhanced/);

  const searchInput = page.locator(".af-table-search").first();
  await expect(searchInput).toBeVisible();
  await searchInput.fill("Item 19");
  await expect(interactiveTable.locator("tbody tr")).toHaveCount(1);

  await searchInput.fill("");
  const sortableHeader = interactiveTable.locator('thead th[data-field="id"]');
  await sortableHeader.click();
  await sortableHeader.click();
  await expect(interactiveTable.locator("tbody tr").first().locator("td").nth(1)).toHaveText("20");
});

test("lightbox galleries open in-page modal instead of navigating away", async ({ page }) => {
  await preparePage(page, "light");
  await page.goto("/al-folio/blog/2024/photo-gallery/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const firstLightboxLink = page.locator("a[data-lightbox]").first();
  const firstHref = await firstLightboxLink.getAttribute("href");
  await firstLightboxLink.click();

  const overlay = page.locator(".al-lightbox-overlay");
  await expect(overlay).toHaveClass(/is-open/);
  await expect(page.locator(".al-lightbox-image")).toHaveAttribute("src", firstHref);

  const firstImageSrc = await page.locator(".al-lightbox-image").getAttribute("src");
  await page.locator(".al-lightbox-next").click();
  await expect(page.locator(".al-lightbox-image")).not.toHaveAttribute("src", firstImageSrc);

  await page.keyboard.press("Escape");
  await expect(overlay).not.toHaveClass(/is-open/);
});

test("core pages no longer emit jQuery-style runtime errors", async ({ page }) => {
  const failures = [];
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") {
      failures.push(message.text());
    }
  });

  await preparePage(page, "light");
  const pages = ["/al-folio/", "/al-folio/projects/", "/al-folio/blog/2024/photo-gallery/", "/al-folio/blog/2023/tables/"];

  for (const target of pages) {
    await page.goto(target, { waitUntil: "networkidle" });
    await stabilizeVisuals(page);
  }

  const jqueryFailures = failures.filter((message) => /\$\s*is not defined|lightbox/i.test(message));
  expect(jqueryFailures).toEqual([]);
});
