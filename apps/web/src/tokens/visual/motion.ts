
/**
 * @file tokens/visual/motion.ts
 * @description Sellora Visual Foundation — Motion & Animation System
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * MOTION PHILOSOPHY
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * CORE PRINCIPLE: Motion in Sellora has PURPOSE, not decoration.
 *
 * Every animation must answer YES to at least one of these questions:
 * 1. Does it clarify what just happened? (feedback)
 * 2. Does it show where something came from/went? (spatial orientation)
 * 3. Does it confirm an interaction registered? (acknowledgment)
 * 4. Does it preview what will happen? (affordance)
 *
 * If the answer to all four is NO — remove the animation.
 *
 * INSPIRATION:
 * - Linear's animations: surgical and fast. Nothing lingers.
 * - Stripe's animations: confident. Dropdowns appear at the right speed.
 * - Vercel's animations: purposeful. Content fades in with intent.
 *
 * DURATION PHILOSOPHY:
 * "Animations should be fast. So fast you almost think there is none."
 *
 * Durations in web interfaces are COUNTERINTUITIVELY shorter than you think:
 * - 100ms feels instant (but provides visual confirmation)
 * - 200ms feels "snappy" (the sweet spot for most interactions)
 * - 300ms is "slow" (use only for large surface entries)
 * - 400ms+ is "cinematic" (only for deliberate moments)
 *
 * EASING PHILOSOPHY:
 * Physical objects don't move at constant speed.
 * They ACCELERATE from rest and DECELERATE before stopping.
 * Our easing functions mimic this physics.
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */
 
// ─── DURATION TOKENS ─────────────────────────────────────────────────────────
 
export const duration = {
 
  /**
   * INSTANT — 0ms
   *
   * Use for:
   * - State changes that should feel "immediate" (toggle on/off with no animation)
   * - Accessibility: respects prefers-reduced-motion (all animations → instant)
   * - JavaScript-triggered shows/hides that should have no perceptible delay
   *
   * WHY IT EXISTS: Explicit zero prevents accidentally inheriting a parent duration.
   */
  instant: '0ms',
 
  /**
   * FAST — 100ms
   *
   * Use for:
   * - Hover state color changes (button, link, nav item)
   * - Focus ring appearance
   * - Checkbox check/uncheck
   * - Radio button selection
   * - Toggle switch (the color part, not the thumb movement)
   * - Tooltip appearance (when already near the trigger)
   * - Active/pressed state feedback
   *
   * WHY 100ms: Human reaction time is ~200ms. Animations under 100ms are
   * perceived as "instant" with visual confirmation. Below 100ms, users
   * don't register the change happened.
   *
   * RULE: All STATE changes that don't involve movement use fast duration.
   */
  fast: '100ms',
 
  /**
   * DEFAULT — 150ms
   *
   * Use for:
   * - Dropdown opening/closing
   * - Select menu open
   * - Popover appear/disappear
   * - Tab indicator movement
   * - Alert/toast entrance
   * - Badge count update
   * - Form validation feedback (border color change + message appear)
   *
   * WHY 150ms: The "default" animation speed in Sellora.
   * Fast enough to feel snappy, long enough to be clearly visible.
   * This is the linear/stripe "snap" feel.
   */
  default: '150ms',
 
  /**
   * NORMAL — 200ms
   *
   * Use for:
   * - Accordion open/close
   * - Sidebar expand/collapse (width change)
   * - Card hover elevation (shadow and transform)
   * - Table row expand (row details panel)
   * - Skeleton to content transition
   * - Spinner completion to content
   * - Page section reveals (scroll-triggered)
   *
   * WHY 200ms: For elements that MOVE (not just appear), 200ms provides
   * enough time to track the movement while still feeling fast.
   */
  normal: '200ms',
 
  /**
   * SLOW — 300ms
   *
   * Use for:
   * - Modal dialog entrance (slides + fades in)
   * - Drawer/side panel slide-in
   * - Command palette appear
   * - Full-page route transitions (content fade)
   * - Progress bar fill animation
   * - Chart line draw animation
   *
   * WHY 300ms: Large surface entries. The eye needs time to track a large
   * element appearing. Under 200ms, large elements "pop" in jarring ways.
   */
  slow: '300ms',
 
  /**
   * VERY SLOW — 400ms
   *
   * Use for:
   * - Onboarding step transitions
   * - Success/completion animations (order placed ✓)
   * - Chart initial render animation (data lines drawing)
   * - Loading skeleton to content (graceful reveal)
   * - "Welcome" splash screens
   *
   * WHY 400ms: These are DELIBERATE MOMENTS that deserve slightly more time.
   * Users are meant to notice these transitions — they communicate something
   * important happened.
   */
  verySlow: '400ms',
 
  /**
   * EXTRA SLOW — 600ms
   *
   * Use for:
   * - Confetti/celebration animations
   * - Complex SVG animations (map paths, route visualizations)
   * - Long-running operation completion animations
   *
   * RARELY USED. If you're reaching for 600ms+ for a UI element,
   * question whether the animation is justified.
   */
  extraSlow: '600ms',
 
} as const;
 
