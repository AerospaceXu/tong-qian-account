<template>
  <div class="number-pad">
    <div class="current-money">{{ cM }}</div>
    <div @click.prevent="numberBtn" class="buttons">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button id="delete">删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button id="clear">清空</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button id="ok">OK</button>
      <button id="zero">0</button>
      <button>.</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  @Component
  export default class NumberPad extends Vue {
    @Prop({default: '0'}) readonly cM!: string;

    emitNumber(payload: string) {
      this.$emit('update:cM', payload);
    }

    numberBtn(e: MouseEvent) {
      const button = (e.target as HTMLButtonElement);
      if (button.id === 'delete') {
        this.emitNumber(this.cM.slice(0, -1));
        if (this.cM === '') {
          this.emitNumber('0');
        }
        return;
      }
      if (button.id === 'clear') {
        this.emitNumber('0');
        return;
      }
      if (button.id === 'ok') {
        this.$emit('updateNumber');
        return;
      }

      const input = button.textContent;
      if (this.cM.length === 15) {
        return;
      }
      if (this.cM === '0' && input !== '.') {
        if (input !== '0') {
          this.emitNumber(input || '0');
        }
        return;
      }
      if (this.cM.indexOf('.') !== -1 && input === '.') {
        return;
      }
      this.emitNumber(this.cM + button.textContent);
    }
  };
</script>

<style lang="scss" scoped>
  .number-pad {
    .current-money {
      width: 100%;
      padding: 12px 24px;
      background-color: #FFFFFF;

      font-size: 32px;
      font-weight: bold;
      font-family: "Courier New", monospace;
      text-align: right;
    }

    .buttons {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 25%);
      grid-template-rows: repeat(4, 64px);

      button {
        background-color: transparent;
        border: none;
        font-size: 16px;
        border-radius: 0;
      }

      $bg-color: #F2F2F2;

      button:nth-child(1) {
        background-color: $bg-color;
      }

      button:nth-child(2),
      button:nth-child(5) {
        background-color: darken($bg-color, 4%);
      }

      button:nth-child(3),
      button:nth-child(6),
      button:nth-child(9) {
        background-color: darken($bg-color, 8%);
      }

      button:nth-child(4),
      button:nth-child(7),
      button:nth-child(10) {
        background-color: darken($bg-color, 12%);
      }

      button:nth-child(8),
      button:nth-child(11),
      button:nth-child(13) {
        background-color: darken($bg-color, 16%);
      }

      button:nth-child(12) {
        background-color: darken($bg-color, 28%);
      }

      button:nth-child(14) {
        background-color: darken($bg-color, 20%);
      }

      #ok {
        grid-column-start: 4;
        grid-column-end: 5;
        grid-row-start: 3;
        grid-row-end: 5;
      }

      #zero {
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 4;
        grid-row-end: 5;
      }
    }
  }
</style>