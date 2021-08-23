<template>
    <div class="style-lable">
        <div class="item_warp" >
            <div class="img_warp" >
                <svg-icon  style="width:100%;height:100%" icon-class="backmoney" />
            </div>
            <div class="title_warp">
                <div class="items">已还金额</div>
                <div class="item items1">{{repayCountPrice || 0}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['repayCountPrice'],
    data() {
        return {
        }
    }, 
}
</script>
<style lang="scss" scoped>
.style-lable{
  margin:10px;
  border-radius: 5px;
//   box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: inherit;
  .item_warp{
    width:19%;
    height: 60px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
    padding:5px 10px;
    .img_warp{
        display: inline-block;
        width:20%;
        height: 50px;
        margin-right: 10px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .title_warp{
        display: inline-block;
        height: 50px;
        width:70%;
        vertical-align:top;
        .items{
            width: 100%;
            height: 50%;
            font-size: 14px;
            color: #AAAAAA;
            line-height:25px;
        }
        .items1{        
            font-size: 18px;
            color: #333333;
        }
    }
  }

}
</style>