// ─── EASING CURVES ───────────────────────────────────────────────────────────
 
export const easing = {
 
  /**
   * LINEAR — constant speed
   *
   * Use for:
   * - Progress bar fill (progress should feel metered, not physical)
   * - Loading spinner rotation
   * - Opacity transitions (perceived as linear)
   * - Timed sequences
   *
   * WHY NOT for movement: Linear movement looks mechanical and unnatural.
   * Objects in the physical world don't move at constant speed.
   */
  linear: 'linear',
 
  /**
   * EASE-OUT — starts fast, decelerates to rest ← MOST USED
   *
   * Use for:
   * - Elements ENTERING the screen (appearing, expanding, sliding in)
   * - Dropdown opening, modal appearing, drawer sliding in
   * - Content loading in (skeleton → content)
   * - Toast notifications appearing
   * - Any element the user wants to see arrive
   *
   * WHY: Objects decelerate when arriving. A ball rolling onto the screen
   * slows as it reaches its final position. This creates a sense of the
   * element "landing" rather than teleporting.
   *
   * The "standard" curve — if unsure which to use, use this one.
   */
  out: 'cubic-bezier(0, 0, 0.2, 1)',
 
  /**
   * EASE-IN — starts slow, accelerates to exit
   *
   * Use for:
   * - Elements LEAVING the screen (disappearing, collapsing, sliding out)
   * - Modal dismissing, dropdown closing, drawer sliding away
   * - Dismissing toasts
   * - Any element that is being removed
   *
   * WHY: Objects accelerate when leaving. A ball rolling off screen picks up
   * speed as it exits. Using ease-in for exits makes them feel natural.
   *
   * NEVER use ease-in for entering elements — they'll feel like they
   * "crawl in" and then suddenly stop.
   */
  in: 'cubic-bezier(0.4, 0, 1, 1)',
 
  /**
   * EASE-IN-OUT — slow start, fast middle, slow end
   *
   * Use for:
   * - Elements MOVING WITHIN the screen (position changes, reordering)
   * - Sidebar expanding/collapsing (stays in viewport)
   * - Tab indicator sliding between tabs
   * - Accordion opening (height change)
   * - Slider thumb movement
   * - Drag-and-drop repositioning
   *
   * WHY: For elements that travel visible paths within the viewport,
   * both the start and end of movement should feel deliberate.
   * The acceleration in the middle maintains momentum.
   */
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
 
  /**
   * SPRING — ease-out with slight overshoot
   *
   * Use for:
   * - Success confirmation moments (checkmark appearing ✓)
   * - "Like" or positive reaction animations
   * - Badge count updates
   * - Completion celebrations
   *
   * WHY: A slight overshoot (going past the final position, then settling)
   * makes animations feel alive. It's used very sparingly in Sellora —
   * only for positive feedback moments that deserve to feel "joyful".
   *
   * Never use for serious/functional animations (error states, navigation).
   */
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
 
  /**
   * SHARP — quick acceleration and deceleration
   *
   * Use for:
   * - Elements that need to feel "snappy" and precise
   * - Command palette results appearing (fast list)
   * - Filter/sort results updating
   * - Search results appearing
   *
   * Feels more mechanical than spring — appropriate for data-driven responses.
   */
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
 
} as const;
 
