const initBillbooks = [
    {
        id: '000',
        name: '日常哈哈哈',
        remark: '日常账本啦啦啦',
        status: 1,
        cover: 'default',
        default: true
    },
    {
        id: '001',
        name: '旅行',
        remark: '',
        status: 1,
        cover: 'default',
        default: false
    },
    {
        id: '002',
        name: '香港',
        remark: '港币账本',
        status: 1,
        cover: 'default',
        default: false
    }
]

const BillbookStoreCreater = billbook => {
    const store = {
        id: billbook.id,
        name: billbook.name,
        remark: billbook.remark ? billbook.remark : '',
        status: billbook.status,
        cover: billbook.cover ? billbook.cover : 'default',
        default: billbook.default
    }
    return store
}

const BillbookListStoreCreater = initValue => {
    const store = {
        billbooks: initValue.map(billbook => BillbookStoreCreater(billbook)),
        get defaultBillbook() {
            return this.billbooks.find(billbook => billbook.default)
        },
        addBillbook(billbook) {
            const billbookStore = BillbookStoreCreater(billbook)
            this.billbooks.push(billbookStore)
        },
        removeBillbook(billbookStore) {
            this.billbooks.remove(billbookStore)
        },
        getBillbook(id) {
            return this.billbooks.find(billbook => billbook.id === id)
        }
    }
    return store
}

export default BillbookListStoreCreater(initBillbooks)