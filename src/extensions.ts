import HubBlock from './Components/Blocks/HubBlock.vue';
import HubAlert from './Components/Alert/HubAlert.vue';
import HubBadge from './Components/Badge/HubBadge.vue';
import HubButton from './Components/Button/HubButton.vue';
import HubButtonGroup from './Components/Button/HubButtonGroup.vue';
import HubCard from './Components/Card/HubCard.vue';
import HubCardFooter from './Components/Card/HubCardFooter.vue';
import HubCardGroup from './Components/Card/HubCardGroup.vue';
import HubCardHeader from './Components/Card/HubCardHeader.vue';
import HubCardPreview from './Components/Card/HubCardPreview.vue';
import HubDataPlaceholder from './Components/Data/HubDataPlaceholder.vue';
import HubDataDate from './Components/Data/HubDataDate.vue';
import HubDataNumeric from './Components/Data/HubDataNumeric.vue';
import HubDataGrid from './Components/DataGrid/HubDataGrid.vue';
import HubDialog from './Components/Dialog/HubDialog.vue';
import HubDrawer from './Components/Dialog/HubDrawer.vue';
import HubDropdown from './Components/Dropdown/HubDropdown.vue';
import HubFormValidationPopover from './Components/Form/Validation/HubFormValidationPopover.vue';
import HubFormValidation from './Components/Form/Validation/HubFormValidation.vue';
import HubFormTextarea from './Components/Form/Textarea/HubFormTextarea.vue';
import HubFormSelect from './Components/Form/Select/HubFormSelect.vue';
import HubFormActivity from './Components/Form/Select/HubFormActivity.vue';
import HubFormRadio from './Components/Form/Radio/HubFormRadio.vue';
import HubFormRadioTree from './Components/Form/Radio/HubFormRadioTree.vue';
import HubFormRadioTreeItem from './Components/Form/Radio/HubFormRadioTreeItem.vue';
import HubFormDate from './Components/Form/Input/HubFormDate.vue';
import HubFormDateTime from './Components/Form/Input/HubFormDateTime.vue';
import HubFormInput from './Components/Form/Input/HubFormInput.vue';
import HubFormMoney from './Components/Form/Input/HubFormMoney.vue';
import HubFormEditor from './Components/Form/Editor/HubFormEditor.vue';
import HubFormControl from './Components/Form/Control/HubFormControl.vue';
import HubFormColorPalette from './Components/Form/ColorPalette/HubFormColorPalette.vue';
import HubFormCheckboxTree from './Components/Form/Checkbox/HubFormCheckboxTree.vue';
import HubFormCheckbox from './Components/Form/Checkbox/HubFormCheckbox.vue';
import HubPagination from './Components/Pagination/HubPagination.vue';
import HubAvatar from './Components/Person/HubAvatar.vue';
import HubAvatarGroup from './Components/Person/HubAvatarGroup.vue';
import HubPopover from './Components/Popover/HubPopover.vue';
import HubSection from './Components/Section/HubSection.vue';
import HubLoader from './Components/Spinner/HubLoader.vue';
import HubLoaderDialog from './Components/Spinner/HubLoaderDialog.vue';
import HubSpinner from './Components/Spinner/HubSpinner.vue';
import HubTab from './Components/TabList/HubTab.vue';
import HubTabList from './Components/TabList/HubTabList.vue';
import HubFormTranslatable from './Components/Form/Translatable/HubFormTranslatable.vue';
import HubToolbar from './Components/Toolbar/HubToolbar.vue';
import HubTreeView from './Components/TreeView/HubTreeView.vue';
import HubFormCheckboxList from './Components/Form/Checkbox/HubFormCheckboxList.vue';
import HubForm from './Components/Form/Form/HubForm.vue';
import HubDataLoader from './Components/Loader/HubDataLoader.vue';
import BackButton from './Components/Button/BackButton.vue';
import DeleteButton from './Components/Button/DeleteButton.vue';
import EditButton from './Components/Button/EditButton.vue';
import NewButton from './Components/Button/NewButton.vue';
import CancelButton from './Components/Button/CancelButton.vue';
import SaveButton from './Components/Button/SaveButton.vue';
import BatchDeleteButton from './Components/Button/BatchDeleteButton.vue';
import HubFormRadioList from './Components/Form/Radio/HubFormRadioList.vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    HubAlert: typeof HubAlert,
    HubBadge: typeof HubBadge,
    HubBlock: typeof HubBlock,
    NewButton: typeof NewButton,
    BackButton: typeof BackButton,
    BatchDeleteButton: typeof BatchDeleteButton,
    DeleteButton: typeof DeleteButton,
    EditButton: typeof EditButton,
    HubButton: typeof HubButton,
    HubButtonGroup: typeof HubButtonGroup,
    SaveButton: typeof SaveButton,
    CancelButton: typeof CancelButton,
    HubCard: typeof HubCard,
    HubCardFooter: typeof HubCardFooter,
    HubCardGroup: typeof HubCardGroup,
    HubCardHeader: typeof HubCardHeader,
    HubCardPreview: typeof HubCardPreview,
    HubDataDate: typeof HubDataDate,
    HubDataNumeric: typeof HubDataNumeric,
    HubDataPlaceholder: typeof HubDataPlaceholder,
    HubDataGrid: typeof HubDataGrid,
    HubDialog: typeof HubDialog,
    HubDrawer: typeof HubDrawer,
    HubDropdown: typeof HubDropdown,
    HubFormCheckbox: typeof HubFormCheckbox,
    HubFormCheckboxList: typeof HubFormCheckboxList,
    HubFormCheckboxTree: typeof HubFormCheckboxTree,
    HubFormColorPalette: typeof HubFormColorPalette,
    HubFormControl: typeof HubFormControl,
    HubFormEditor: typeof HubFormEditor,
    HubForm: typeof HubForm,
    HubFormDate: typeof HubFormDate,
    HubFormDateTime: typeof HubFormDateTime,
    HubFormInput: typeof HubFormInput,
    HubFormMoney: typeof HubFormMoney,
    HubFormRadio: typeof HubFormRadio,
    HubFormRadioList: typeof HubFormRadioList,
    HubFormRadioTree: typeof HubFormRadioTree,
    HubFormRadioTreeItem: typeof HubFormRadioTreeItem,
    HubFormActivity: typeof HubFormActivity,
    HubFormSelect: typeof HubFormSelect,
    HubFormTextarea: typeof HubFormTextarea,
    HubFormTranslatable: typeof HubFormTranslatable,
    HubFormValidation: typeof HubFormValidation,
    HubFormValidationPopover: typeof HubFormValidationPopover,
    HubDataLoader: typeof HubDataLoader,
    HubPagination: typeof HubPagination,
    HubAvatar: typeof HubAvatar,
    HubAvatarGroup: typeof HubAvatarGroup,
    HubPopover: typeof HubPopover,
    HubSection: typeof HubSection,
    HubLoader: typeof HubLoader,
    HubLoaderDialog: typeof HubLoaderDialog,
    HubTab: typeof HubTab,
    HubTabList: typeof HubTabList,
    HubSpinner: typeof HubSpinner,
    HubToolbar: typeof HubToolbar,
    HubTreeView: typeof HubTreeView,
  }
}

declare global {
  var __currency_code: string;
  var __currency_decimals: number;
}

declare global {
  var __app_timezone: string;
}

declare global {
  export interface HTMLElement {
    tooltipCleanup?: () => void,
    tooltipElement?: HTMLDivElement,
    tooltipText?: string,
  }
}
