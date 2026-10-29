# NOIR Cinema

Static personal cinema built around the supplied smoky grey glass reference. Serve `dist/` over HTTP. No build step or API key is required.

## Features

- Responsive homepage, curated feature carousel, movie details and official YouTube trailers.
- Bundled Cinemeta movie metadata, live Cinemeta search and TV catalogue.
- Local watchlist and recent titles, with resume from supported Stellar playback events.
- Documented EmbedWave and Stellar iframe integrations, source switching, reload and external-player link.
- TV season and episode controls. Only provider-supported titles play; metadata catalogue does not imply stream availability.

## Validation

- `node --check dist/app.js` passed.
- Browser checks: homepage and details; adding to watchlist; Batman live search; TV catalogue returning 50 series; rendered phone-width layout.
- EmbedWave returned an unable-to-play result for Interstellar. Stellar rendered its Interstellar play screen, but playback did not start in the QA browser even when tested independently. Full-movie playback is not verified.
- Pinterest detail reference could not be retrieved; details follow the supplied homepage screenshot's visual style.

## Providers

Embeds are third-party services and may fail, introduce ads, or change behavior. Do not promise availability or ad-free operation. NOIR does not host, extract, decrypt or proxy media. Use authorized content. Watchlists and recent titles persist per browser, not across accounts or devices.

## Liquid-glass and sources update

- The user-supplied MIT `liquid-glass.js` is vendored with its license. SVG refraction is applied to bounded surfaces with ResizeObserver lifecycle cleanup, with the module's native fallback on unsupported browsers.
- ScreenScape, YapGrid and Braflix were added; original EmbedWave and Stellar options remain. ScreenScape is the default for new browser sessions; the previous source selection is preserved when valid.
- All movie frames use `sandbox="allow-scripts allow-same-origin allow-presentation"`; popup, top-navigation, forms and sandbox-escape permissions are absent. This restricts new windows and page navigation, not adverts or navigation within the provider frame.
- Stellar refuses sandboxed embeds. Its option remains with a clear explanation rather than silently disabling the user's redirect protection. VidLink, VidFast and VidSrc were tested and omitted because they also refuse sandboxed embeds.
- ScreenScape successfully played Interstellar beyond the opening studio sequence in the QA browser. Other providers remain dependent on title availability. YapGrid rendered an advertising link; Braflix returned unavailable for the test film. No provider is represented as universally ad-free or guaranteed fastest.
- Browser test fixture confirmed that `window.open()` returned null and top-navigation threw while the restricted frame remained embedded. The test fixture was removed before deployment.
- Desktop and 390px-wide layouts and source switching were inspected. `node tests/providers.test.cjs` verifies movie and TV URL construction, invalid IDs, resume and sandbox permissions.

## Cinematic title and player redesign

- Movie and series selections open a full-viewport editorial title page inspired by the supplied Sherlock reference: oversized typography, full-bleed artwork, synopsis, metadata, a glass play button and distinct trailer selections.
- `themes.js` samples a small, CORS-enabled artwork image locally and builds a legible accent/surface palette. If artwork sampling is unavailable, a genre-based palette supplies the theme. Crime/mystery, animation, science fiction and other genres have distinct treatments.
- The full-screen playback shell carries the title's theme and artwork. Source controls are collapsed behind a glass source button; all five sources and redirect restrictions are retained. Embedded providers retain their own video controls.
- Browser checks covered Interstellar and Spider-Verse title pages, the Sherlock series page and episode controls, the second trailer URL, return-to-title navigation, source menu expand/collapse, retained iframe restrictions and phone-width layouts.
- `node tests/themes.test.cjs` verifies artwork colour sampling, genre selection and palette contrast. Existing source tests remain in place.

## Episode browser and artwork loading update

- Replaced visible season/episode number inputs with an episode library on series title pages: season selector, thumbnails, actual episode titles, available runtimes and release dates, descriptions, and optional spoiler shield.
- Cinemeta supplies the initial episode catalogue; exact IMDb matching against TVmaze enriches episode data with attribution. No show-level runtime is presented as an episode runtime. Unreleased episodes are disabled; specials outside numbered seasons are omitted because the configured embed routes accept seasons starting at 1.
- Added an in-player Episodes drawer with season selection, a highlighted current episode, keyboard close/focus containment, and previous/next navigation across available episodes. Choosing an episode updates the provider URL and persisted recent selection directly.
- Added an artwork loading cover with title, episode name, and segmented source-opening stages. It covers metadata/source setup and ends after the iframe document opens (or trusted playback events arrive); a provider can continue buffering internally after its page has opened. An extended wait exposes Show player and Change source controls. The cover does not claim to measure third-party stream download progress.
- Browser checks with Ted Lasso: ten season-one episodes, twelve season-two episodes, S2 E1 Goodbye Earl selection, next to S2 E2 Lavender, restored selection, source URL identifiers, and phone episode cards and drawer highlighting. The episode list and in-player UI were visually checked; the loading cover was inspected with the production loading component in a temporary QA page. Temporary QA pages were removed.
- `node tests/episodes.test.cjs` verifies ordering, duplicate normalization, season boundaries, unreleased episodes, and metadata merging. Source and theme checks remain passing.

### Corner lens and inline episodes
Series title pages now use the former trailer area for a horizontal episode card rail with season selection and spoiler shield. Film pages retain trailers. The separate artwork-only corner plane uses a radial barrel displacement map with slightly separated RGB channels, softly masked to the four corners. Title text, navigation, play button, episode cards and player iframe are outside the effect. Browser QA checked real Ted Lasso episodes and a season change; episode/provider/theme checks passed.

### Alignment and motion polish
Desktop series play CTA is vertically centered against the episode panel. Title pages fade on entry/exit; player, artwork loading, episode drawer, catalogue and featured slides use brief opacity/position transitions. Reduced-motion preference disables them. Saving a title now updates its button without rebuilding the entire title scene or resetting the episode rail.

### Corner ghosting fix
Removed the scaled duplicate artwork layer, which caused visible double exposure on faces near the corners. Refraction now operates on the single original artwork with a neutral center and gentle inward corner displacement. Long title desktop sizing is bounded by total title length so episode controls remain closer to the first viewport.
