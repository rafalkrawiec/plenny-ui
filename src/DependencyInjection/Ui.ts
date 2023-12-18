import type { InjectionKey } from 'vue';
import type { Editor, EditorConfig } from '@ckeditor/ckeditor5-core';
import type { DataGrid } from '../Components/DataGrid/Types';
import type { FormContext } from '../Composables/UseHubForm';

export type EditorInstance = {
  editor: Editor;
  config?: EditorConfig;
}

export const FormContextKey = Symbol('FormContext') as InjectionKey<FormContext>;
export const DataGridKey = Symbol('DataGrid') as InjectionKey<DataGrid>;
export const EditorInstanceKey = Symbol('EditorInstance') as InjectionKey<EditorInstance>;
