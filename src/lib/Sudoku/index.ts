import type P5 from 'p5'
import { Cell, findRelativeGrid } from './Cell'

const selectColor = '#7dd3fc'

export function drawSudoku (sk: P5) {
    const grids: Cell[] = []
    let selectedCell: Cell | undefined
    let isStart = false

    /**
     * 回溯
     */
    function backTracking () {
        for (let index = 0; index < grids.length; index++) {
            const current = grids[index]
            if (current.isDone)
                continue
            for (let val = 1; val <= 9; val++) {
                if (current.check(grids).includes(val)) {
                    current.play(val, sk.color('#6ee7b7'), index)
                    if (backTracking()) {
                        return true
                    }
                    current.play()
                }
            }
            return false
        }
        return true
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
            backTracking()
            if (grids.filter(cell => cell.isDone).length === 0)
                isStart = false
        }
    }

    /**
     * 点击高亮
     */
    sk.mouseClicked = () => {
        grids.forEach((cell) => {
            cell.setBackground(undefined)
            selectedCell = void 0
        })
        grids.forEach((cell) => {
            if (cell.isInSide(sk)) {
                cell.setBackground(sk.color(selectColor))
                selectedCell = cell
                findRelativeGrid(cell, grids).forEach((cell) => {
                    cell.setBackground(sk.color(selectColor), 120)
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
            grids.forEach((cell) => {
                cell.setBackground(undefined)
            })
        },
        handleReset () {
            isStart = false
            sk.setup()
        },
    }
}
