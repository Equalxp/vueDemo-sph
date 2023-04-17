<template>
  <div class="spec-preview">
    <!-- 正常展示的图片 -->
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <!-- 放大的图片 -->
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big"/>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex:0
    }
  },
  computed:{
    imgObj(){
      //让还没请求回来的数据 至少是一个[] 不能是一个undefined
      return this.skuImageList[this.currentIndex]||{}
    }
  },
  mounted(){
    //全局事件总线：获取兄弟组件传递过来的索引值
    this.$bus.$on('getIndex',(index)=>{
        //修改当前响应式数据
        //兄弟节点给数据
        this.currentIndex = index;
    })
  },
  methods: {
    handler(event) {
      // 获取元素
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      // event.offsetX是鼠标距离父元素边框的距离
      let left = event.offsetX - mask.offsetWidth/2;
      let top = event.offsetY - mask.offsetHeight/2;
      //left和top那就是mask遮罩层 距离父元素上左的距离
      //约束范围
      if(left <=0) left = 0;
      // 因为mask宽*2 = 父元素宽 
      if(left >=mask.offsetWidth) left = mask.offsetWidth;
      if(top<=0)top = 0;
      if(top>=mask.offsetHeight) top = mask.offsetHeight;

      //修改元素的left|top属性值
      mask.style.left = left+'px';
      mask.style.top = top +'px';
      //最后写big的style修改
      big.style.left = - 2 * left+'px';
      big.style.top = -2 * top +'px';
    },
  },

};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
