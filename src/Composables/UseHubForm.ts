import type { MaybeRef } from 'vue';
import { watch, ref, nextTick, toValue, toRef } from 'vue';
import cloneDeep from 'lodash.clonedeep';
import get from 'lodash.get';
import set from 'lodash.set';
import isEqual from 'lodash.isequal';
import { useRoute } from 'vue-router';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { ResourceLoader, ResourceOptions } from '@plenny/connect';
import { useApiClient, buildResourceRequest, dependenciesFromEndpoint } from '@plenny/connect';
import { lookup } from '@plenny/support';

export type FormResource = Record<string, any> | Array<Record<string, any>>;
export type Form<T extends FormResource = any> = ReturnType<typeof useHubForm<T>>;
export type FormContext<T extends FormResource = any> = Form<T>['context'];

export type FormOptions<T extends FormResource = any> = {
  endpoint?: MaybeRef<string>;
  method?: 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  load?: boolean;
  loader?: ResourceLoader<T>;
  initial?: Partial<T>;
  bindings?: Record<string, any>;
  onSuccess?: (options: {
    response: AxiosResponse<T>,
    context: FormContext<T>,
    index?: number,
  }) => Promise<any> | any;
  onFailure?: (options: {
    error: any,
    context: FormContext<T>,
    index?: number,
  }) => boolean;
  onSubmit?: (options: {
    context: FormContext<T>,
    index?: number,
  }) => Promise<AxiosResponse<T>>;
}

export type FormSubmitConfig<T extends FormResource = any> = Partial<ResourceOptions<T>> & {
  index?: number;
};

