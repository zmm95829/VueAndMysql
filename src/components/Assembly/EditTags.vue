
<template>
  <section>
    <el-tag
      :key="tag"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >{{tag}}</el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    ></el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">{{ addTitle }}</el-button>
  </section>
</template>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

<script>
export default {
  props: {
    // tag标签内容
    dynamicTags: {
      type: Array,
      default: () => []
    },
    // 添加标签的输入框提示标题
    addTitle: {
      type: String,
      default: "+ New Tag"
    }
  },
  data() {
    return {
      inputVisible: false,
      inputValue: ""
    };
  },
  mounted() {
  },
  watch: {
    // 标签内容改变，改变父组件的相应值
    dynamicTags: function() {
      this.$emit("update:dynamicTags", this.dynamicTags);
    }
  },
  methods: {
    /**
     * 删掉标签
     */
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    /**
     * 点击添加标签后，输入框获取焦点
     */
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    /**
     * 输入框失去焦点或enter后添加标签
     */
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  }
}
</script>