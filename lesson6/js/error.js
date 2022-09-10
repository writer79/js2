Vue.component("error", {

    template: `
            <div class="error" v-if="$root.error">
                <h2>Неверный URL</h2>
                <button @click="$root.error = !$root.error">OК</button>
            </div>`
}); 