export function useHubForm<T extends FormResource = any>(options: FormOptions<T>) {
  const client = useApiClient();
  const route = useRoute();

  /**
   * These are form internals for tracking fields errors, dirty and touched
   * state which we do not expose. Proper API methods are exposed instead.
   */
  const fieldsErrors = ref({});
  const fieldsDirty = ref({} as Record<string, boolean>);
  const fieldsTouched = ref({} as Record<string, boolean>);

  function setValidationErrors(errors: Object, config?: FormSubmitConfig<T>) {
    let index = config?.index;

    if (index != undefined) {
      errors = Object.fromEntries(Object.entries(errors).map(([key, value]) => [index + '.' + key, value]));
    }

    fieldsErrors.value = errors;
  }

  /**
   * These props are responsible for form data state.
   */
  const resource = toRef(options.loader?.resource);
  const exists = toRef(options.loader?.exists || false);
  const meta = ref();
  const original = ref(createOriginal(options));
  const data = ref(createInitial(options));

  watch(resource, (value) => {
    original.value = cloneDeep(transform(value));
    data.value = transform(value);
    meta.value = transformMeta(value);
    fieldsErrors.value = {};
    fieldsDirty.value = {};
    fieldsTouched.value = {};
  });

  function getDefault(name: string) {
    return get(original.value, name);
  }

  function setDefault(name: string, value: any) {
    set(original.value, name, value);
    set(data.value, name, value);

    fieldsTouched.value[name] = false;
    fieldsDirty.value[name] = false;
  }

  function getValue(name: string, defaultValue: any = null) {
    return get(data.value, name, defaultValue);
  }

  function setValue(name: string, value: any) {
    set(data.value, name, value);
    fieldsTouched.value[name] = true;
    fieldsDirty.value[name] = !isEqual(getDefault(name), value);
  }

  function reset() {
    data.value = cloneDeep(original.value);
    fieldsErrors.value = {};
    fieldsDirty.value = {};
    fieldsTouched.value = {};
  }

  /**
   * Status properties of the form.
   */
  const error = toRef(options.loader?.error);
  const loading = toRef(options.loader?.loading || false);
  const submitting = ref(false);
  const dirty = ref(false);
  const touched = ref(false);

  watch(fieldsTouched, (value) => touched.value = lookup(value), { deep: true });
  watch(fieldsDirty, (value) => dirty.value = lookup(value), { deep: true });

  async function submitSingleResource({ resource, index, keyBy = 'id' }: { resource: T, index: number, keyBy?: string }) {
    let endpoint = toValue(options.endpoint);

    if (!endpoint) {
      return;
    }

    let primaryKeyName = String(keyBy);
    let primaryKey = resource[keyBy as keyof T];
    let params = {};

    endpoint = `${endpoint}/{${primaryKeyName}}`;

    if (primaryKey) {
      params = { [primaryKeyName]: primaryKey };
    }

    return submit({ endpoint, params, index, data: resource });
  }

  async function submit(config?: FormSubmitConfig<T>) {
    submitting.value = true;
    fieldsErrors.value = {};

    // Wait for loading state to update and start handling.
    await nextTick();

    await callFormSubmitAction(config).then(async (response) => {
      if (false === await callbackOnSuccess(response)) {
        return;
      }

      if (resource.value instanceof Array) {
        if (response.data instanceof Array) {
          resource.value = response.data;
        } else {
          if (config?.index != undefined) {
            resource.value[config.index] = response.data;
            // @ts-expect-error
            resource.value = [...resource.value];
          }
        }
      } else {
        resource.value = response.data;
      }

      exists.value = true;
    }).catch((err) => {
      console.error(err);

      if (callbackOnFailure(err)) {
        if (err.response?.status === 422) {
          setValidationErrors(err.response?.data?.errors || {}, config);
        } else {
          error.value = err;
        }
      }
    });

    fieldsTouched.value = {};
    submitting.value = false;
  }

  async function reload() {
    let endpoint = toValue(options.endpoint);

    if (!endpoint || options.loader || false === options.load) {
      return;
    }

    let args: AxiosRequestConfig;

    try {
      args = buildResourceRequest({
        endpoint,
        bindings: { ...route.params, ...options.bindings },
      });
    } catch (e) {
      return;
    }

    loading.value = true;

    return await client.request(args).then((res) => {
      resource.value = res.data;
      exists.value = true;
      loading.value = false;
    }).catch((err) => {
      console.error(err);
      error.value = err;
    });
  }

  watch(() => dependenciesFromEndpoint(toValue(options.endpoint || ''), { ...route.params, ...options.bindings }), () => reload(), {
    immediate: true,
    flush: 'post',
  });

  /**
   * Form context API which is exposed to the world.
   */
  const context = {
    endpoint: options.endpoint,
    original,
    data,
    meta,
    fieldsErrors,
    fieldsDirty,
    fieldsTouched,
    dirty,
    loading,
    submitting,
    touched,
    setValidationErrors,
    getDefault,
    setDefault,
    getValue,
    setValue,
    reset,
    submit,
    submitSingleResource,
    reload,
  };

  async function callbackOnSuccess(response: AxiosResponse<T>) {
    if (options.onSuccess) {
      return options.onSuccess({ response, context });
    }

    return true;
  }

  function callbackOnFailure(error: any) {
    if (options.onFailure) {
      return options.onFailure({ error, context });
    }

    return true;
  }

  async function callFormSubmitAction(config?: Partial<ResourceOptions<T>>) {
    if (options.onSubmit) {
      return await options.onSubmit({ context });
    }

    let endpoint = toValue(config?.endpoint || options.endpoint);
    let method = toValue(config?.method || options.method);

    if (!endpoint) {
      throw new Error('Cannot use default submit method without endpoint!');
    }

    let args = buildResourceRequest<T>({
      endpoint,
      method,
      bindings: { ...route.params, ...config?.params, ...options.bindings },
      data: (config?.data || data) as T,
    });

    return await client.request<T>(args);
  }

  return { resource, meta, exists, data, dirty, loading, submitting, error, reload, context };
}

function createOriginal<T extends FormResource = any>({ loader, initial }: FormOptions<T>) {
  let resource = toValue(loader?.resource);

  if (resource) {
    return cloneDeep(transform(resource));
  }

  return cloneDeep(initial) || {};
}

function createInitial<T extends FormResource = any>({ loader, initial }: FormOptions<T>) {
  let resource = toValue(loader?.resource);

  if (resource) {
    return transform(resource);
  }

  return transform(initial || {});
}

function transform(data: FormResource | null | undefined): FormResource {
  if (!data) {
    return {};
  }

  if (data instanceof Array) {
    return data.map((record) => transform(record));
  } else {
    if (data.data) {
      return transform(data.data);
    }

    if (data.translations) {
      data.translations.forEach((translation: Record<string, any>) => {
        data[translation.locale] = translation;
      });
    }
  }

  return data;
}

function transformMeta(data: FormResource | null | undefined): Record<string, any> | undefined {
  if (!data) {
    return undefined;
  }

  if (data instanceof Array) {
    return undefined;
  }

  if (data.meta) {
    return data.meta;
  }

  return undefined;
}
