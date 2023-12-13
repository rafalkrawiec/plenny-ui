import type { InjectionKey } from 'vue';
import type { DataGrid } from '../Components/DataGrid/Types';
import type { FormContext } from '../Composables/UseHubForm';

export const FormContextKey = Symbol('FormContext') as InjectionKey<FormContext>;
export const DataGridKey = Symbol('DataGrid') as InjectionKey<DataGrid>;
