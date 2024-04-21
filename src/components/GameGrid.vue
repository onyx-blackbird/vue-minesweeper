<script setup lang="ts">
import { ref, reactive, type PropType, type Ref } from 'vue';
import seedrandom from 'seedrandom';

import { GridSize, type GameSize } from '@/model/common';

import MineField from '@/components/MineField.vue';
import FieldProps from '@/model/FieldProps';

const props = defineProps({
	gameSize: { type: Object as PropType<GameSize>, required: true },
});

const RNG = seedrandom();

const gridSize = {
	width: props.gameSize.w * GridSize + 'px',
	height: props.gameSize.h * GridSize + 'px',
};

const prepareFields: FieldProps[][] = [];
for (let i = 0; i < props.gameSize.h; i++) {
	const row: Array<FieldProps> = [];
	for (let j = 0; j < props.gameSize.w; j++) {
		row.push(new FieldProps(j, i));
	}
	prepareFields.push(row);
}
const fields = reactive(prepareFields);

const maxX = props.gameSize.w - 1;
const maxY = props.gameSize.h - 1;
for (let i = 0; i < props.gameSize.mines; i++) {
	let mineY, mineX;
	do {
		mineY = Math.round(RNG() * maxY);
		mineX = Math.round(RNG() * maxX);
	} while (fields[mineY][mineX].hasMine);
	fields[mineY][mineX].hasMine = true;
}

const grid: Ref<HTMLDivElement | null> = ref(null);
const isGameOver = ref(false);
const hasWon = ref(false);

function calculateMines(field: FieldProps): number {
	let mineCount = 0;
	for (let i = field.y - 1; i <= field.y + 1; i++) {
		if (i < 0 || i > maxY) continue;
		for (let j = field.x - 1; j <= field.x + 1; j++) {
			if (j < 0 || j > maxX) continue;
			if (fields[i][j].hasMine) {
				mineCount++;
			}
		}
	}
	return mineCount;
}

function unveilNeighbours(field: FieldProps): void {
	for (let i = field.y - 1; i <= field.y + 1; i++) {
		if (i < 0 || i > maxY) continue;
		for (let j = field.x - 1; j <= field.x + 1; j++) {
			if (j < 0 || j > maxX) continue;
			const neighbour = fields[i][j];
			if (!neighbour.isUncovered) {
				neighbour.isUncovered = true;
				neighbour.mineCount = calculateMines(neighbour as FieldProps);
				if (neighbour.mineCount === 0) {
					unveilNeighbours(neighbour as FieldProps);
				}
			}
		}
	}
}

function onClick(field: FieldProps): void {
	field.isUncovered = true;
	if (field.hasMine) {
		isGameOver.value = true;
		fields.forEach((row) =>
			row.forEach((field) => (field.isUncovered = true)),
		);
		return;
	} else {
		field.mineCount = calculateMines(field);
		if (field.mineCount === 0) {
			unveilNeighbours(field);
		}
	}
	hasWon.value = fields.every((row) =>
		row.every(
			(field) => field.isUncovered || field.hasFlag || field.hasMine,
		),
	);
}

function onRightClick(field: FieldProps): void {
	if (field.hasFlag) {
		field.hasFlag = false;
	} else if (!field.isUncovered) {
		field.hasFlag = true;
	}
}

function onGameOverClick(e: Event): void {
	e.stopPropagation();
}
</script>

<template>
	<p>Click on the fields to uncover them, but mind the mines!</p>
	<p>
		Use the right mouse button - or long click on mobile - to flag potential
		mines, right click again to remove the flag.
	</p>
	<p>The goal is to uncover all fields that are no mines.</p>
	<p>There are {{ gameSize.mines }} mines on the field.</p>
	<div v-if="isGameOver" class="game-over">GAME OVER</div>
	<div v-if="hasWon" class="winner">
		Congratulations you uncovered all the fields!
	</div>
	<div
		class="grid"
		ref="grid"
		:style="gridSize"
		:="isGameOver ? { onClickCapture: onGameOverClick } : {}"
	>
		<template v-for="(row, rowIndex) in fields">
			<template
				v-for="(field, colIndex) in row"
				:key="rowIndex + '_' + colIndex"
			>
				<mine-field
					:field="field"
					@click="onClick(field as FieldProps)"
					@contextmenu.prevent="onRightClick(field as FieldProps)"
				></mine-field>
			</template>
		</template>
	</div>
</template>
