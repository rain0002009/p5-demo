import type P5 from 'p5'
import type { P5Element } from '../../../types/p5'

function transformText (text: string) {
    return text.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')
}

function copyText2Temp (div: P5Element<HTMLDivElement>, element: P5Element<HTMLInputElement>, withSelection = false) {
    div.html('')
    div.position(element.position().x, element.position().y);
    ['font-size', 'line-height'].forEach((key) => {
        div.style(key, element.style(key))
    })
    div.size(element.size().width)
    div.style('word-break', 'break-all')
    const textIndex = element.elt.selectionStart || 0
    const innerText = element.elt.value
    const textLeft = transformText(innerText.substring(0, textIndex))
    const textRight = transformText(innerText.substring(textIndex, innerText.length))
    div.html(`${textLeft}${withSelection ? '<span id="__track__">0</span>' : ''}${textRight}`)
}

/**
 * 获取光标的坐标位置，基于window
 * @param sk
 * @param div
 * @param element
 */
function getCursorPosition (sk: P5, div: P5Element<HTMLDivElement>, element: P5Element<HTMLInputElement>) {
    div.show()
    copyText2Temp(div, element, true)
    let output = { x: 0, y: 0 }
    Array.from(div.child()).forEach((currentValue) => {
        if (currentValue.nodeType === 1 && (currentValue as HTMLSpanElement).id === '__track__') {
            output = (currentValue as HTMLSpanElement).getBoundingClientRect()
        }
    }, {})
    element.size(div.size().width, div.size().height)
    div.hide()
    return output
}

interface TextStyle {
    size?: number
    color?: P5.Color
}

type Position = ReturnType<typeof P5.Element.prototype.position>

export class P5TextInput {
    private readonly sk: P5
    private isActive: boolean
    private cursor?: [number, number]
    private position?: [number, number]
    private readonly inputBox: P5Element<HTMLInputElement>
    private readonly textStyle: TextStyle
    private text?: { offsetTop: number; data: string }[]
    private isFocus: boolean
    private canvasPosition: Position
    private readonly tempInputBox: P5Element<HTMLDivElement>

    constructor (sk: P5, canvasPosition: Position, textStyle?: TextStyle) {
        this.sk = sk
        this.isActive = false
        this.isFocus = false
        this.textStyle = {
            size: 20,
            color: sk.color(0),
        }
        this.tempInputBox = sk.createDiv()
        this.inputBox = sk.createElement('textarea')
        this.inputBox.style('opacity', '0')
        this.inputBox.style('resize', 'both')
        this.inputBox.elt.addEventListener('input', () => {
            this.setInput(this.inputBox.value() as string)
        })
        this.inputBox.elt.addEventListener('keyup', () => {
            this.getCursorPosition()
        })
        this.inputBox.elt.addEventListener('click', () => {
            this.getCursorPosition()
        })
        this.inputBox.elt.addEventListener('focus', () => {
            this.isFocus = true
        })
        Object.assign(this.textStyle, textStyle)
        this.inputBox.style('font-size', `${this.textStyle.size}px`)
        this.inputBox.style('background', 'transparent')
        this.inputBox.style('color', 'red')
        this.inputBox.style('line-height', '1')
        this.setInput('')
        this.tempInputBox.style('min-height', `${this.inputBox.size().height}px`)
        this.canvasPosition = canvasPosition
    }

    get boxSize (): [number, number] {
        const boxSize = this.inputBox.size()
        return [boxSize.width, boxSize.height]
    }

    setInput (text: string) {
        text.split(/\n/g)
        let offsetTop = 0
        this.tempInputBox.show()
        copyText2Temp(this.tempInputBox, this.inputBox)
        this.text = Array.from(this.tempInputBox.elt.childNodes)
            .map((node) => {
                if (node.nodeName === 'BR') {
                    offsetTop++
                }
                if (node.nodeType === 3) {
                    return {
                        offsetTop,
                        data: node.textContent,
                    }
                }
                return null
            })
            .filter(Boolean) as typeof this.text
        this.tempInputBox.hide()
    }

    canvas2Window (p: [number, number]) {
        return [p[0] + this.canvasPosition.x, p[1] + this.canvasPosition.y]
    }

    window2Canvas (p: [number, number]): [number, number] {
        return [p[0] - this.canvasPosition.x, p[1] - this.canvasPosition.y]
    }

    active () {
        this.isActive = true
    }

    getCursorPosition () {
        const p = getCursorPosition(this.sk, this.tempInputBox, this.inputBox)
        this.cursor = this.window2Canvas([p.x, p.y])
    }

    drawBox () {
        if (this.position) {
            const p1 = this.position.map(x => x - 2) as [number, number]
            const p2 = this.boxSize.map(x => x + 2) as [number, number]
            this.sk.rect(...p1, ...p2)
            const rightBottom = [this.position[0] + this.boxSize[0], this.position[1] + this.boxSize[1]];
            [5, 9].forEach((number) => {
                this.sk.line(rightBottom[0] - number, rightBottom[1], rightBottom[0], rightBottom[1] - number)
            })
        }
    }

    drawText () {
        if (this.text && this.position) {
            this.sk.noStroke()
            this.sk.fill(this.textStyle.color!)
            this.sk.textLeading(this.textStyle.size!)
            this.sk.textSize(this.textStyle.size!)
            this.sk.textAlign(this.sk.LEFT, this.sk.TOP)
            this.sk.textWrap(this.sk.CHAR)
            this.text.forEach((text) => {
                this.sk.text(text.data, this.position![0], this.position![1] + (this.textStyle.size! * text.offsetTop), this.boxSize[0])
            })
        }
    }

    draw () {
        if (this.isActive) {
            this.sk.cursor(this.sk.TEXT)
            if (this.cursor) {
                this.sk.stroke(this.textStyle.color!)
                this.sk.strokeWeight(1)
                this.sk.noFill()
                this.drawBox()
                this.sk.line(...this.cursor, this.cursor[0], this.cursor[1] + this.textStyle.size!)
                this.drawText()
            }
        }
    }

    handleClick () {
        if (!this.isFocus) {
            this.cursor = [this.sk.mouseX, this.sk.mouseY]
            this.position = [...this.cursor]
            this.inputBox.elt.focus()
            this.inputBox.position(...this.canvas2Window(this.cursor))
        }
    }
}
