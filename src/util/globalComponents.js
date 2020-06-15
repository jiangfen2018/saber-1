import input from "@/components/custom-ui/input";
import select from "@/components/custom-ui/select";
import field from "@/components/custom-ui/field";
import pagination from "@/components/custom-ui/pagination";
import button from "@/components/custom-ui/button";
import line from "@/components/custom-ui/line";
import tabs from "@/components/custom-ui/tabs";
import selectConect from "@/components/custom-ui/selectConect";
import searchStyle01 from "@/components//searchStyle01";
import searchStyle02 from "@/components//searchStyle02";
import searchStyle03 from "@/components//searchStyle03";
function plugin(Vue) {
    if (plugin.installed) {
        return
    }
    Vue.component('cinput', input)
    Vue.component('cselect', select)
    Vue.component('cfield', field)
    Vue.component('cpagination', pagination)
    Vue.component('cbutton', button)
    Vue.component('cline', line)
    Vue.component('ctabs', tabs)
    Vue.component('cselectConect', selectConect)
    Vue.component('searchStyle01', searchStyle01)
    Vue.component('searchStyle02', searchStyle02)
    Vue.component('searchStyle03', searchStyle03)
}

export default plugin