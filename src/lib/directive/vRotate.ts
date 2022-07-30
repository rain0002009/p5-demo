import type { Directive } from 'vue'

const multiple = 5

function transformElement (target: HTMLElement, x: number, y: number) {
    const box = target.getBoundingClientRect()
    const calcX = -(y - box.y - (box.height / 2)) / multiple
    const calcY = (x - box.x - (box.width / 2)) / multiple

    target.style.transform = `rotateX(${calcX}deg) `
        + `rotateY(${calcY}deg)`
}

let handleMouseOver: ((this: HTMLElement, ev: HTMLElementEventMap['mouseover']) => void) | undefined
let handleMouseLeave: ((this: HTMLElement, ev: HTMLElementEventMap['mouseleave']) => void) | undefined
let mouseOverElement: HTMLElement
let mouseLeaveElement: HTMLElement | HTMLElement[]

export const vRotate: Directive = {
    mounted (el: HTMLElement, { value, modifiers }) {
        if (modifiers.parent) {
            mouseOverElement = el
            el.style.perspective = '500px'
            el.style.transformStyle = 'preserve-3d'
            const children = Array.from(el.querySelectorAll(value))
            mouseLeaveElement = children
            handleMouseLeave = function () {
                window.requestAnimationFrame(() => {
                    this.style.transform = 'rotateX(0) rotateY(0)'
                })
            }
            handleMouseOver = ({ target, clientX, clientY }) => {
                if (children.includes(target)) {
                    window.requestAnimationFrame(() => {
                        transformElement(target as HTMLElement, clientX, clientY)
                    })
                }
            }
            mouseLeaveElement.forEach((element) => {
                element.style.transformStyle = 'preserve-3d'
                element.style.transition = 'all .1s'
                element.style.transformOrigin = 'center center'
                element.addEventListener('mouseleave', handleMouseLeave!)
            })
            mouseOverElement.addEventListener('mousemove', handleMouseOver)
        }
    },
    beforeUnmount () {
        if (mouseOverElement && handleMouseOver) {
            mouseOverElement.removeEventListener('mouseover', handleMouseOver)
            handleMouseOver = void 0
        }
        if (mouseLeaveElement && handleMouseLeave) {
            if (Array.isArray(mouseLeaveElement)) {
                mouseLeaveElement.forEach((el) => {
                    el.removeEventListener('mouseleave', handleMouseLeave!)
                })
            } else {
                mouseLeaveElement.removeEventListener('mouseleave', handleMouseLeave)
            }
            handleMouseLeave = void 0
        }
    },
}
