<script setup lang="ts">
import { type PropType } from 'vue';

import { GridSize } from '@/model/common';
import FieldProps from '@/model/FieldProps';

defineProps({
	field: { type: Object as PropType<FieldProps>, required: true },
});

const fieldSize: String = GridSize + 'px';
</script>

<template>
	<div
		class="field"
		:class="{ unveiled: field.isUncovered || field.hasFlag }"
	>
		<img
			src="@/assets/mine.svg"
			:width="GridSize"
			:height="GridSize"
			alt="Mine"
			v-if="field.isUncovered && field.hasMine"
		/>
		<img
			src="@/assets/flag.svg"
			:width="GridSize"
			:height="GridSize"
			alt="Flag"
			v-if="field.hasFlag"
		/>
		<span
			v-if="field.isUncovered && !field.hasMine && !field.hasFlag"
			:class="'mines-' + field.mineCount"
			>{{ field.mineCount }}</span
		>
	</div>
</template>

<style>
.field {
	width: v-bind(fieldSize);
	height: v-bind(fieldSize);
	float: left;
	font-family: 'Courier New', Courier, monospace;
	font-size: 18px;
	font-weight: bold;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
	user-select: none;
}
.field:hover {
	box-shadow: inset 0px 0px 0px 2px #009900;
}
.field.unveiled {
	background-color: #eeeeee;
	box-shadow: inset 0px 0px 0px 1px #dddddd;
}
.mines-1 {
	color: darkgreen;
}
.mines-2 {
	color: cadetblue;
}
.mines-3 {
	color: darkcyan;
}
.mines-4 {
	color: blue;
}
.mines-5 {
	color: blueviolet;
}
.mines-6 {
	color: chocolate;
}
.mines-7 {
	color: brown;
}
.mines-8 {
	color: red;
}
</style>