// ─── TRANSITION PRESETS ───────────────────────────────────────────────────────
/**
 * Complete CSS transition definitions for common use cases.
 * Use these instead of writing custom transitions.
 *
 * PROPERTIES INCLUDED:
 * We only transition properties that:
 * 1. Are cheap to animate (GPU-accelerated: transform, opacity)
 * 2. Are genuinely useful to animate (color, background-color for state feedback)
 *
 * NEVER animate: width, height, padding, margin (causes layout recalculation)
 * ALWAYS prefer: transform: scaleX/scaleY for size changes
 */
 
export const transition = {
 
  /**
   * HOVER — For interactive element state changes on hover.
   * Color and background changes only (cheap GPU operations).
   */
  hover: `color ${duration.fast} ${easing.out},
    background-color ${duration.fast} ${easing.out},
    border-color ${duration.fast} ${easing.out},
    box-shadow ${duration.fast} ${easing.out}`,
 
  /**
   * ACTIVE — For button press/active state.
   * Faster than hover (should feel instant).
   */
  active: `background-color ${duration.fast} ${easing.sharp},
    box-shadow ${duration.fast} ${easing.sharp},
    transform ${duration.fast} ${easing.sharp}`,
 
  /**
   * FOCUS — For focus ring appearance.
   * Near-instant but smooth enough not to flash.
   */
  focus: `box-shadow ${duration.fast} ${easing.out},
    border-color ${duration.fast} ${easing.out}`,
 
  /**
   * CARD HOVER — Card elevation change on hover (lift effect).
   */
  cardHover: `box-shadow ${duration.normal} ${easing.out},
    transform ${duration.normal} ${easing.out}`,
 
  /**
   * DROPDOWN — Dropdown menu enter/exit animation.
   */
  dropdown: {
    enter: `opacity ${duration.default} ${easing.out},
      transform ${duration.default} ${easing.out}`,
    exit: `opacity ${duration.default} ${easing.in},
      transform ${duration.default} ${easing.in}`,
  },
 
  /**
   * MODAL — Modal dialog enter/exit.
   */
  modal: {
    backdrop: {
      enter: `opacity ${duration.slow} ${easing.out}`,
      exit:  `opacity ${duration.slow} ${easing.in}`,
    },
    content: {
      enter: `opacity ${duration.slow} ${easing.out},
        transform ${duration.slow} ${easing.out}`,
      exit: `opacity ${duration.default} ${easing.in},
        transform ${duration.default} ${easing.in}`,
    },
  },
 
  /**
   * DRAWER — Side panel slide-in/out.
   */
  drawer: {
    enter: `transform ${duration.slow} ${easing.out}`,
    exit:  `transform ${duration.slow} ${easing.in}`,
  },
 
  /**
   * SIDEBAR — Sidebar expand/collapse width transition.
   */
  sidebar: `width ${duration.normal} ${easing.inOut},
    transform ${duration.normal} ${easing.inOut}`,
 
  /**
   * PAGE — Route/page transition (content swap).
   */
  page: {
    exit:  `opacity ${duration.default} ${easing.in}`,
    enter: `opacity ${duration.slow} ${easing.out}`,
  },
 
  /**
   * TOAST — Toast notification entrance.
   */
  toast: {
    enter: `opacity ${duration.default} ${easing.out},
      transform ${duration.default} ${easing.out}`,
    exit:  `opacity ${duration.fast} ${easing.in},
      transform ${duration.fast} ${easing.in}`,
  },
 
  /**
   * ACCORDION — Height-based expand/collapse.
   * Note: We use max-height trick for height transitions (height: auto → animated).
   */
  accordion: `max-height ${duration.normal} ${easing.inOut},
    opacity ${duration.normal} ${easing.inOut}`,
 
  /**
   * TAB INDICATOR — Sliding underline/indicator between tabs.
   */
  tabIndicator: `transform ${duration.default} ${easing.inOut},
    width ${duration.default} ${easing.inOut}`,
 
  /**
   * SKELETON → CONTENT — Loading placeholder to real content.
   */
  skeleton: `opacity ${duration.verySlow} ${easing.out}`,
 
  /**
   * COLOR ONLY — Simple color change (cheapest transition).
   */
  color: `color ${duration.fast} ${easing.out},
    background-color ${duration.fast} ${easing.out}`,
 
  /**
   * ALL — Catch-all for when multiple properties transition.
   * Use sparingly — explicit property lists are preferred for performance.
   */
  all: `all ${duration.normal} ${easing.out}`,
 
} as const;
 
