### Vue.mixins

这个api，表示在每个vue的组件中，混入一些额外的数据，方法等。

### this.$options

vue.mixins中，this代表当前组件，this.$options表示当前组件的配置项。

在Vue的根组件中，一般会注入router、store两个配置项。

this.$options可以读取到这两个配置项。

this.$router、this.$store都是通过this.$options进行注入相关的实例的。

### 剩余研究

1、getters的实现。

2、modules的实现。

3、mapState,mapMutations,mapGetters,mapActions,这几个的实现。

