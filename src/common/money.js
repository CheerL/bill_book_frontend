import Decimal from 'decimal.js'

const Money = number => {
    if (!number) {
        return new Decimal(0)
    }
    return new Decimal((new Decimal(number)).toFixed(2))
}

export default Money