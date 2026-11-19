<template>
  <div class="plans container">
    <h5>Select A Plan</h5>
    <div v-for="plan in plans" class="row">
      <a class="col" href="#" @click="selectPlan(plan.id, $event)">
        {{plan.name}}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['plans', 'selectPlan']
}
</script>
