import type P5 from 'p5'

function compareEdge (a: string, b: string) {
    return a === [...b].reverse().join('')
}

enum EDGE {
    TOP,
    RIGHT,
    BOTTOM,
    LEFT,
}

type EDGEKey = keyof typeof EDGE

export class Tile {
    public readonly img: P5.Image | P5.Graphics
    private readonly edges: string[]
    public top: number[]
    public right: number[]
    public bottom: number[]
    public left: number[]

    constructor (img: P5.Image, edges: string[]) {
        this.img = img
        this.edges = edges
        this.top = []
        this.right = []
        this.bottom = []
        this.left = []
    }

    /**
     * 把可以做相邻块的编号添加到相应的仓库存储
     * @param tiles
     */
    analyze (tiles: Tile[]) {
        tiles.forEach((tile, index) => {
            [EDGE.TOP, EDGE.RIGHT, EDGE.BOTTOM, EDGE.LEFT].forEach((edge, edgeIndex) => {
                /**
                 * 判断上下左右边界值是否一致
                 */
                if (compareEdge(this.edges[edgeIndex], tile.edges[(edgeIndex + 2) % 4]))
                    this[EDGE[edge].toLowerCase() as Lowercase<EDGEKey>].push(index)
            })
        })
    }

    /**
     * 旋转图像和边界
     * @param sk
     * @param num
     */
    rotate (sk: P5, num: number) {
        const w = this.img.width
        const h = this.img.height
        const newSk = sk.createGraphics(w, h)
        newSk.imageMode(sk.CENTER)
        newSk.translate(w / 2, h / 2)
        newSk.rotate(sk.HALF_PI * num)
        newSk.image(this.img, 0, 0)
        const newImg = newSk.get()
        newSk.remove()
        const len = this.edges.length
        return new Tile(
            newImg,
            // 旋转边界值
            this.edges.map((item, index) => {
                return this.edges[(index - num + len) % len]
            }),
        )
    }
}
