import { ref, reactive, computed, watch } from 'vue'

// states 
const id = ref(0)
const optionData = reactive({ id: -1, indexes: {}, listData:[]})
const selectedComponent = computed(() => optionData.id === -1 ? null : optionData.listData.find(i => i.id === optionData.id))
const componentDataTree = computed(() => {
  const list = optionData.listData 
  list.forEach(c => c.children = list.filter(i=> i.parentId === c.id))
  return list.filter(i=> i.parentId === -1)
})
const filterDataByRegionTrees = computed(() => {
  return regionFilters.map(i=> {
    return {
      name: i.name,
      data: componentDataTree.value.filter(j=>i.filter(j))
    }
  })
})

const regionFilters = [
  {name: '外部',filter: data => data.region === 'out' && data.position === 'top'},
  {name: '头部',filter:data=> data.region === 'head'},
  {name: '表格', filter: data=>data.region === 'main'},
  {name: '尾部',filter: data=>data.region === 'tail'},
  {name: '外部',filter: data=>data.region === 'out' && data.position === 'bottom'}
]


function getIndex(parentId) {
  if (parentId === -1) {
    return -1
  }
  const index = optionData.indexes[parentId]
  if (index > -1) {
    return index
  }
  return iterateGetIndex(parentId)
}

function iterateGetIndex(id) {
  const iterateCom = optionData.listData.find(i=>i.id === id)
  if (!iterateCom) {
    return -1
  }
  for (let i = 1; i <= calcMaxChildCount(iterateCom); i++) {
    const indexes = optionData.listData.filter(i => i.parentId === id).map(i => i.index)
    if (!indexes.includes(i)) {
      return i
    }
  }
  return -1
}

const calcMaxChildCount = com => {
  const option = com.option
  const arr = getRowBoundary(com)
  if (arr.length > 0) {
    return arr[arr.length -1]
  }
  return calcCount(option)
}

function calcCount(option) {
  return Number(option.row||0) * Number(option.column||0)
}

// functions 
const addComponent = ({ position, region }, m) => {
  if (selectedComponent.value && calcMaxChildCount(selectedComponent.value) <= selectedComponent.value.children.length) {
    console.warn('满了', selectedComponent.value.children);
    return
  }

  if (selectedComponent.value) {
    position = 'bottom'
  } else {
    if (m.type === 'table') {
      region = 'main'
      if (optionData.listData.find(i => i.region === 'main')) {
        console.warn('已经有表格了') 
        return
      }
    }
  }
  m.region = region
  m.position = position
  const parentId = optionData.id
  addComponent2Parent(parentId, position, m)
}

const addComponent2Parent = (parentId, position, m)=> {

  const com = {
    ...m,
    id: ++id.value,
    parentId,
    index: getIndex(parentId),
  }
  
  if(position === 'top') {
    optionData.listData.unshift(com)
  } else {
    optionData.listData.push(com)
  }
  chooseIndex(parentId, iterateGetIndex(parentId))
  selectComponent(com.id)
  chooseIndex(com.id, iterateGetIndex(com.id))
  completeChilds(0,com)
} 

const completeChilds = (start,com) => {
  if (com.type === 'table') {
    for (let i = start; i < calcMaxChildCount(com); i++) {
      addComponent2Parent(com.id, 'bottom', menuToCom(findMenu('单元格')))
    }
  }
}

const replaceComponent = (id, com) => {
  const component = optionData.listData.find(i => i.id === id)
  Object.assign(component, { ...com, children: [] })
  optionData.listData.filter(i=>i.parentId === id).forEach(i=>removeComponent(i.id))
}

const selectComponent = id => {
  optionData.indexes[optionData.id] = -1 
  optionData.id = optionData.id === id ? -1 : id
}

const removeComponent = id => {
  if (id === optionData.id) {
    optionData.id = -1
  }
  const index = optionData.listData.findIndex(i => i.id === id)
  if (index !== -1) {
    const removedComponent = optionData.listData.find(i => i.id === id)
    removedComponent.children.forEach(j=>removeComponent(j.id))
    optionData.listData.splice(index, 1);
  }
  if (optionData.indexes[optionData.id] === -1) {
    chooseIndex(optionData.id, iterateGetIndex(optionData.id)) 
  }
}

const chooseIndex = (id, index) => {
  if(optionData.id !== id) {
    selectComponent(id)
  }
  optionData.indexes[id] = optionData.indexes[id] === index ? -1 : index
}

