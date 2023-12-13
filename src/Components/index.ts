import HubBlock from './Blocks/HubBlock.vue';
import HubAlert from './Alert/HubAlert.vue';
import HubBadge from './Badge/HubBadge.vue';
import HubButton from './Button/HubButton.vue';
import HubButtonGroup from './Button/HubButtonGroup.vue';
import HubCard from './Card/HubCard.vue';
import HubCardFooter from './Card/HubCardFooter.vue';
import HubCardGroup from './Card/HubCardGroup.vue';
import HubCardHeader from './Card/HubCardHeader.vue';
import HubCardPreview from './Card/HubCardPreview.vue';
import HubDataPlaceholder from './Data/HubDataPlaceholder.vue';
import HubDataDate from './Data/HubDataDate.vue';
import HubDataNumeric from './Data/HubDataNumeric.vue';
import HubDataGrid from './DataGrid/HubDataGrid.vue';
import HubDialog from './Dialog/HubDialog.vue';
import HubDrawer from './Dialog/HubDrawer.vue';
import HubDropdown from './Dropdown/HubDropdown.vue';
import HubFormValidationPopover from './Form/Validation/HubFormValidationPopover.vue';
import HubFormValidation from './Form/Validation/HubFormValidation.vue';
import HubFormTextarea from './Form/Textarea/HubFormTextarea.vue';
import HubFormSelect from './Form/Select/HubFormSelect.vue';
import HubFormActivity from './Form/Select/HubFormActivity.vue';
import HubFormRadio from './Form/Radio/HubFormRadio.vue';
import HubFormRadioTree from './Form/Radio/HubFormRadioTree.vue';
import HubFormRadioTreeItem from './Form/Radio/HubFormRadioTreeItem.vue';
import HubFormDate from './Form/Input/HubFormDate.vue';
import HubFormDateTime from './Form/Input/HubFormDateTime.vue';
import HubFormInput from './Form/Input/HubFormInput.vue';
import HubFormMoney from './Form/Input/HubFormMoney.vue';
import HubFormEditor from './Form/Editor/HubFormEditor.vue';
import HubFormControl from './Form/Control/HubFormControl.vue';
import HubFormColorPalette from './Form/ColorPalette/HubFormColorPalette.vue';
import HubFormCheckboxTree from './Form/Checkbox/HubFormCheckboxTree.vue';
import HubFormCheckbox from './Form/Checkbox/HubFormCheckbox.vue';
import HubPagination from './Pagination/HubPagination.vue';
import HubAvatar from './Person/HubAvatar.vue';
import HubAvatarGroup from './Person/HubAvatarGroup.vue';
import HubPopover from './Popover/HubPopover.vue';
import HubSection from './Section/HubSection.vue';
import HubLoader from './Spinner/HubLoader.vue';
import HubLoaderDialog from './Spinner/HubLoaderDialog.vue';
import HubSpinner from './Spinner/HubSpinner.vue';
import HubTab from './TabList/HubTab.vue';
import HubTabList from './TabList/HubTabList.vue';
import HubFormTranslatable from './Form/Translatable/HubFormTranslatable.vue';
import HubToolbar from './Toolbar/HubToolbar.vue';
import HubTreeView from './TreeView/HubTreeView.vue';
import HubFormCheckboxList from './Form/Checkbox/HubFormCheckboxList.vue';
import HubForm from './Form/Form/HubForm.vue';
import HubDataLoader from './Loader/HubDataLoader.vue';
import BackButton from './Button/BackButton.vue';
import DeleteButton from './Button/DeleteButton.vue';
import EditButton from './Button/EditButton.vue';
import NewButton from './Button/NewButton.vue';
import CancelButton from './Button/CancelButton.vue';
import SaveButton from './Button/SaveButton.vue';
import BatchDeleteButton from './Button/BatchDeleteButton.vue';
import type { App } from 'vue';

