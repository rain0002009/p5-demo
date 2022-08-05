import type P5 from 'p5'

export function drawTextArea (sk: P5) {
    sk.line(sk.mouseX, sk.mouseY, sk.mouseX, sk.mouseY + 30)
}
