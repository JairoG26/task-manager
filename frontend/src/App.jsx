import React from 'react'
import TaskContainer from './components/tasks/taskContainer'

function App() {

  return (
    <>
      <div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-indigo-600 mb-6">
          Task Manager
        </h1>
       <TaskContainer />
      </div>
    </>
  )
}

export default App