const getRowBoundary = data => {
  let res = []
  const children = data.children
  if (children?.length > 0) {
    let i = 0;
    const arr = children.map(i => {
      return {
        index: i.index,
        length: i.option.spanCol,
      }
    })
    const count = calcCount(data.option)
    // grid/line 计算之前补上空的
    for (let i = 1; i <= count; i++) {
      if (arr.filter(j => j.index <= i && j.index + j.length >= i + 1).length === 0) {
        arr.push({index: i,length: 1})
      } 
    }

    arr.sort((a,b) => a.index - b.index).forEach(k => {
      i += k.length || 1
      for (let j = 1; j <= data.option.row; j++) {
        if (i <= data.option.column * j && i > data.option.column * (j - 1)) {
          res[j-1] = k.index
        }
      }
    })
  }

  return res
}

const convertStruct = obj => {
  if (Array.isArray(obj)) {
    return obj.map(i => convertStruct(i))
  } else {
    const com = obj;
    const isText = ['label','table_cell'].includes(com.type)
    return {
      type: com.type,
      columnSpannedNumber: com.option.row,
      column: com.option.column,
      row: com.option.row,
      text: isText ? com.option.label !== '' && com.option.text !== '' ?
        (com.option.label + "：" + com.option.text) :
        (com.option.label !== '' ? com.option.label : com.option.text) : '',
      style: {
        text: isText ? {
          textAlign: com.option.textAlign,
          font: {
            size: com.option.fontSize + 'pt',
            weight: com.option.fontWeight
          }
        } : {}
      },
      contents: convertStruct(com.children)
    }
  }
}

const generateJson = () => {
  const list = filterDataByRegionTrees.value
  console.log(list)
  // 补全空并控制line/grid边界 TODO

  const top = {
    type: 'grid',
    row: 1,
    contents: convertStruct(list.find(i=>i.name === '头部').data)
  }
  top.column = top.contents.length;

  const bottom = {
    type: 'grid',
    row: 1,
    contents: convertStruct(list.find(i=>i.name === '尾部').data)
  }
  bottom.column = bottom.contents.length

  const out = convertStruct(list.filter(i => i.name === '外部').map(i => i.data).flatMap(i=>i))

  const table = list.find(i=>i.name === '表格').data[0]

  const boudnary = getRowBoundary(table)
  
  const header = convertStruct(table.children.slice(0, boudnary[0]))
  const body = convertStruct(table.children.slice(boudnary[0] - 1, boudnary[1]))
  const footer = convertStruct(table.children.slice(boudnary[1] - 1, boudnary[2]))

  return {
    code: 'SALE_DEFAULT',
    name: '销售模板',
    content: {
      type: 'page',
      style: {
        "height": "297mm",
        "width": "210.0mm",
        "font": {
          "size": "12.0pt"
        },
        "margin": {
          "top": "0.0mm",
          "right": "10.0mm",
          "bottom": "0.0mm",
          "left": "20.0mm"
        }
      },
      regionBody: [
        ...out,
        {
          type: 'table',
          rowNumber: table.option.row,
          dataSource: {
            type: 'APPLICATION',
            scope: 'LIST',
            enitty: 'detailList'
          },
          top,
          bottom,
          header,
          footer,
          body,
          style: {}
        }
      ]
    }
  }
}

export function useOptionData() {
  return {
    id,
    optionData,
    selectedComponent,
    filterDataByRegionTrees,

    addComponent,
    selectComponent,
    replaceComponent,
    removeComponent,
    chooseIndex,

    completeChilds,
    getRowBoundary,

    calcMaxChildCount,
    generateJson
  }
}


const menus = [
  { name: 'label', label: '标签', option: {label: '', text: '',textAlign:'center', fontSize: 10,fontWeight: 400, spanCol: 1} },
  { name: 'grid', label: '行', option: {row: 1, column: 2, fixedRow:true,spanCol: 1} },
  { name: 'grid', label: '栅格', option: {row: 2, column: 3,spanCol: 1} },
  { name: 'table', label: '表格', option: {row: 3, column: 8, fixedRow: true} },
  { name: 'table_cell', label: '单元格', option:{label: '', text: '',textAlign:'center', fontSize: 10,fontWeight: 400, spanCol: 1, spanRow: 1}}
]
function menuToCom(menu) {
  return {
    option: {...menu.option},
    type: menu.name,
    typeName: menu.label
  }
}
const findMenu = label => menus.find(i=>i.label === label)

export function useMenuData() {
  return {menus, findMenu,menuToCom}
}