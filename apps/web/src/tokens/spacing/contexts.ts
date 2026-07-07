/**
 * @file tokens/spacing/contexts.ts
 * @description Sellora Spacing System — Context-Specific Semantic Tokens
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * PURPOSE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * This file answers: "How much spacing do I use here?"
 *
 * Instead of every developer deciding independently that a card gets 24px padding,
 * these tokens define the answer ONCE. Every card in Sellora uses the same padding.
 * Every form field has the same gap. Every modal has the same header padding.
 *
 * STRUCTURE:
 * Each context object defines ALL spacing roles for that UI area.
 * Roles are named by their spatial purpose, not their value.
 *
 * WHY THIS APPROACH:
 * When the design team decides "let's make cards more spacious",
 * changing card.paddingDefault from space[24] to space[28] updates
 * EVERY card in the product. Without this, it's a 50-file search-and-replace.
 */

import { space } from './primitives';

// ═══════════════════════════════════════════════════════════════════════════════
// CONTAINER SPACING
// ═══════════════════════════════════════════════════════════════════════════════

export const containerSpacing = {
  /**
   * DESKTOP (≥ 1024px)
   * The horizontal padding applied to the main content area.
   * WHY 32px: Creates a visual margin from the browser edge / sidebar edge.
   * Content at 1440px max-width + 32px padding = 1376px content zone.
   * This keeps text from touching the screen edge on typical 1440px monitors.
   */
  desktop: {
    paddingX:  space[32],   // 32px — horizontal content padding
    paddingY:  space[32],   // 32px — top/bottom content padding
    maxWidth:  '1440px',    // Dashboard content max width
  },

  /**
   * TABLET (768px - 1023px)
   * Reduced to accommodate narrower screens while maintaining readability.
   * WHY 24px: Same as card padding — content edge aligns with card edge.
   */
  tablet: {
    paddingX:  space[24],   // 24px
    paddingY:  space[24],   // 24px
    maxWidth:  '100%',
  },

  /**
   * MOBILE (< 768px)
   * Minimum comfortable padding. 16px is the iOS/Android safe area convention.
   * WHY 16px: Below 16px, content starts feeling cramped and touch targets shrink.
   */
  mobile: {
    paddingX:  space[16],   // 16px
    paddingY:  space[16],   // 16px
    maxWidth:  '100%',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION SPACING
// ═══════════════════════════════════════════════════════════════════════════════

export const sectionSpacing = {
  /**
   * Gap between the page header (H1 + breadcrumb) and the first content section.
   * WHY 24px: Enough to visually separate header from content without wasting space.
   */
  pageHeaderBottom:  space[24],  // 24px

  /**
   * Gap between major page sections (e.g., KPI row → Orders table → Analytics).
   * WHY 32px: Sections need more separation than cards to feel like distinct areas.
   */
  betweenSections:   space[32],  // 32px

  /**
   * Gap between cards within the SAME section (same conceptual group).
   * WHY 16px: Cards in a group are related — tight gap signals "these belong together".
   */
  betweenCards:      space[16],  // 16px (grid gap)

  /**
   * Vertical gap between rows of cards in a grid.
   * WHY same as betweenCards: Uniform grid gap prevents "optical weighting" issues.
   */
  gridRowGap:        space[16],  // 16px

  /**
   * Top padding of the content area (below the top nav).
   * WHY 24px: Creates breathing room between the fixed top nav and first content.
   */
  contentAreaTop:    space[24],  // 24px

  /**
   * Bottom padding of the content area (above viewport edge).
   * WHY 40px: Extra space at bottom prevents content from feeling cut off.
   */
  contentAreaBottom: space[40],  // 40px

  /**
   * Spacing above a section heading (H2) within a page.
   * WHY 48px: H2 needs significant space above it to signal "new major section".
   */
  sectionHeadingTop: space[48],  // 48px

  /**
   * Space between a section heading and its first card/content.
   * WHY 16px: Heading should feel attached to its content, not floating.
   */
  sectionHeadingBottom: space[16], // 16px

} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// CARD SPACING
// ═══════════════════════════════════════════════════════════════════════════════

export const cardSpacing = {
  /**
   * Standard card internal padding (all sides).
   * WHY 24px: The most tested value for card content padding in SaaS UIs.
   * Shopify admin cards use 20-24px. Stripe uses 24px. We match the premium standard.
   */
  paddingDefault:    space[24],  // 24px

  /**
   * Compact card padding — for data-dense contexts.
   * WHY 16px: Dense tables and lists need tighter cards to maximize data visibility.
   */
  paddingCompact:    space[16],  // 16px

  /**
   * Large card padding — for spacious content (empty states, feature cards).
   * WHY 32px: Gives content room to breathe in low-density contexts.
   */
  paddingLarge:      space[32],  // 32px

  /**
   * Gap between the card header (title) and card body content.
   * WHY 16px: Header should be visually connected to content, not separated.
   */
  headerToBody:      space[16],  // 16px

  /**
   * Gap between the card body and card footer (actions, pagination).
   * WHY 16px: Same as header-to-body for visual rhythm.
   */
  bodyToFooter:      space[16],  // 16px

  /**
   * Gap between the card title and its subtitle/description.
   * WHY 4px: Title and subtitle are tightly related — very small gap.
   */
  titleToSubtitle:   space[4],   // 4px

  /**
   * Gap between content items within a card (list items, stat rows).
   * WHY 12px: Related items need less gap than card-to-card.
   */
  itemGap:           space[12],  // 12px

  /**
   * Horizontal padding for full-bleed card content (tables inside cards).
   * WHY 0px: Full-bleed content touches card edges — no additional padding.
   */
  fullBleedPaddingX: space[0],   // 0px

} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD WIDGET SPACING
// ═══════════════════════════════════════════════════════════════════════════════

export const widgetSpacing = {
  /**
   * Internal padding for a KPI metric widget.
   * WHY 20px: Smaller than default card — KPI cards are compact by design.
   */
  paddingKPI:        space[20],  // 20px

  /**
   * Space between the metric value and its label.
   * WHY 4px: They are one visual unit — very tight coupling.
   */
  metricValueToLabel: space[4],  // 4px

  /**
   * Space between the metric label and the trend indicator.
   * WHY 8px: Trend is related but slightly separate — small gap.
   */
  labelToTrend:      space[8],   // 8px

  /**
   * Gap between multiple widgets in the same row.
   * WHY 16px: Same as card gap — widgets are a type of card.
   */
  widgetGap:         space[16],  // 16px

  /**
   * Padding inside chart widgets (between chart and card edge).
   * WHY 16px: Charts need some breathing room from card borders.
   */
  chartPadding:      space[16],  // 16px

  /**
   * Space between chart title and the chart itself.
   * WHY 16px: Title needs clear separation from the chart visualization.
   */
  chartTitleToChart: space[16],  // 16px

  /**
   * Space between the chart and its legend.
   * WHY 12px: Legend is auxiliary — tight but distinct.
   */
  chartToLegend:     space[12],  // 12px

  /**
   * Padding around chart axes (inner margin for labels to appear).
   * WHY 8px: Minimal padding so axis labels don't clip.
   */
  chartAxisPadding:  space[8],   // 8px

} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// SIDEBAR SPACING
// ═══════════════════════════════════════════════════════════════════════════════

export const sidebarSpacing = {
  /**
   * Top padding of the sidebar (below logo/brand area).
   * WHY 8px: Logo area has its own padding — just a small gap before nav.
   */
  paddingTop:        space[8],   // 8px

  /**
   * Horizontal padding inside the sidebar container.
   * WHY 12px: Sidebar is narrow (240px) — padding should be proportionally smaller.
   */
  paddingX:          space[12],  // 12px

  /**
   * Vertical padding of the logo/brand area at the top of the sidebar.
   * WHY 16px: Brand area needs comfortable padding to feel premium.
   */
  brandPaddingY:     space[16],  // 16px

  /**
   * Horizontal padding of the logo/brand area.
   * WHY 16px: Matches the nav item horizontal padding for visual alignment.
   */
  brandPaddingX:     space[16],  // 16px

  /**
   * Internal padding of a nav item (the clickable area).
   * WHY 8px vertical, 12px horizontal: Creates a comfortable 40px-tall hit target.
   * 8 + 8 + 20px icon/text = 36px min height. Close enough to the 40px target.
   */
  navItemPaddingY:   space[8],   // 8px
  navItemPaddingX:   space[12],  // 12px

  /**
   * Gap between the icon and the label within a nav item.
   * WHY 10px: Icon and label are a single visual unit — comfortable but not loose.
   * Note: 10px is non-standard but optimally tested at the 240px sidebar width.
   */
  navItemIconGap:    '10px',     // 10px — exception to 8px grid, tested value

  /**
   * Gap between nav items within a section.
   * WHY 2px: Nav items should flow like a list — minimal separation.
   */
  navItemGap:        space[2],   // 2px

  /**
   * Gap between nav SECTIONS (e.g., "Main" → "Settings").
   * WHY 16px: Sections need visual breathing room between them.
   */
  sectionGap:        space[16],  // 16px

  /**
   * Space above a nav section label ("MAIN", "SETTINGS").
   * WHY 20px: Section labels need to feel like they open a new group.
   */
  sectionLabelTop:   space[20],  // 20px

  /**
   * Space below a nav section label before the first nav item.
   * WHY 4px: Label should feel attached to its items.
   */
  sectionLabelBottom: space[4],  // 4px

  /**
   * Horizontal indentation of nested/child nav items.
   * WHY 28px: Icon (20px) + icon-gap (10px) - some compensation = visual alignment.
   */
  subNavIndent:      space[28],  // 28px

  /**
   * Padding of the sidebar footer (user profile area).
   * WHY 12px: Footer is compact — same as nav item padding.
   */
  footerPadding:     space[12],  // 12px

  /**
   * Gap between user avatar and user info in sidebar footer.
   * WHY 10px: Matches nav item icon gap for visual consistency.
   */
  footerAvatarGap:   '10px',     // 10px

} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// NAVIGATION / TOP NAV SPACING
// ═══════════════════════════════════════════════════════════════════════════════

export const navigationSpacing = {
  /**
   * Top nav height.
   * WHY 56px: 16px top + 16px bottom + 24px content = 56px.
   * This matches the Material Dense App Bar — a well-tested value.
   */
  topNavHeight:      space[56],  // 56px (3.5rem)

  /**
   * Horizontal padding inside the top nav.
   * WHY 24px: Matches content area padding for visual alignment of nav edges.
   */
  topNavPaddingX:    space[24],  // 24px

  /**
   * Vertical padding inside the top nav.
   * WHY 12px: (56 - 32px content) / 2 = 12px each side.
   */
  topNavPaddingY:    space[12],  // 12px (auto-calculated from height)

  /**
   * Gap between top nav items (breadcrumbs, actions).
   * WHY 8px: Nav items are related — tight gap.
   */
  navItemGap:        space[8],   // 8px

  /**
   * Gap between groups of top nav items (left vs right sections).
   * WHY auto: Flex spacing fills available space.
   */
  navGroupGap:       'auto',

  /**
   * Padding inside a breadcrumb item.
   * WHY 4px 8px: Compact, badge-like breadcrumb appearance.
   */
  breadcrumbPaddingY: space[4],  // 4px
  breadcrumbPaddingX: space[8],  // 8px

  /**
   * Gap between breadcrumb items (including separator).
   * WHY 4px: Breadcrumbs form a single path — minimal separation.
   */
  breadcrumbGap:     space[4],   // 4px

  /**
   * Tab/pill navigation item internal padding.
   * WHY 8px 16px: Standard tab target size.
   */
  tabPaddingY:       space[8],   // 8px
  tabPaddingX:       space[16],  // 16px

  /**
   * Gap between tab items.
   * WHY 0px: Tabs share a single underline bar — no gap between them.
   */
  tabGap:            space[0],   // 0px (tabs share border)

} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// TABLE SPACING
// ═══════════════════════════════════════════════════════════════════════════════

export const tableSpacing = {
  /**
   * Table header cell padding (vertical).
   * WHY 10px: Slightly less than body row — header should feel "structural".
   * Note: 10px is a tested exception to the strict 8px grid.
   */
  headerPaddingY:    '10px',     // 10px — tested exception

  /**
   * Table header cell padding (horizontal).
   * WHY 16px: Matches cell horizontal padding for column alignment.
   */
  headerPaddingX:    space[16],  // 16px

  /**
   * Table body row padding (vertical).
   * WHY 12px: Creates a 44-50px row height — comfortable without wasting space.
   * 12 + 12 + 20px text = 44px min row height (Apple's minimum touch target).
   */
  rowPaddingY:       space[12],  // 12px

  /**
   * Table body row padding (horizontal).
   * WHY 16px: Aligns with card padding for edge-to-edge table inside a card.
   */
  rowPaddingX:       space[16],  // 16px

  /**
   * Gap between primary and secondary content in a table cell.
   * WHY 2px: "John Smith" + "john@example.com" are tightly related.
   */
  cellStackGap:      space[2],   // 2px

  /**
   * Gap between elements within a single table cell (icon + text).
   * WHY 8px: Base unit — comfortable inline gap.
   */
  cellInlineGap:     space[8],   // 8px

  /**
   * Padding of the table container itself (for card-embedded tables).
   * WHY 0px: Tables inside cards use the card's padding — no double padding.
   */
  containerPadding:  space[0],   // 0px

  /**
   * Padding of the table footer/pagination area.
   * WHY 16px: Matches card padding — footer lives at card edge.
   */
  footerPaddingY:    space[12],  // 12px
  footerPaddingX:    space[16],  // 16px

  /**
   * Space between pagination controls.
   * WHY 8px: Related controls — base unit spacing.
   */
  paginationGap:     space[8],   // 8px

  /**
   * Space between table toolbar items (search, filter, export).
   * WHY 8px: Related toolbar items — standard gap.
   */
  toolbarItemGap:    space[8],   // 8px

  /**
   * Vertical padding of the table toolbar area.
   * WHY 12px: Matches table footer padding for visual symmetry.
   */
  toolbarPaddingY:   space[12],  // 12px
  toolbarPaddingX:   space[16],  // 16px (matches row X padding)

} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// FORM SPACING
// ═══════════════════════════════════════════════════════════════════════════════

export const formSpacing = {
  /**
   * Vertical gap between form fields.
   * WHY 20px: Fields need clear separation to feel like distinct questions.
   * 16px is too tight (fields feel merged). 24px wastes space in longer forms.
   */
  fieldGapY:         space[20],  // 20px

  /**
   * Gap between two fields side-by-side (grid columns in form).
   * WHY 16px: Same as card item gap — columns in a form row.
   */
  fieldGapX:         space[16],  // 16px

  /**
   * Space between the form field label and the input.
   * WHY 6px: Label must feel attached to the input — not floating above.
   */
  labelToInput:      space[6],   // 6px

  /**
   * Space between the input and the helper text below it.
   * WHY 6px: Helper text is attached to the field, not the next field.
   */
  inputToHelper:     space[6],   // 6px

  /**
   * Space between a form section header (H4) and the first field.
   * WHY 16px: Section header should feel like it introduces its fields.
   */
  sectionHeaderToField: space[16], // 16px

  /**
   * Gap between form sections (e.g., "Shipping" → "Billing").
   * WHY 32px: Sections are clearly separate areas — significant space.
   */
  betweenSections:   space[32],  // 32px

  /**
   * Padding inside a form section (if inside a card or panel).
   * WHY 24px: Matches standard card padding.
   */
  sectionPadding:    space[24],  // 24px

  /**
   * Space between form actions (Submit, Cancel buttons).
   * WHY 8px: Buttons are alternatives — tight grouping signals they're related.
   */
  actionButtonGap:   space[8],   // 8px

  /**
   * Gap between the last form field and the action buttons.
   * WHY 24px: Clear visual break before submission actions.
   */
  fieldToActions:    space[24],  // 24px

  /**
   * Padding inside a checkbox/radio item.
   * WHY 8px: Comfortable clickable area around the control.
   */
  checkboxPadding:   space[8],   // 8px

  /**
   * Gap between checkbox/radio and its label.
   * WHY 8px: Standard inline gap — control and label are one unit.
   */
  checkboxLabelGap:  space[8],   // 8px

  /**
   * Gap between multiple checkbox/radio items in a group.
   * WHY 8px: Items in a group are related choices — tight grouping.
   */
  radioGroupGap:     space[8],   // 8px

} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// MODAL SPACING
// ═══════════════════════════════════════════════════════════════════════════════

export const modalSpacing = {
  /**
   * Modal header padding (contains title + close button).
   * WHY 24px: Modal header needs clear internal breathing room.
   */
  headerPaddingX:    space[24],  // 24px
  headerPaddingY:    space[20],  // 20px

  /**
   * Modal body padding.
   * WHY 24px: Same as header for visual consistency.
   */
  bodyPaddingX:      space[24],  // 24px
  bodyPaddingY:      space[20],  // 20px

  /**
   * Modal footer padding (action buttons area).
   * WHY matches header: Footer and header are the "frame" — they should match.
   */
  footerPaddingX:    space[24],  // 24px
  footerPaddingY:    space[16],  // 16px (slightly tighter — button area)

  /**
   * Space between the modal header bottom and body top.
   * WHY 0px: A divider line (border) provides the separation — no extra gap.
   */
  headerToBody:      space[0],   // 0px (border divides them)

  /**
   * Gap between modal body content items.
   * WHY 16px: Standard content gap within a contained surface.
   */
  bodyItemGap:       space[16],  // 16px

  /**
   * Gap between action buttons in modal footer.
   * WHY 8px: Matches form action gap.
   */
  footerButtonGap:   space[8],   // 8px

  /**
   * Minimum vertical margin from viewport edge to modal edge.
   * WHY 32px: Modal should never touch the screen edge — feels contained.
   */
  viewportMargin:    space[32],  // 32px

  /**
   * Standard modal widths.
   * Named by their use case, not arbitrary size labels.
   */
  widths: {
    compact:   '400px',   // Confirmation dialogs, simple prompts
    default:   '560px',   // Standard modals — most common
    wide:      '720px',   // Complex forms, content-heavy modals
    extraWide: '900px',   // Fullscreen-ish on desktop (settings, editors)
  },

} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// DIALOG SPACING (confirmation, alert dialogs)
// ═══════════════════════════════════════════════════════════════════════════════

export const dialogSpacing = {
  /**
   * Dialogs are smaller than modals — confirmation prompts.
   * WHY smaller padding: Dialogs have less content — proportionally smaller padding.
   */
  paddingX:          space[24],  // 24px
  paddingY:          space[24],  // 24px

  /**
   * Space between dialog icon and title.
   * WHY 12px: Icon contextualizes the title — medium coupling.
   */
  iconToTitle:       space[12],  // 12px

  /**
   * Space between dialog title and description.
   * WHY 8px: Title and description are one logical unit.
   */
  titleToDescription: space[8], // 8px

  /**
   * Space between dialog description and action buttons.
   * WHY 24px: Clear visual separation before the action zone.
   */
  descriptionToActions: space[24], // 24px

  /**
   * Gap between action buttons.
   * WHY 8px: Matches all button gap conventions.
   */
  actionGap:         space[8],   // 8px

  /**
   * Dialog maximum width.
   * WHY 400px: Confirmation dialogs are focused — no need for more width.
   */
  maxWidth:          '400px',

} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// DROPDOWN SPACING
// ═══════════════════════════════════════════════════════════════════════════════

export const dropdownSpacing = {
  /**
   * Internal padding of the dropdown container.
   * WHY 4px: Tight padding — the items themselves carry the padding.
   */
  containerPaddingY: space[4],   // 4px

  /**
   * Padding of each dropdown option item.
   * WHY 8px 12px: Creates a ~36px hit target — comfortable for mouse and touch.
   */
  itemPaddingY:      space[8],   // 8px
  itemPaddingX:      space[12],  // 12px

  /**
   * Gap between icon and label within a dropdown item.
   * WHY 8px: Standard inline element gap.
   */
  itemIconGap:       space[8],   // 8px

  /**
   * Gap between the trigger element and the dropdown panel.
   * WHY 4px: Dropdown should appear close to its trigger — contextual connection.
   */
  triggerOffset:     space[4],   // 4px

  /**
   * Gap between dropdown sections (if grouped items).
   * WHY 4px: Section padding provides the visual separation.
   */
  sectionGap:        space[4],   // 4px

  /**
   * Padding above/below dropdown section labels.
   * WHY 6px 12px: Section labels need breathing room within the dropdown.
   */
  sectionLabelPaddingY: space[6],  // 6px
  sectionLabelPaddingX: space[12], // 12px

  /**
   * Min/max width of dropdowns.
   * WHY 160px min: Anything narrower clips typical option labels.
   */
  minWidth:          '160px',
  maxWidth:          '320px',

  /**
   * Maximum height before scrolling.
   * WHY 320px: Shows ~8 items at 40px each — enough context without overwhelming.
   */
  maxHeight:         '320px',

} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// BUTTON SPACING
// ═══════════════════════════════════════════════════════════════════════════════

export const buttonSpacing = {
  /**
   * LARGE BUTTON
   * Height: 44px (12+12+20px content)
   * WHY 44px: Apple's minimum touch target recommendation.
   * Used for: Primary CTAs on empty states, form submission in modals.
   */
  large: {
    paddingY:  space[12],  // 12px
    paddingX:  space[20],  // 20px
    height:    '44px',
    iconGap:   space[8],   // 8px
    iconSize:  '18px',
  },

  /**
   * DEFAULT BUTTON
   * Height: 36px (8+8+20px content)
   * WHY 36px: The most common button height in SaaS dashboards (Stripe, Linear).
   * Balances visual weight with screen density.
   */
  default: {
    paddingY:  space[8],   // 8px
    paddingX:  space[16],  // 16px
    height:    '36px',
    iconGap:   space[8],   // 8px
    iconSize:  '16px',
  },

  /**
   * SMALL BUTTON
   * Height: 28px (4+4+20px content)
   * WHY 28px: For compact contexts — table row actions, filter chips, tag actions.
   */
  small: {
    paddingY:  space[4],   // 4px
    paddingX:  space[12],  // 12px
    height:    '28px',
    iconGap:   space[6],   // 6px
    iconSize:  '14px',
  },

  /**
   * ICON-ONLY BUTTON (square)
   * Size: 36px (same height as default)
   */
  iconOnly: {
    padding:   space[8],   // 8px all sides
    size:      '36px',
    iconSize:  '20px',
  },

  /**
   * ICON-ONLY SMALL
   */
  iconOnlySmall: {
    padding:   space[6],   // 6px all sides
    size:      '28px',
    iconSize:  '16px',
  },

} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// INPUT SPACING
// ═══════════════════════════════════════════════════════════════════════════════

export const inputSpacing = {
  /**
   * DEFAULT INPUT
   * Height: 36px (8+8+20px content) — matches default button height.
   * WHY same as button: Inputs and buttons sit next to each other in forms.
   * Matching heights creates visual alignment without extra effort.
   */
  default: {
    paddingY:      space[8],   // 8px
    paddingX:      space[12],  // 12px
    height:        '36px',
    prefixGap:     space[8],   // 8px — gap between prefix icon and text
    suffixGap:     space[8],   // 8px — gap between text and suffix icon
  },

  /**
   * LARGE INPUT
   * Height: 44px — for prominent single-field forms (search, hero input).
   */
  large: {
    paddingY:      space[12],  // 12px
    paddingX:      space[16],  // 16px
    height:        '44px',
    prefixGap:     '10px',     // ~10px — tested exception to 8px grid
    suffixGap:     '10px',
  },

  /**
   * SMALL INPUT
   * Height: 28px — for compact contexts (inline table editing, filter bars).
   */
  small: {
    paddingY:      space[4],   // 4px
    paddingX:      space[8],   // 8px
    height:        '28px',
    prefixGap:     space[6],   // 6px
    suffixGap:     space[6],
  },

  /**
   * TEXTAREA
   * Minimum height and default padding.
   * WHY no fixed height: Textareas resize — we define min, not max.
   */
  textarea: {
    paddingY:      space[8],   // 8px
    paddingX:      space[12],  // 12px
    minHeight:     '80px',     // ~3 visible lines
  },

} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// ICON SPACING
// ═══════════════════════════════════════════════════════════════════════════════

export const iconSpacing = {
  /**
   * Gap between an icon and adjacent text.
   * WHY 8px: The standard inline gap. Icon and text form a visual unit.
   * Used everywhere: buttons, nav items, badges, status indicators.
   */
  iconToText:    space[8],   // 8px

  /**
   * Tight icon-to-text gap for compact contexts.
   * WHY 6px: Used in badges, chips, and tags where 8px is too loose.
   */
  iconToTextTight: space[6], // 6px

  /**
   * Gap between two icons (side by side).
   * WHY 8px: Icons as peers — base unit spacing.
   */
  iconToIcon:    space[8],   // 8px

  /**
   * Padding around an icon-only touch target.
   * WHY 8px: Adds 16px to each icon dimension — 20px icon becomes 36px target.
   */
  touchPadding:  space[8],   // 8px

  /**
   * Padding inside an icon button container.
   * WHY different from touch: Icon button has visual background — padding is visual.
   */
  buttonPadding: space[8],   // 8px

} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// AVATAR SPACING
// ═══════════════════════════════════════════════════════════════════════════════

export const avatarSpacing = {
  /**
   * Gap between avatar and adjacent text (name, email).
   * WHY 10px: Avatar and name form a tight unit — between 8 and 12.
   * 10px is a tested exception to the strict 8px grid for this specific case.
   */
  avatarToText:  '10px',     // 10px — exception

  /**
   * Gap between stacked avatars (avatar groups).
   * WHY negative: Stacked avatars overlap — negative margin creates the effect.
   */
  stackOffset:   '-8px',     // -8px (25% overlap at 32px avatar)

  /**
   * Space between an avatar group and accompanying text.
   * WHY 12px: Avatar group is a compact visual — text has slight breathing room.
   */
  groupToText:   space[12],  // 12px

} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// CHART SPACING
// ═══════════════════════════════════════════════════════════════════════════════

export const chartSpacing = {
  /**
   * Padding inside the chart container (around the chart visualization).
   * WHY 16px: Axes and labels need room from card edges.
   */
  containerPadding:  space[16],  // 16px

  /**
   * Top padding specifically — more space for chart title / tooltip.
   * WHY 24px: Charts with dynamic tooltips need more vertical clearance at top.
   */
  containerPaddingTop: space[24], // 24px

  /**
   * Gap between chart title and the chart.
   * WHY 16px: Standard heading-to-content gap.
   */
  titleToChart:      space[16],  // 16px

  /**
   * Gap between chart and its legend.
   * WHY 16px: Legend is contextual — clear separation from the chart.
   */
  chartToLegend:     space[16],  // 16px

  /**
   * Gap between legend items.
   * WHY 16px: Legend items need space to be individually scannable.
   */
  legendItemGap:     space[16],  // 16px

  /**
   * Gap between the legend color swatch and its label.
   * WHY 6px: Swatch and label are one unit — tight coupling.
   */
  legendSwatchGap:   space[6],   // 6px

  /**
   * Padding inside chart tooltip.
   * WHY 12px: Tooltip is a small floating element — compact padding.
   */
  tooltipPaddingY:   space[8],   // 8px
  tooltipPaddingX:   space[12],  // 12px

  /**
   * Gap between tooltip items (label + value pairs).
   * WHY 4px: Items in a tooltip are tightly related data points.
   */
  tooltipItemGap:    space[4],   // 4px

  /**
   * Chart minimum height.
   * WHY 200px: Below 200px, most chart types lose legibility.
   */
  minHeight:         '200px',

  /**
   * Chart default height for dashboard widgets.
   * WHY 240px: Fits the typical 3-column dashboard card layout.
   */
  defaultHeight:     '240px',

} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// MASTER EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export const spacingContexts = {
  container:   containerSpacing,
  section:     sectionSpacing,
  card:        cardSpacing,
  widget:      widgetSpacing,
  sidebar:     sidebarSpacing,
  navigation:  navigationSpacing,
  table:       tableSpacing,
  form:        formSpacing,
  modal:       modalSpacing,
  dialog:      dialogSpacing,
  dropdown:    dropdownSpacing,
  button:      buttonSpacing,
  input:       inputSpacing,
  icon:        iconSpacing,
  avatar:      avatarSpacing,
  chart:       chartSpacing,
} as const;

export type SpacingContexts = typeof spacingContexts;
export type SpacingContextKey = keyof SpacingContexts;