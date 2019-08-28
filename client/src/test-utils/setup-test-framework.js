process.env.NODE_ENV = 'test'
Object.defineProperty(HTMLMediaElement.prototype, 'duration', {
    writable: true,
    value: true
})
Object.defineProperty(HTMLMediaElement.prototype, 'paused', {
    writable: true,
    value: true
})
window.HTMLMediaElement.prototype.play = function() {
    this.paused = false
}
window.HTMLMediaElement.prototype.pause = function() {
    this.paused = true
}