// ─── ANIMATION KEYFRAMES (CSS) ───────────────────────────────────────────────
/**
 * Named animation keyframe definitions.
 * These are referenced by name in CSS @keyframes and Tailwind animate-*.
 */
 
export const keyframes = {
 
  /** fade-in: Opacity 0 → 1 */
  fadeIn: {
    from: { opacity: '0' },
    to:   { opacity: '1' },
  },
 
  /** fade-out: Opacity 1 → 0 */
  fadeOut: {
    from: { opacity: '1' },
    to:   { opacity: '0' },
  },
 
  /** slide-in-from-bottom: Modal entrance */
  slideInFromBottom: {
    from: { opacity: '0', transform: 'translateY(8px)' },
    to:   { opacity: '1', transform: 'translateY(0)' },
  },
 
  /** slide-in-from-top: Toast entrance from top */
  slideInFromTop: {
    from: { opacity: '0', transform: 'translateY(-8px)' },
    to:   { opacity: '1', transform: 'translateY(0)' },
  },
 
  /** slide-in-from-right: Drawer entrance from right */
  slideInFromRight: {
    from: { opacity: '0', transform: 'translateX(100%)' },
    to:   { opacity: '1', transform: 'translateX(0)' },
  },
 
  /** slide-in-from-left: Sidebar entrance */
  slideInFromLeft: {
    from: { opacity: '0', transform: 'translateX(-100%)' },
    to:   { opacity: '1', transform: 'translateX(0)' },
  },
 
  /** scale-in: Dropdown/popover entrance */
  scaleIn: {
    from: { opacity: '0', transform: 'scale(0.96)' },
    to:   { opacity: '1', transform: 'scale(1)' },
  },
 
  /** scale-out: Dropdown/popover exit */
  scaleOut: {
    from: { opacity: '1', transform: 'scale(1)' },
    to:   { opacity: '0', transform: 'scale(0.96)' },
  },
 
  /** pulse: Skeleton loading animation */
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%':      { opacity: '0.5' },
  },
 
  /** spin: Loading spinner */
  spin: {
    from: { transform: 'rotate(0deg)' },
    to:   { transform: 'rotate(360deg)' },
  },
 
  /** ping: Notification pulse dot */
  ping: {
    '75%, 100%': { transform: 'scale(2)', opacity: '0' },
  },
 
  /** bounce: Success checkmark spring */
  bounceIn: {
    '0%':   { transform: 'scale(0)',    opacity: '0' },
    '60%':  { transform: 'scale(1.1)', opacity: '1' },
    '80%':  { transform: 'scale(0.95)' },
    '100%': { transform: 'scale(1)' },
  },
 
  /** shake: Error state feedback */
  shake: {
    '0%, 100%': { transform: 'translateX(0)' },
    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
    '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
  },
 
} as const;
 
// ─── PREFERS-REDUCED-MOTION ───────────────────────────────────────────────────
 
export const reducedMotion = {
  /**
   * ACCESSIBILITY: Honor the user's motion preference.
   *
   * The prefers-reduced-motion media query detects users who have requested
   * minimal animation (vestibular disorders, epilepsy, ADHD, personal preference).
   *
   * WCAG 2.3.3 (AAA): Animation from interactions can be disabled.
   *
   * SELLORA RULE:
   * All CSS animations and transitions MUST be wrapped in a
   * @media (prefers-reduced-motion: no-preference) query,
   * OR have their duration set to 0ms in a @media (prefers-reduced-motion: reduce) query.
   *
   * Critical: Skip animations, never just slow them down.
   * Slowing down doesn't help vestibular disorder sufferers — removing does.
   */
  cssRule: `
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  `,
} as const;
 
export type Duration = typeof duration;
export type Easing = typeof easing;
export type Transition = typeof transition;
export type Keyframes = typeof keyframes;
 