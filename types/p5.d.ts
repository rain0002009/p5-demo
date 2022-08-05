import * as p5 from 'p5'

declare module 'p5' {
    interface Element {
        position (): { x: number, y: number }

        size (): { width: number, height: number }
    }
}

class P5Element<T extends HTMLElement> extends p5.Element {
    elt: T
}
