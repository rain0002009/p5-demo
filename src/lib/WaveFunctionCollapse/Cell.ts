import { range } from 'lodash-es'

export class Cell {
    public collapsed: boolean
    public options: number[]
    public row: number
    public col: number

    constructor (options: number | number[], row: number, col: number) {
        this.collapsed = false
        this.row = row
        this.col = col
        this.options = Array.isArray(options) ? options : range(options)
    }
}
