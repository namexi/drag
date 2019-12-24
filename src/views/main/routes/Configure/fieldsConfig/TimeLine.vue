<template>
    <ksaas-config-item :data="data" :required="true">
        <el-form-item label="类型">
            <el-select v-model="data.options.defaultValue.type" @change="handletype">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                >
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="时间范围">
            起：
            <el-date-picker
                    v-model="value1"
                    :type="data.options.defaultValue.type"
                    placeholder="选择日期"
                    :format="data.options.defaultValue.format"
                    @change="handleBeginChange"
                    value-format="yyyy-M-d"
                    ref="datePicker"
                    >
            </el-date-picker>
            止：
            <el-date-picker
                    v-model="value2"
                    :type="data.options.defaultValue.type"
                    placeholder="选择日期"
                    :format="data.options.defaultValue.format"
                    @change="handleNowChange"
                    value-format="yyyy-M-d"
                    ref="datePicker"
            >
            </el-date-picker>
        </el-form-item>
    </ksaas-config-item>
</template>

<script>
    export default {
        name: "fieldsTimeLine",
        props: ["data"],
        data(){
            return{
                options: [
                    {
                        value: "year",
                        label: "年"
                    },
                    {
                        value: "month",
                        label: "月"
                    },
                    {
                        value: "date",
                        label: "周"
                    }
                ],
                value1: '',
                value2: '',
            }
        },
        methods:{
            handletype(v){
                if (v === 'month') {
                    // this.data.options.defaultValue.begin = 1;
                    this.data.options.defaultValue.nowYear = 12;
                    this.data.options.defaultValue.valueFormat = 'yyyy-M';
                    this.value1 = ''
                    this.value2 = ''
                }
                if (v === 'year') {
                    this.data.options.defaultValue.nowYear = new Date().getFullYear()
                    this.data.options.defaultValue.valueFormat = 'yyyy';
                    this.value1 = ''
                    this.value2 = ''

                }
                if (v === "date") {
                    // this.data.options.defaultValue.begin = 1;
                    this.data.options.defaultValue.nowYear = 53;
                    this.data.options.defaultValue.valueFormat = 'yyyy-M-d';
                    this.value1 = ''
                    this.value2 = ''
                }
            },
            handleBeginChange(v){
              if (v) {
                  const  dateArr = v.split('-');
                  let year = Number(dateArr[0]);
                  let month = dateArr[1];
                  let day = Number(dateArr[2])
                  if (this.data.options.defaultValue.type === 'date') {
                      // this.data.options.defaultValue.now = false
                      // 第一周
                      let week = 1
                      this.data.options.defaultValue.begin = "1";
                      // 一年有多少天
                      this.data.options.defaultValue.years.begin = year
                      this.data.options.defaultValue.year = year;
                      // 是否为闰年
                     // let isLeap = (0===year%4) && (0===year%100) || (0==year%400);
                     // let yearDays = isLeap? 366: 365;
                      // 一年有多少周
                      // let yearsWeek = Math.ceil(yearDays/7);
                      // 一个月有多少天
                      this.data.options.defaultValue.months.begin = month
                    //  let monthDays= month == 2? (isLeap? 29:28) : (month == 4 || month == 6 ||month == 9|| month == 11)? 30: 31;
                      // 当前选择天数

                      this.data.options.defaultValue.days.begin = day
                      // 这天在第几周
                     // week = Math.ceil((month*monthDays - (monthDays-day - 1)) / 7);
                      // this.data.options.defaultValue.nowYear = week;
                      // if (week > yearsWeek) {
                      //     this.data.options.defaultValue.now = true
                      // }

                      // this.data.options.defaultValue.month = v.getMonth()+1;
                      // this.data.options.defaultValue.year = v.getFullYear()
                      // const year = v.getFullYear(); // 当前年
                      // const month = v.getMonth()+1; // 当前月
                      // const day = v.getDate(); // 当前月的多少日
                      // const time = v.getTime(); // 当前时间
                      // console.log(v.toLocaleDateString())
                  }
                  if (this.data.options.defaultValue.type === 'month') {
                      this.data.options.defaultValue.years.begin = year
                      this.data.options.defaultValue.months.begin = month
                  }
                  if (this.data.options.defaultValue.type === 'year') {
                      this.data.options.defaultValue.years.begin = year
                  }
              } else this.data.options.defaultValue = {
                  ...this.data.options.defaultValue,
                  begin: "1",
                  nowYear: new Date().getFullYear(),
                  years:{
                      begin: 0,
                      now:0
                  },
                  months:{
                      begin: 0,
                      now:0
                  },
                  days:{
                      begin: 0,
                      now:0
                  }
              }
            },
            handleNowChange(v){
                if (v) {
                    const  dateArr = v.split('-');
                    let year = Number(dateArr[0]);
                    let month = dateArr[1]
                    let day = Number(dateArr[2])
                    if (this.data.options.defaultValue.type === 'date') {
                        this.data.options.defaultValue.years.now = year;
                        this.data.options.defaultValue.months.now = month;
                        this.data.options.defaultValue.days.now = day
                    }
                    if (this.data.options.defaultValue.type === 'month') {
                        // const  dateArr = v.split('-');
                        // let year = Number(dateArr[0]);
                        this.data.options.defaultValue.years.now = year

                        // let month = dateArr[1];
                        this.data.options.defaultValue.months.now = month
                    }
                    if (this.data.options.defaultValue.type === 'year') {
                        this.data.options.defaultValue.years.now = year
                    }
                } else this.data.options.defaultValue = {
                    ...this.data.options.defaultValue,
                    begin: "1",
                    nowYear: new Date().getFullYear(),
                    years:{
                        begin: 0,
                        now:0
                    },
                    months:{
                        begin: 0,
                        now:0
                    },
                    days:{
                        begin: 0,
                        now:0
                    }
                }


            }
        }
    }
</script>

<style scoped>

</style>
