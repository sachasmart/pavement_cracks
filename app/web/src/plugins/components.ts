import {ConfirmDialog} from "@components/dialogs";
import {ActionBar, AppPage, LayoutStack, ProgressLoader} from "@components/layout";
import {Typography} from "@components/typography";

import type {App} from "vue";

/**
 * Register globally available components
 *
 * NOTE: Global components should be defined in '@typings/shims/components.d.ts' in order to
 *         utilize editor type/prop completion.
 */
export default {
  install: (app: App) => {
    // Layout
    app.component("ActionBar", ActionBar);
    app.component("AppPage", AppPage);
    app.component("LayoutStack", LayoutStack);
    app.component("ProgressLoader", ProgressLoader);
    // Dialogs
    app.component("ConfirmDialog", ConfirmDialog);
    // Typography
    // eslint-disable-next-line vue/multi-word-component-names
    app.component("Typography", Typography);
  },
};
