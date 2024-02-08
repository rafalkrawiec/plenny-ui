<script setup lang="ts">

</script>
<template>
  <HubButton before="delete-regular" danger>
    <slot>
      {{ $t('Usuń') }}
    </slot>
  </HubButton>
</template>
