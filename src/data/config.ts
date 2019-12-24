/**
 * Created by Xd on 2019/11/27.
 */

/*
 * type: 组件名称 （HTML标签）
 * elType: 组件类型 (属性)
 * options: 配置项
 * children: 嵌套组件
 * qualification: 条件  值为:'limit'限定
 * plotArea: 模板  1/头部/侧边栏（左）/主体区域
 **/

const titleObj: any = {
  edit: "标题编辑",
  placeholder: "占位内容",
  check: "校验",
  sort: "排序方式",
  option: "选项",
  search: "是否可搜索",
  maxValue: "最大值",
  minValue: "最小值",
  step: "步数"
};

export const basicComponents: Array<any> = [
  {
    types: "components",
    list: [
      {
        title: "基础字段",
        groupName: "dragEl",
        list: [
          {
            type: "Input",
            elName: "input",
            name: "单行文本",
            icon: "icon-input",
            options: {
              width: "100%",
              defaultValue: "",
              required: false,
              dataType: "string",
              pattern: "",
              placeholder: "",
              disabled: false
            },
            right: {
              component: "fieldsInput"
            },
            rules: []
          },
          {
            type: "Input",
            elName: "input",
            name: "多行文本",
            icon: "icon-diy-com-textarea",
            options: {
              elType: "textarea",
              width: "100%",
              defaultValue: "",
              required: false,
              disabled: false,
              pattern: "",
              placeholder: ""
            },
            right: {
              component: "fieldsTextareaInput"
            }
            // right: [
            //   {
            //     title: titleObj["edit"],
            //     type: "Input",
            //     options: {
            //       defaultValue: ""
            //     }
            //   },
            //   {
            //     title: titleObj["placeholder"],
            //     type: "Input",
            //     options: {
            //       defaultValue: ""
            //     }
            //   },
            //   {
            //     title: titleObj["check"],
            //     type: "Checkbox",
            //     check: "必填",
            //     options: {
            //       defaultValue: ""
            //     }
            //   }
            // ]
          },
          {
            type: "InputNumber",
            elName: "input-number",
            name: "计数器",
            icon: "icon-number",
            options: {
              width: "",
              required: false,
              defaultValue: 0,
              min: 0,
              max: 0,
              step: 1, // 步长
              disabled: false,
              controlsPosition: ""
            },
            right: {
              component: "fieldsInputNumber"
            }
            // right: [
            //   {
            //     title: titleObj["edit"],
            //     type: "Input",
            //     options: {
            //       defaultValue: ""
            //     }
            //   },
            //   {
            //     title: titleObj["maxValue"],
            //     type: "InputNumber",
            //     options: {
            //       defaultValue: ""
            //     }
            //   },
            //   {
            //     title: titleObj["minValue"],
            //     type: "InputNumber",
            //     options: {
            //       defaultValue: ""
            //     }
            //   },
            //   {
            //     title: titleObj["step"],
            //     type: "InputNumber",
            //     options: {
            //       defaultValue: ""
            //     }
            //   },
            //   {
            //     title: titleObj["check"],
            //     type: "Checkbox",
            //     options: {
            //       defaultValue: ""
            //     }
            //   }
            // ]
          },
          {
            type: "RadioGroup",
            elName: "radio-group",
            name: "单选框组",
            icon: "icon-radio-active",
            options: {
              inline: false,
              defaultValue: "",
              showLabel: false,
              required: false,
              width: "",
              remote: false,
              remoteOptions: [],
              dictionaryId:"", // 字典id
              props: {
                value: "value",
                label: "label"
              },
              remoteFunc: "",
              disabled: false
            },
            children: {
              type: "Radio",
              elName: "radio",
              options: [
                {
                  value: "选项1",
                  label: "选项1",
                  key: Date.now() + 1
                },
                {
                  value: "选项2",
                  label: "选项2",
                  key: Date.now() + 2
                },
                {
                  value: "选项3",
                  label: "选项3",
                  key: Date.now() + 3
                }
              ]
            },
            right: {
              component: "fieldsRadioGroup"
            }
          },
          {
            type: "CheckboxGroup",
            elName: "checkbox",
            name: "多选框组",
            icon: "icon-check-box",
            options: {
              inline: false,
              defaultValue: [],
              showLabel: false,
              required: false,
              width: "",
              remote: false,
              remoteOptions: [],
              dictionaryId:"", // 字典id
              props: {
                value: "value",
                label: "label"
              },
              remoteFunc: "",
              disabled: false
            },
            children: {
              type: "Checkbox",
              options: [
                {
                  label: "选项1",
                  value: "选项1"
                },
                {
                  label: "选项2",
                  value: "选项2"
                },
                {
                  label: "选项3",
                  value: "选项3"
                }
              ]
            },
            right: { component: "fieldsCheckboxGroup" },
            elUi: [
              {
                title: titleObj["edit"],
                type: "Input",
                options: {
                  defaultValue: ""
                }
              },
              {
                title: "排序方式",
                type: "RadioGroup",
                options: {
                  defaultValue: ""
                },
                children: {
                  type: "RadioButton",
                  option: [
                    {
                      label: 1,
                      value: "纵向"
                    },
                    {
                      label: 2,
                      value: "横向"
                    }
                  ],
                  defaultValue: ""
                }
              },
              {
                title: "选项",
                type: "Input",
                operat: {
                  icon: ["icon"]
                },
                features: [
                  {
                    title: "添加选项",
                    type: "Button"
                  }
                ]
              }
            ]
          },
          {
            type: "DatePicker",
            elName: "date",
            name: "日期时间",
            icon: "icon-date",
            options: {
              defaultValue: "",
              readonly: false,
              disabled: false,
              editable: true,
              clearable: true,
              placeholder: "",
              startPlaceholder: "",
              endPlaceholder: "",
              // type: "date",
              format: "yyyy-MM-dd",
              timestamp: false,
              required: false,
              width: "",
              elType: "date"
            },
            right: {
              component: "fieldsDatePicker"
            }
          },
          {
            type: "Select",
            elName: "select",
            name: "下拉选择框",
            icon: "icon-select",
            options: {
              defaultValue: "",
              multiple: false, // 多选
              disabled: false,
              clearable: false, // 清空
              placeholder: "",
              required: false,
              showLabel: false,
              width: "",
              remote: false, // 远程搜索  filterable和remote 同时为true
              filterable: false, // 搜索
              remoteOptions: [],
              dictionaryId:"", // 字典id
              props: {
                value: "value",
                label: "label"
              },
              remoteFunc: ""
            },
            children: {
              type: "Option",
              elName: "option",
              options: [
                {
                  value: "下拉框1",
                  label: "",
                  key: Date.now() + 1
                },
                {
                  value: "下拉框2",
                  label: "",
                  key: Date.now() + 2
                },
                {
                  value: "下拉框3",
                  label: "",
                  key: Date.now() + 3
                }
              ]
            },
            right: {
              component: "fieldsSelect"
            }
          }
        ]
      }
    ]
  },
  {
    types: "components",
    list: [
      {
        title: "高级字段",
        groupName: "dragEl",
        list: [
          {
            type: "Cascader",
            name: "级联选择器",
            icon: "icon-cascader",
            options: {
              defaultValue: [],
              showAllLevels: true, // 只显示最后一级
              filterable: false, // 搜索
              placeholder: "",
              dictionaryId:'',  // 字典ID
              props: {
                multiple: false, // 单选任意一级
                checkStrictly: false // 多选任意一级
              },
              options: [
                {
                  id: 1,
                  value: "1",
                  label: "一级",
                  edit: false,
                  children: [
                    {
                      id: 2,
                      value: "2",
                      label: "二级",
                      edit: false,
                      children: [
                        { id: 3, value: "3", label: "二级1", edit: false },
                        {
                          id: 4,
                          value: "4",
                          label: "二级2",
                          edit: false
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            right: {
              component: "fieldsCascader"
            }
          },
          {
            type: "TimeLine",
            name: "时间轴",
            icon: "icon-timeLine",
            options: {
              defaultValue: {
                begin: "1",
                nowYear: new Date().getFullYear(),
                select: 0,
                type: "date",
                month: new Date().getMonth() + 1,
                week: "",
                year: new Date().getFullYear(),
                years: {
                  begin: 0,
                  now: 0
                },
                months: {
                  begin: 0,
                  now: 0
                },
                days: {
                  begin: 0,
                  now: 0
                },
                nowWeek: "",
                defaultNum: 8
              },
              placeholder: "",
              format: "yyyy 年 MM 月 dd 日",
              valueFormat: "yyyy-M-d"
            },
            right: {
              component: "fieldsTimeLine"
            }
          },
          {
            type:'UlList',
            name: '列表',
            icon: "icon-ulList",
            options:{
              options:[{
                label: "时间",
                value: "time"
              },{
                label: "类型",
                value: "type"
              }
              ],
              placeholder:'',
              showListHeader:true, // 显示表头 false 不显示  true 显示
              defaultValue:[{
                id: 1,
                time: '2018-12-36',
                type: "中医诊断",
                abc:'1231211'
              },
                {
                  id: 2,
                  time: '2018-12-36',
                  type: "中医诊断",
                  abc:123
                }]
              },
            right: {
              component: "fieldsulList"
            }
          },
          {
            name:'处方',
            type:'Prescription',
            icon:'icon-prescription',
            options: {
              defaultValue:'',
              // dictionaryId:[]
              filter1Dictionary:'',
              projectDictionary:''
            },
            right: {
              component: "fieldsPrescription"
            }
          },
          {
            name:'处置',
            type:'Dispose',
            icon:'icon-dispose',
            options: {
              defaultValue:'',
              // dictionaryId:[]
              filter1Dictionary:'',
              projectDictionary:''
            },
            right: {
              component: "fieldsDispose"
            }
          }
        ]
      }
    ]
  }
];
export const layoutComponents: any = [
  {
    types: "",
    list: [
      {
        title: "布局",
        groupName: "dragEl",
        list: [
          {
            name: "高级布局2",
            types: "container",
            qualification: "limit",
            url: "Layout01_Normal",
            plotArea: "senior1",
            columns: [
              {
                type: "Container",
                list: [],
                className: "is-vertical",
                children: [
                  {
                    type: "Header",
                    groupName: "dragComposition",
                    list: [],
                    connect: " ",
                    style: {
                      // 外层容器样式
                      // background: "#E4F4FE",
                      minHeight: "60px",
                      // color: "#fff",
                      height:'auto',
                      fontSize: "16px",
                      fontWeight: 500
                    },
                    options: {
                      // 拖拽元素样式
                      display: "inline-block",
                      minWidth: "100px",
                      padding:'0 5px',
                      lineHeight: "50px",
                      textAlign: "center",
                      background: "#fff",
                      marginRight: "4px",
                      borderRight: "1px solid #e9eef3"
                    }
                  },
                  {
                    type: "Container",
                    list: [],
                    children: [
                      {
                        type: "Aside",
                        groupName: "dragComposition",
                        list: [],
                        connect: " ",
                        style: {
                          position: "relative",
                          // background: "#E4F4FE",
                          minWidth: "224px",
                          // color: "#fff",
                          fontSize: "16px",
                          marginRight: "8px",
                          fontWeight: 500
                        },
                        options: {
                          display: "block",
                          marginTop: "8px",
                          height: "50px",
                          lineHeight: "50px",
                          background: "#fff",
                          borderBottom: "1px solid #e9eef3"
                        }
                      },
                      {
                        type: "Main",
                        list: [],
                        connect: " ",
                        style: {
                          position: "relative",
                          // background: "#E4F4FE",
                          // color: "#fff",
                          fontSize: "16px"
                        },
                        groupName: "dragComposition",
                        options: {
                          display: "block",
                          height: "50px",
                          lineHeight: "50px",
                          background: "#fff",
                          borderBottom: "1px solid #e9eef3"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "2列布局",
            types: "container",
            qualification: "limit",
            url: "Layout02_Normal",
            plotArea: "column2",
            columns: [
              {
                type: "Container",
                list: [],
                className: "",
                children: [
                  {
                    type: "Aside",
                    groupName: "dragComposition",
                    list: [],
                    connect: "",
                    style: {
                      // 外层容器样式
                      // height: "60px",
                      // color: "#fff",
                      fontSize: "16px",
                      fontWeight: 500,
                      marginRight: "8px"
                    },
                    options: {
                      // 拖拽元素样式
                      display: "inline-block",
                      width: "100%",
                      lineHeight: "50px",
                      textAlign: "center",
                      background: "#fff",
                      marginRight: "4px",
                      borderRight: "1px solid #e9eef3"
                    }
                  },
                  {
                    type: "Main",
                    list: [],
                    connect: "",
                    style: {
                      position: "relative",
                      // color: "#fff",
                      fontSize: "16px"
                    },
                    groupName: "dragComposition",
                    options: {
                      display: "block",
                      height: "50px",
                      lineHeight: "50px",
                      background: "#fff",
                      borderBottom: "1px solid #e9eef3"
                    }
                  }
                ]
              }
            ]
          },
          {
            name: "高级布局1",
            types: "container",
            qualification: "limit",
            url: "Layout03_Normal",
            plotArea: "senior2",
            columns: [
              {
                type: "Container",
                list: [],
                className: "is-vertical",
                children: [
                  {
                    type: "Header",
                    groupName: "dragComposition",
                    list: [],
                    connect: "",
                    style: {
                      // 外层容器样式
                      height:'auto',
                      minHeight: "60px",
                      // color: "#fff",
                      fontSize: "16px",
                      fontWeight: 500,
                      marginBottom: "8px"
                    },
                    options: {
                      // 拖拽元素样式
                      display: "inline-block",
                      minWidth: "100px",
                      padding:'0 5px',
                      lineHeight: "50px",
                      textAlign: "center",
                      background: "#fff",
                      marginRight: "4px",
                      borderRight: "1px solid #e9eef3"
                    }
                  },
                  {
                    type: "Main",
                    list: [],
                    connect: "",
                    style: {
                      position: "relative",
                      // color: "#fff",
                      fontSize: "16px"
                    },
                    groupName: "dragComposition",
                    options: {
                      display: "block",
                      height: "50px",
                      lineHeight: "50px",
                      background: "#fff",
                      borderBottom: "1px solid #e9eef3"
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    types: "",
    list: [
      {
        title: "元件模版",
        groupName: "dragComposition",
        list: []
      }
    ]
  }
  // {
  //   types: "",
  //   list: [
  //     {
  //       title: "按钮",
  //       groupName: "dragButton",
  //       list: [
  //         {
  //           name: "初诊完毕",
  //           icon: "icon-button"
  //         },
  //         {
  //           name: "就诊完毕",
  //           icon: "icon-button"
  //         },
  //         {
  //           name: "转介",
  //           icon: "icon-button"
  //         }
  //       ]
  //     }
  //   ]
  // }
];

export const proclayoutComponents: any = [
  {
    types: "",
    list: [
      {
        title: "辅助模板",
        groupName: "dragFeatures",
        list: []
      }
    ]
  },
  {
    types: "",
    list: [
      {
        title: "操作按钮",
        groupName: "dragButton",
        list: [{
          name: "就诊完毕",
          icon: "icon-button"
        },{
          name: "初诊完毕",
          icon: "icon-button"
        }]
      }
    ]
  }
  // {
  //   types: "",
  //   list: [
  //     {
  //       title: "按钮",
  //       groupName: "dragButton",
  //       list: [
  //         {
  //           name: "初诊完毕",
  //           icon: "icon-button"
  //         },
  //         {
  //           name: "就诊完毕",
  //           icon: "icon-button"
  //         },
  //         {
  //           name: "转介",
  //           icon: "icon-button"
  //         }
  //       ]
  //     }
  //   ]
  // }
];
