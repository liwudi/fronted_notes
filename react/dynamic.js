/**
 * Created by mapbar_front on 2018/8/14.
 */
// 关于react的代码分割功能的实现

export function dynamic(loadComponent, placeHolder = null) {
    class AsyncComponent extends Component {
        constructor(props){
            super(props);
            this.state = {
                component: null,
            }
        }
        componentDidMount() {
            const {default: component} = loadComponent();
            this.setState({
                component: component,
            })
        }
        render() {
            const Com = this.state.component;
            return Com ? <Com {...this.props}></Com> : placeHolder
        }
    }
    return AsyncComponent;
}

// @todo: 使用示例
const AsyncComponent = dynamic(import('./home'));

<Route path="./home" component={AsyncComponent} />


// 基于dva的dynamic函数的实现。
/**
 * dva框架，传递的是一个options对象
 * @param options   { component: () => import('./'), model: 'state/user'}
 * @return {AsyncComponent}
 */
export function dynamic(options) {

    class AsyncComponent extends Component {
        constructor(props){
            super(props);
            this.state = {
                component: null,
            }
        }
        componentDidMount() {
            const {default: component} = options.component();
            this.setState({
                component: component,
            })
        }
        render() {
            const Com = this.state.component;
            const modelProps = options.models();
            return Com ? <Com {...this.props, ...modelProps}></Com> : placeHolder
        }
    }
    return AsyncComponent;
}