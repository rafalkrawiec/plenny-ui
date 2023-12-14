import { type Plugin } from 'vue';
import { registerComponents } from './Components';
import { registerDirectives } from './Directives';

import '../scss/main.scss';

export * from './Components';

export * from './Components/DataGrid/Services/ColumnFactory/Factory';

export * from './Composables/UseCardsDraggable';
export * from './Composables/UseComponentAppearance';
export * from './Composables/UseComponentExpander';
export * from './Composables/UseComponentSize';
export * from './Composables/UseControl';
export * from './Composables/UseControlErrors';
export * from './Composables/UseControlModel';
export * from './Composables/UseFocusNavigation';
export * from './Composables/UseFormContext';
export * from './Composables/UseGroupColor';
export * from './Composables/UseHubBatchWatcher';
export * from './Composables/UseHubConfirmation';
export * from './Composables/UseHubDataLoader';
export * from './Composables/UseHubForm';
export * from './Composables/UsePaginator';
export * from './Composables/UseTreeDraggable';

export * from './DependencyInjection/Ui';
export * from './Router/HubRouter';

export * from './Services/HubBlockManager';
export * from './Services/HubModuleManager';

export * from './Store/DataGridConfigurationStore';

export * from './Utils/ColorPalette';
export * from './Utils/ReversedSide';

export * from './extensions';

export const UiPlugin: Plugin = {
  install(app) {
    registerComponents(app);
    registerDirectives(app);
  },
};
