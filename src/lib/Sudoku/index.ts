import type P5 from 'p5'
import { Cell } from './Cell'

export function drawSudoku (sk: P5) {
    const grids: Cell[] = []
    let selectedCell: Cell | undefined
    let isStart = false

    function checkNext (index: number, arr: Cell[]) {
        if (arr.length === 0) {
            isStart = false
            return true
        }
        const nextCell = arr[index]
        if (!nextCell)
            return true
        for (let i = 0; i <= 9; i++) {
            if (nextCell.check(findRelativeGrid(nextCell)).includes(i)) {
                nextCell.setNum(i)
                if (checkNext(index + 1, arr)) {
                    return true
                } else {
                    nextCell.setNum(undefined)
                }
            }
        }
        return true
    }

    function findRelativeGrid (current: Cell) {
        const out: Cell[] = []
        grids.forEach((cell) => {
            if (current.index === cell.index)
                return null
            if (current.row === cell.row) {
                out.push(cell)
                return null
            }
            if (current.col === cell.col) {
                out.push(cell)
                return null
            }
            if (current.areaIndex === cell.areaIndex) {
                out.push(cell)
                return null
            }
        })
        return out
    }

    sk.setup = () => {
        sk.createCanvas(910, 910)
        grids.splice(0)
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++)
                grids.push(new Cell(row, col))
        }
    }

    sk.draw = () => {
        sk.translate(5, 5)
        sk.clear(0, 0, 0, 0)
        grids.forEach((cell) => {
            cell.draw(sk)
        })
        if (isStart) {
            const arr = grids.filter(cell => !cell.isDone)
            checkNext(0, arr)
        }
    }

    /**
     * 点击高亮
     */
    sk.mouseClicked = () => {
        grids.forEach((cell) => {
            cell.setSelected(false)
            cell.setIsSelectedInRange(false)
            selectedCell = void 0
        })
        grids.forEach((cell) => {
            if (cell.isInSide(sk)) {
                cell.setSelected(true)
                selectedCell = cell
                findRelativeGrid(cell).forEach((cell) => {
                    cell.setIsSelectedInRange(true)
                })
            }
        })
        return false
    }

    /**
     * 输入数字
     */
    sk.keyPressed = () => {
        if (selectedCell) {
            if (/Backspace|Delete/.test(sk.key)) {
                selectedCell.setNum(undefined)
            }
            if (/[1-9]/.test(sk.key)) {
                selectedCell.setNum(+sk.key)
            }
        }
    }
    return {
        handleStart () {
            isStart = true
        },
        handleReset () {
            isStart = false
            sk.setup()
        },
    }
}
