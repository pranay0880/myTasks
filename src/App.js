import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import AllTags from './components/AllTags'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    selectedOption: 'HEALTH',
    taskInput: '',
    list: [],
    activeTag: '',
  }

  onSubmitTask = event => {
    event.preventDefault()
    const {taskInput, selectedOption} = this.state
    const createObject = {
      id: uuidv4(),
      task: taskInput,
      tag: selectedOption,
    }
    this.setState(prevState => ({
      list: [...prevState.list, createObject],
      selectedOption: '',
      taskInput: '',
    }))
  }

  onChangeTask = event => {
    this.setState({taskInput: event.target.value})
    console.log(event.target.value)
  }

  changeOption = event => {
    const option = tagsList.filter(
      eachItem => eachItem.optionId === event.target.value,
    )
    this.setState({selectedOption: event.target.value})
  }

  tagChanged = optionId => {
    const {activeTag} = this.state
    if (optionId === activeTag) {
      this.setState({activeTag: ''})
    } else {
      this.setState({activeTag: optionId})
    }
  }

  emptyContainer = () => (
    <div className="emptyContainer">
      <p>No Tasks Added Yet</p>
    </div>
  )

  tasksContainer = () => {
    const {list, activeTag} = this.state
    console.log(list)
    const updatedList = list.filter(eachItem =>
      eachItem.tag.includes(activeTag),
    )
    return (
      <ul className="tasksContainer">
        {updatedList.map(eachItem => (
          <li key={eachItem.id} className="listItem">
            <p>{eachItem.task}</p>
            <p className="category">{eachItem.tag}</p>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {selectedOption, taskInput, list, activeTag} = this.state
    return (
      <div className="container">
        <div className="container1">
          <h1 className="heading1">Create a task!</h1>
          <form className="form" onSubmit={this.onSubmitTask}>
            <div className="taskContainer">
              <label htmlFor="task">Task</label>
              <br />
              <input
                type="text"
                id="task"
                className="taskInput"
                placeholder="Enter the task here"
                onChange={this.onChangeTask}
                value={taskInput}
              />
            </div>
            <div className="taskContainer">
              <label htmlFor="tags">Tags</label>
              <br />
              <select
                className="taskInput"
                id="tags"
                onChange={this.changeOption}
                value={selectedOption}
              >
                {tagsList.map(eachItem => (
                  <option value={eachItem.optionId} key={eachItem.optionId}>
                    {eachItem.displayText}
                  </option>
                ))}
              </select>
            </div>
            <div className="buttonContainer">
              <button type="submit" className="button1">
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div className="container2">
          <h1>Tags</h1>
          <ul className="unOrder">
            {tagsList.map(eachItem => (
              <AllTags
                key={eachItem.optionId}
                itemDetails={eachItem}
                isActive={activeTag === eachItem.displayText}
                tagChanged={this.tagChanged}
              />
            ))}
          </ul>
          <h1>Tasks</h1>
          {list.length === 0 ? this.emptyContainer() : this.tasksContainer()}
        </div>
      </div>
    )
  }
}

export default App
