<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)" :class="{ active: pageNo == 1 }">1</button>
    <!-- start要为1的时候不出现这个1 大于1才出现这个起始的1 -->
    <!-- continues中间展示的数 第一个是1的时候就不需要 -->
    <button v-if="startNumAndEndNum.start > 2">···</button>
    <!-- 出现... 当前页是5的时候才要...  1 ...  2 3 4 5 6 ... 31   -->
    <!-- start 要大于 2才要.... 1和2 都不要 -->
    <!-- 中间部分 -->
    <button v-for="(page, index) in startNumAndEndNum.end" :key="index" v-if="page >= startNumAndEndNum.start" @click="$emit('getPageNo', page)" :class="{ active: pageNo == page }">
      <!-- 隐藏掉不需要的 -->
      {{ page }}
    </button>

    <!-- 下 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <!-- ... end到totalpage要隔一个数 -->
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo', totalPage)" :class="{ active: pageNo == totalPage }">
      {{ totalPage }}
    </button>
    <!-- 总页码数 end为31时就不需要 -->
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">
      下一页
    </button>
    <!-- 1.一共的页数 -->
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // 父组件传的数据
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //总共多少页
    totalPage() {
      //向上取整数
      return Math.ceil(this.total / this.pageSize)
    },
    //计算出连续的页码的起始数字与结束数字[连续页码的数字:至少是5]
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this
      //先定义两个变量存储起始数字与结束数字
      let start = 0,
        end = 0
      //连续页码数字5【就是至少五页】，如果出现不正常的现象【就是不够五页】
      //不正常现象【总页数没有连续页码多】
      if (continues > totalPage) {
        start = 1
        end = totalPage
      } else {
        //正常现象【连续页码5，但是你的总页数一定是大于5的】
        //起始数字
        start = pageNo - parseInt(continues / 2)
        //结束数字
        end = pageNo + parseInt(continues / 2)
        //把出现不正常的现象【start数字出现0|负数】纠正
        if (start < 1) {
          // 当前页是1 2页的时候 当前页是3时 start等于1
          start = 1
          end = continues
        }
        //把出现不正常的现象[end数字大于总页码]纠正
        if (end > totalPage) { 
          // 当前页取的是 30 31 最大是29
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background: skyblue;
}
</style>
