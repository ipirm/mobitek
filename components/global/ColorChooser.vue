<template>
	<div class="color-chooser">
		<div class="color-chooser__item__wrapper" v-for="(item,i) in colors" :key="i">
			<div class="color-chooser__item" @click="choose(i)" :style="{background: item.title }" :class="{ active: chosen[i] }"></div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['colors', 'chosen'],

	methods: {
		choose(i) {
			this.$emit('toggleColor', i);
		}
	}
}
</script>
