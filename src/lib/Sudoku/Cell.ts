import type P5 from 'p5'
import { difference, range } from 'lodash-es'
import { EDGES } from '../types'

const selectColor = '#7dd3fc'

export class Cell {
    private num?: number
    public readonly row: number
    public readonly col: number
    static size = 100
    private isSelected: boolean
    private readonly x: number
    private readonly y: number
    private edge: [boolean, boolean, boolean, boolean]
    public index: number
    public areaIndex: number
    private isSelectedInRange: boolean

    constructor (row: number, col: number, num?: number) {
        this.num = num
        this.row = row
        this.col = col
        this.isSelected = false
        this.isSelectedInRange = false
        this.x = this.col * Cell.size
        this.y = this.row * Cell.size
        this.edge = [this.row % 3 === 0, this.col === 8, this.row === 8, this.col % 3 === 0]
        this.index = this.col + this.row * 9
        this.areaIndex = (this.col / 3 >> 0) + (this.row / 3 >> 0) * 3 + 1
    }

    get isDone () {
        return this.num
    }

    setNum (num: number | undefined) {
        this.num = num
    }

    setSelected (status: boolean) {
        this.isSelected = status
    }

    setIsSelectedInRange (status: boolean) {
        this.isSelectedInRange = status
    }

    isInSide (sk: P5) {
        const mouseX = sk.mouseX
        const mouseY = sk.mouseY
        return (mouseX >= this.x && mouseX <= (this.x + Cell.size)) && (mouseY >= this.y && (mouseY <= this.y + Cell.size))
    }

    check (arr: Cell[]) {
        return difference(range(1, 10), arr.map(cell => cell.isDone))
    }

    draw (sk: P5) {
        sk.cursor(sk.HAND)
        if (this.isSelected || this.isSelectedInRange) {
            const color = sk.color(selectColor)
            if (this.isSelectedInRange)
                color.setAlpha(120)
            sk.fill(color)
            sk.noStroke()
            sk.rect(this.x + 1, this.y + 1, Cell.size - 1, Cell.size - 1)
        } else {
            sk.noFill()
        }
        sk.strokeWeight(2)
        const x1 = this.x
        const y1 = this.y
        const x2 = x1 + Cell.size
        const y2 = y1 + Cell.size
        this.edge.forEach((hasEdge, index) => {
            sk.stroke(hasEdge ? '#000' : '#eee')
            if ((index === EDGES.top) && hasEdge)
                sk.line(x1, y1, x2, y1)
            if ((index === EDGES.right))
                sk.line(x2, y1, x2, y2)
            if ((index === EDGES.bottom))
                sk.line(x1, y2, x2, y2)
            if ((index === EDGES.left) && hasEdge)
                sk.line(x1, y1, x1, y2)
        })
        if (this.num) {
            sk.noStroke()
            sk.fill(this.num ? '#000' : '#f43f5e')
            sk.textSize(30)
            sk.textAlign(sk.CENTER, sk.CENTER)
            sk.text(this.num, x1 + 50, y1 + 50)
        }
    }
}
