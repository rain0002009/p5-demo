import type P5 from 'p5'
import { intersection, range, remove } from 'lodash-es'
import { Tile } from './Tile'
import { Cell } from './Cell'

export function drawWithWaveFunctionCollapse (
    sk: P5,
    imageUrls: string[],
    edges: ([[string, string, string, string], number[]])[],
    dom: HTMLElement | undefined,
    DIM: number,
) {
    const tiles: Tile[] = []
    const grids: Cell[] = []
    const tileImages: P5.Image[] = []

    function startOver () {
        for (let row = 0; row < DIM; row++) {
            for (let col = 0; col < DIM; col++) {
                const index = col + row * DIM
                grids[index] = new Cell(tiles.length, row, col)
            }
        }
    }

    sk.preload = () => {
        imageUrls.forEach((url) => {
            const image = sk.loadImage(url)
            tileImages.push(image)
        })
    }

    sk.setup = () => {
        sk.createCanvas(dom!.clientWidth, dom!.clientHeight)
        sk.background(0)
        tileImages.forEach((image, index) => {
            const tile = new Tile(image, edges[index][0])
            tiles.push(tile)
            edges[index][1].forEach((item) => {
                tiles.push(tile.rotate(sk, item))
            })
        })
        tiles.forEach((title) => {
            title.analyze(tiles)
        })
        startOver()
    }

    sk.draw = () => {
        sk.background(0)
        const w = sk.width / DIM
        const h = sk.height / DIM
        grids.forEach((cell) => {
            if (cell.collapsed) {
                const index = cell.options[0]
                sk.image(tiles[index].img, cell.col * w, cell.row * h, w, h)
            } else {
                sk.noFill()
                sk.stroke(255, 0, 0)
                sk.rect(cell.col * w, cell.row * h, w, h)
            }
        })

        /**
         * 获取可选项最少的数组
         */
        const gridCopy = grids.filter(item => !item.collapsed)
        if (gridCopy.length === 0) {
            sk.noLoop()
            return
        }
        gridCopy.sort((a, b) => {
            return a.options.length - b.options.length
        })
        remove(gridCopy, (item) => {
            return item.options.length > gridCopy[0].options.length
        })

        /**
         * 从数组中随机选取一个
         */
        const cell = sk.random(gridCopy)
        cell.collapsed = true
        const pick = sk.random(cell.options)
        if (!pick) {
            startOver()
            return
        }
        cell.options = [pick]

        /**
         * 重新计算剩余格子的可选项
         */
        grids
            .filter(cell => !cell.collapsed)
            .forEach((cell) => {
                const validOptions: number[][] = [[], [], [], []]
                let options = range((tiles.length))
                // 检测上
                if (cell.row > 0) {
                    const up = grids[cell.col + (cell.row - 1) * DIM]
                    for (const option of up.options) {
                        const valid = tiles[option].bottom
                        validOptions[0] = validOptions[0].concat(valid)
                    }
                    options = intersection(options, validOptions[0])
                }
                // 检测右
                if (cell.col < DIM - 1) {
                    const right = grids[cell.col + 1 + cell.row * DIM]
                    for (const option of right.options) {
                        const valid = tiles[option].left
                        validOptions[1] = validOptions[1].concat(valid)
                    }
                    options = intersection(options, validOptions[1])
                }
                // 检测下
                if (cell.row < DIM - 1) {
                    const down = grids[cell.col + (cell.row + 1) * DIM]
                    for (const option of down.options) {
                        const valid = tiles[option].top
                        validOptions[2] = validOptions[2].concat(valid)
                    }
                    options = intersection(options, validOptions[2])
                }
                // 检测左
                if (cell.col > 0) {
                    const left = grids[cell.col - 1 + cell.row * DIM]
                    for (const option of left.options) {
                        const valid = tiles[option].right
                        validOptions[3] = validOptions[3].concat(valid)
                    }
                    options = intersection(options, validOptions[3])
                }
                cell.options = options
            })
    }
}