export function registerComponents(app: App) {
  app.component('HubAlert', HubAlert);
  app.component('HubBadge', HubBadge);
  app.component('HubBlock', HubBlock);
  app.component('NewButton', NewButton);
  app.component('BackButton', BackButton);
  app.component('DeleteButton', DeleteButton);
  app.component('BatchDeleteButton', BatchDeleteButton);
  app.component('EditButton', EditButton);
  app.component('SaveButton', SaveButton);
  app.component('CancelButton', CancelButton);
  app.component('HubButton', HubButton);
  app.component('HubButtonGroup', HubButtonGroup);
  app.component('HubCard', HubCard);
  app.component('HubCardFooter', HubCardFooter);
  app.component('HubCardGroup', HubCardGroup);
  app.component('HubCardHeader', HubCardHeader);
  app.component('HubCardPreview', HubCardPreview);
  app.component('HubDataDate', HubDataDate);
  app.component('HubDataNumeric', HubDataNumeric);
  app.component('HubDataPlaceholder', HubDataPlaceholder);
  app.component('HubDataGrid', HubDataGrid);
  app.component('HubDialog', HubDialog);
  app.component('HubDrawer', HubDrawer);
  app.component('HubDropdown', HubDropdown);
  app.component('HubFormCheckbox', HubFormCheckbox);
  app.component('HubFormCheckboxList', HubFormCheckboxList);
  app.component('HubFormCheckboxTree', HubFormCheckboxTree);
  app.component('HubFormColorPalette', HubFormColorPalette);
  app.component('HubFormControl', HubFormControl);
  app.component('HubFormEditor', HubFormEditor);
  app.component('HubForm', HubForm);
  app.component('HubFormDate', HubFormDate);
  app.component('HubFormDateTime', HubFormDateTime);
  app.component('HubFormInput', HubFormInput);
  app.component('HubFormMoney', HubFormMoney);
  app.component('HubFormRadio', HubFormRadio);
  app.component('HubFormRadioTree', HubFormRadioTree);
  app.component('HubFormRadioTreeItem', HubFormRadioTreeItem);
  app.component('HubFormActivity', HubFormActivity);
  app.component('HubFormSelect', HubFormSelect);
  app.component('HubFormTextarea', HubFormTextarea);
  app.component('HubFormTranslatable', HubFormTranslatable);
  app.component('HubFormValidation', HubFormValidation);
  app.component('HubFormValidationPopover', HubFormValidationPopover);
  app.component('HubDataLoader', HubDataLoader);
  app.component('HubPagination', HubPagination);
  app.component('HubAvatar', HubAvatar);
  app.component('HubAvatarGroup', HubAvatarGroup);
  app.component('HubPopover', HubPopover);
  app.component('HubSection', HubSection);
  app.component('HubLoader', HubLoader);
  app.component('HubLoaderDialog', HubLoaderDialog);
  app.component('HubSpinner', HubSpinner);
  app.component('HubTab', HubTab);
  app.component('HubTabList', HubTabList);
  app.component('HubToolbar', HubToolbar);
  app.component('HubTreeView', HubTreeView);
}

export {
  HubBlock,
  HubAlert,
  HubBadge,
  HubButton,
  HubButtonGroup,
  HubCard,
  HubCardFooter,
  HubCardGroup,
  HubCardHeader,
  HubCardPreview,
  HubDataPlaceholder,
  HubDataDate,
  HubDataNumeric,
  HubDataGrid,
  HubDialog,
  HubDrawer,
  HubDropdown,
  HubFormValidationPopover,
  HubFormValidation,
  HubFormTextarea,
  HubFormSelect,
  HubFormActivity,
  HubFormRadio,
  HubFormRadioTree,
  HubFormRadioTreeItem,
  HubFormDate,
  HubFormDateTime,
  HubFormInput,
  HubFormMoney,
  HubFormEditor,
  HubFormControl,
  HubFormColorPalette,
  HubFormCheckboxTree,
  HubFormCheckbox,
  HubPagination,
  HubAvatar,
  HubAvatarGroup,
  HubPopover,
  HubSection,
  HubLoader,
  HubLoaderDialog,
  HubSpinner,
  HubTab,
  HubTabList,
  HubFormTranslatable,
  HubToolbar,
  HubTreeView,
  HubFormCheckboxList,
  HubForm,
  HubDataLoader,
  BackButton,
  DeleteButton,
  EditButton,
  NewButton,
  CancelButton,
  SaveButton,
  BatchDeleteButton,
};
