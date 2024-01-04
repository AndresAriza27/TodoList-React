import '../styles/Appjunta.css'
import TodoList from './TodoList'

export function Appjunta () {
    return (
        <div className="appjunta">
            <div className="todo">
                <TodoList />
            </div>
        </div>
    )
}