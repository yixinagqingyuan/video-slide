import Yvideo from './video.vue'
import Yslide from './slide.vue'
function install(app) {
    app.component('Yslide', Yslide)
    app.component('Yvideo', Yvideo)
}
export { Yvideo, Yslide }
export default {
    install
}