<template>
  <div class="kss-year-selector">
    <span
      class="el-icon-d-arrow-left icon"
      :class="{'disabled': leftArrow}"
      @click="changeLeft"
    />
    <div class="select-main" :style="{ width }" :class="{'widthStyle': !width}" ref="selectMain">
      <ul class="year-list" :style="{ right: right + 'px' }" ref="yearList">
        <li
          v-for="(item,i) in list"
          :key="item.id"
          @click="onChange(item.id)"
          v-bind:class="{select: value.select === item.id}"
          ref="selectLi"
        >
          <span>
          {{  item.txt }}
        </span>
        </li>
      </ul>
    </div>
    <span
      class="el-icon-d-arrow-right icon"
      :class="{ 'disabled': rightArrow}"
      @click="changeRight"
    />
  </div>
</template>

<script type="text/babel">
  let index = 0;
  let indexWeek = 0;
  export default {
    name: "ElTimeLine",
    props: {
      change:{
        type:Function,
        default: () => () => {}
      },
      value: Object
    },

    data() {
      return {
        list: [],
        right: 0,
        width: this.value.nowYear - this.value.begin < this.value.defaultNum ? (this.value.nowYear - this.value.begin + 1)*69+(this.value.nowYear - this.value.begin)*12 + 'px' : false,
        rightArrow: true,
        leftArrow: false,
        yearListWidth: null,
        containerWidth: null,
        liWidth: null
      };
    },

    methods: {
      week(year, month, day) {
        // TODO 年里面是第几周
        // todo 一年有多少天
        // 是否为闰年
        let isLeap = (0 === year % 4) && (0 === year % 100) || (0 == year % 400);
        let yearDays = isLeap ? 366 : 365;
        // 一年有多少周
        let yearsWeek = Math.ceil(yearDays / 7);
        // let surplusyearsDay = []
        // 这个月有多少天
        let monthDays = month == 2 ? (isLeap ? 29 : 28) : (month == 4 || month == 6 || month == 9 || month == 11) ? 30 : 31;
        let surplusDays = 0
        // for (let i = 1; i<=12; i++) {
        //    let days = i  == 2? (isLeap? 28:29) : (i  == 4 || i  == 6 ||i  == 9|| i  == 11)? 30: 31;
        //   surplusDays += days;
        //   surplusyearsDay.push({
        //     monthDay: days,
        //     month: i+1,
        //     monthWeek: Math.floor(days/7),
        //     surplusweekDays: days%7
        //   })
        // }
        for (let i = month; i < 12; i++) {
          let days = i == 2 ? (isLeap ? 28 : 29) : (i == 4 || i == 6 || i == 9 || i == 11) ? 30 : 31;
          surplusDays += days;
        }
        surplusDays = month === 0 ? 365 : surplusDays + (monthDays - day)
        // 这天在几周 求开始的周数值
        let surplusweek = Math.ceil(surplusDays / 7);
        let week = Math.ceil((month * monthDays - (monthDays - day)) / 7);
        if (this.value.type === 'date') {
          week = month === 0 ? 0 : week;
          this.value.defaultNum = 9
        } else if (this.value.type === 'month') {
          yearsWeek = 12;
          surplusweek = yearsWeek - month;
          week = Number(month);
          this.value.defaultNum = 8
        } else {
          // 需动态计算
          this.value.defaultNum = 11
        }

        return {
          surplusDays: surplusDays,
          year,
          yearsWeek,
          surplusweek,
          week
        }
      },
      initData(v) {
        const {val} = this.initDom(v);
        const {begin, nowYear, type, year, years, months, days} = val;
        let list = [];
        const types = type === "date" ? '周' : type === 'year' ? '年' : '月';
        for (let i = begin; i <= nowYear; i++) {
          list.push({
            id: i,
            txt: type === 'year' ? `${i}${types}` : `${year}年 / ${i}${types}`
          });
        }
        this.list = list;
        // if (type === "week") {
        //   this.list[nowYear-begin-1] = {
        //     ...this.list[nowYear-begin-1],
        //
        //   }
        // }
        if (!this.value.select) {
          this.onChange(nowYear);
        }
        return list
      },
      initStyle(yearListWidth, containerWidth) {
        if (yearListWidth === containerWidth) {
          this.width = false
          this.leftArrow = true
          // this.rightArrow = true
        }
      },
      initDom(v) {
        const {begin, nowYear, type, year, years, months, days} = v;
        console.log(years.begin, months.begin, days.begin)
        // 结束时间 - 开始时间
        const beginWeek = this.week(years.begin, months.begin, days.begin);
        const nowWeek = this.week(years.now, months.now, days.now)
        console.log(beginWeek, nowWeek)
        if (type === "date") {
          v.begin = beginWeek.week;
          if (beginWeek.year === nowWeek.year) v.nowYear = Math.ceil((beginWeek.surplusDays - nowWeek.surplusDays) / 7) + beginWeek.week
          else v.nowYear = beginWeek.yearsWeek + nowWeek.week
        } else if (type === "year") {
          v.begin = beginWeek.year;
          v.nowYear = nowWeek.year
        } else {
          v.begin = beginWeek.week;
          v.nowYear = beginWeek.year === nowWeek.year ? nowWeek.week : beginWeek.surplusweek + nowWeek.week + v.begin;
        }
        return {
          beginWeek,
          nowWeek,
          val: v
        }
      },
      initList(list,v) {

        const {beginWeek, nowWeek, val} = this.initDom(v)
        const {type,years} = val
        const types = type === "date" ? '周' : type === 'year' ? '年' : '月';
        if (type !== "year") {
          const len = list.length
          let indeI = 0
          if (years.begin < years.now) {
            for (let i= nowWeek.week; i>0; i--){
              indeI++;
              list[len-i] = {
                ...list[len-i],
                txt: type==='year'? `${nowWeek.year}${types}` : `${nowWeek.year}年 / ${indeI}${types}`
              }
            }
          }
          // val.select= list[list.length - 1].id
        }

      },
      onChange(val) {
        this.value.select = val;
        this.change(val);
      },
      changeLeft(){
        if (!this.leftArrow) {
          const { containerWidth, yearListWidth} = this
          index++;
          const slipI = Math.floor(yearListWidth / (containerWidth +12));
          const nowWidth= yearListWidth - index*(containerWidth+12)
          if (index <= slipI) {
            if (nowWidth < containerWidth) this.width = `${nowWidth}px`
            if (index == slipI)  this.leftArrow = true
            this.rightArrow = false
            return this.right +=   - containerWidth - 12
          }
        }
      },
      changeRight() {
        if (!this.rightArrow) {
          const { containerWidth, yearListWidth} = this
          if (index >= 0) {
            this.leftArrow = false
            this.right += containerWidth + 12
            index--
            if (this.right < 0 ) this.width = `${containerWidth}px`
            if (index == 0)  this.rightArrow = true
            return
          }
        }
      }
    },

    mounted() {
      // const v = this.initDom(this.value)
        const list = this.initData(this.value);
      this.initList(list, this.value);
        this.$nextTick(() =>{
          this.yearListWidth =  this.$refs.yearList.clientWidth;
          this.containerWidth = this.$refs.selectMain.clientWidth;
          // this.liWidth = this.$refs.selectLi[0].clientWidth;
          this.initStyle(this.yearListWidth, this.containerWidth)
        })

    //
    },

    computed:{
      // value:{
      //   get(){
      //     return this.value
      //   },
      //   set(v){
      //     this.$emit('change', v)
      //   }
      // },
      // width:{
      //   get() {
      //     return this.value.nowYear - this.value.begin < 11 ? (this.value.nowYear - this.value.begin + 1)*this.liWidth+(this.value.nowYear - this.value.begin)*12 + 'px' : false;
      //   },
      //   set(v) {
      //     return v
      //   }
      // }
    },
    watch:{
      value:{
        deep: true,
        handler(val){
          if (val) {
            const list = this.initData(val);
            this.initList(list,val);
            this.$nextTick(() =>{
              this.yearListWidth =  this.$refs.yearList.clientWidth;
              this.containerWidth = this.$refs.selectMain.clientWidth;
              this.initStyle(this.yearListWidth, this.containerWidth)
            });
            console.log(val)
            // if (val.now) {
            //   const types = val.type === "week"? '周': val.type=== 'year'? '年' : '月';
            //   indexWeek++;
            //   this.list[val.nowYear - 1 ] = {
            //   ...this.list[val.nowYear - 1 ],
            //    id: val.nowYear,
            //   txt: `${Number(val.year) + 1}年 /${indexWeek}${types} `
            // } }
            this.width = val.nowYear - val.begin < val.defaultNum ? (val.nowYear - val.begin + 1)*69+(val.nowYear -val.begin)*12 + 'px' : false;
          }
        }
      }
    }
  };
</script>

<style lang="less" scoped>
    .kss-year-selector {
text-align: left;
height: 32px;
line-height: 32px;
.icon {
  color: #000000;
  opacity: 0.65;
  vertical-align: top;
  cursor: pointer;
  height: 32px;
  display: inline-block;
  line-height: 32px;
  &.disabled{
    color:rgba(184,190,204,1);
    cursor: not-allowed;
    }
  }
.select-main {

  position: relative;
  display: inline-block;
  height: 33px;
  vertical-align: top;
  margin-right: 12px;
  overflow: hidden;
  }
      .widthStyle{
        width: calc(~' 100% - 32px - 12px ');
      }
.year-list {
  position: absolute;
  transition: right .6s;
  white-space: nowrap;
  li {
    display: inline-block;
    min-width: 69px;
    /*padding: 0 3px ;*/
    height: 32px;
    font-size: 14px;
    text-align: center;
    color: rgba(104, 110, 130, 1);
    border-radius: 16px;
    cursor: pointer;
    & + li {
      margin-left: 12px;
      }
    &:hover {
      color: rgba(79, 188, 252, 1);
      }
    &.select {
      background: rgba(16, 162, 252, 1);
      color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>

