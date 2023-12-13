<script setup lang="ts">
  import { computed, ref, type PropType, toValue } from 'vue';
  import { watch } from 'vue';
  import { useResource, useRequest } from '@plenny/connect';


  const request = useRequest();

  const props = defineProps({
    name: { type: String as PropType<string>, required: true },
    current: { type: Object as PropType<any>, required: false },
    config: { type: Object as PropType<any>, required: false },
    visible: { type: Object as PropType<any>, required: true },
    filter: { type: Object as PropType<any>, required: true },
    sizing: { type: Object as PropType<any>, required: true },
    sort: { type: Object as PropType<any>, required: true},
    search: { type: String as PropType<string>, required: true },
  })


  const nameConfig = ref()
  const isPrivate = ref(true)


  const { resource, loading, error, reload } = useResource({
    endpoint: `/api/v1/hub/grid/${props.name}/configuration`,
  });


  function makeData() {
    return { visible: toValue(props.visible), filter: toValue(props.filter), sizing: toValue(props.sizing), sort: toValue(props.sort), search: toValue(props.search) }
  }

  function addConfig() {

    let data = { name: toValue(nameConfig), private: toValue(isPrivate), configuration: makeData() }

    request({
      endpoint: `/api/v1/hub/grid/${props.name}/configuration`,
      method: 'POST',
      data: data
    }).then(() => {
      current.value = undefined
      nameConfig.value = undefined
      isPrivate.value = true
      reload()
    }).catch((error) => {
      error.value = error
    });

  }

  function updateConfig() {


    let data = { name: toValue(nameConfig), private: toValue(isPrivate), configuration: makeData() };


    if (props.config.id && props.name) {
      request({
        endpoint: `/api/v1/hub/grid/${props.name}/configuration/${props.config.id}`,
        method: 'PATCH',
        data: data
      }).then(() => {
        current.value = undefined
        nameConfig.value = undefined
        isPrivate.value = true
        reload()
      }).catch((error) => {
        error.value = error
      });
    }

  }


  function deleteConfig() {


    if (props.config.id && props.name) {
      request({
        endpoint: `/api/v1/hub/grid/${props.name}/configuration/${props.config.id}`,
        method: 'DELETE',
      }).then(() => {
        current.value = undefined
        nameConfig.value = undefined
        isPrivate.value = true
        reload()
        emit('reset:current')
      }).catch((error) => {
        error.value = error
      });
    }

  }

  function reset() {
    current.value = undefined
    nameConfig.value = undefined
    isPrivate.value = true
    emit('reset:current')
  }


  const options = computed(() => {
    if (resource.value) {
      return resource.value.map((element) => ({ label: element.name, value: element.id }))
    }
    return
  })

  const emit = defineEmits(['update:current', 'reset:current'])


  const current = computed({
    get: () => props.current?.id,
    set: (value) => emit('update:current', resource.value.find((element) => element.id === value))
  });

  watch(() => props.config, () => {
    if (props.config) {
      nameConfig.value = props.config.name;
      isPrivate.value = props.config.private
    }
  }, { immediate: true })


</script>
<template>
  <HubDataLoader v-bind="{ loading, error }">
    <div class="stack vertical">
      <div class="stack vertical smaller">
        <HubFormSelect :placeholder="$t('Wybierz konfiguracje')" :options="options" v-model="current" />
      </div>
      <div v-if="config">
        <div class="stack vertical smaller">
          <HubFormInput :label="$t('Nazwa konfiguracji')" v-model="nameConfig" />
          <HubFormCheckbox :label="$t('Prywatna')" v-model="isPrivate" />
        </div>

        <HubButtonGroup>
          <HubButton primary small @click="updateConfig">{{ $t('Edytuj') }}</HubButton>
          <HubButton primary small @click="deleteConfig">{{ $t('Usuń') }}</HubButton>
        </HubButtonGroup>
        <HubButtonGroup>
          <HubButton primary small @click="addConfig">{{ $t('Utwórz') }}</HubButton>
          <HubButton primary small @click="reset">{{ $t('Anuluj') }}</HubButton>
        </HubButtonGroup>
      </div>

      <template v-if="!config">
        <div class="stack vertical smaller">
          <HubFormInput :label="$t('Nazwa konfiguracji')" v-model="nameConfig" />
          <HubFormCheckbox :label="$t('Prywatna')" v-model="isPrivate" />
        </div>
        <HubButtonGroup>
          <HubButton primary small @click="addConfig">{{ $t('Zapisz') }}</HubButton>
          <HubButton primary small @click="reset">{{ $t('Resetuj') }}</HubButton>
        </HubButtonGroup>
      </template>
    </div>
  </HubDataLoader>
</template>
