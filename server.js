const express = require('express');
const app = express();
const bodyParser = require('body-parser')
let store = {
    users: [
      {
        name: "igor",
        id: "id0",
        doneTasks: 0,
        tasks: [
          {
            task: "Do It",
            crossed: false,
            id: 0,
            date: `13 / 12 / 2018`,
            time: `14:32:23`,
            prioritytask: 0,
            priorityvalue: "0disabled",
            changevalue: false,
            doneTasksLength: 0
          }
        ]
      }
    ],
    currentTabId: "id0",
    taskValue: "",
    userValue: ""
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/api/store/',(req,res)=>{
    res.json(store)
})
app.put('/api/:currentActiveId',(req,res)=>{
  store = { ...store, currentTabId: req.params.currentActiveId };
  if (store.currentTabId === req.params.currentActiveId) {
    return res.send(res.status);
  }
  return res.send(res.status);
})
app.delete('/api/tasks/:taskID',(req,res)=>{
  console.log(req.params.taskID)
  store = {
    ...store,
    users: store.users.map(user => {
      return {
        ...user,
        tasks: user.tasks.filter(task => {
          return task.id !== req.params.taskID;
        })
      };
    })
  };
  if (store.users.map(user => user.tasks.find(task => task.id === req.params.taskID))) {
    return res.send(res.status);
  }

  return res.send(res.status);
})

app.delete('/api/store/:id',(req,res)=>{
  store= {
    ...store,
    users: store.users.filter(user => user.id !== req.params.id)
  };
  if(store.users.filter(user => user.id === req.params.id)){
    return res.send(res.status);
  }

  return res.send(res.status);
})
app.post('/api/store/users',(req,res)=>{
    const user = {
      id: req.body.idUser,
      name: req.body.name,
      tasks: [],
      doneTasks: 0
    };
    store = {
      ...store,
      users: [...store.users, user],
      userValue: ""
    };
    if (store.users.find(user => user.name === req.body.name)) {
      return res.send(res.status);
    }
    return res.send(res.status);
    
})
app.post('/api/tasks/:userID',(req,res)=>{
  console.log(req.params.userID)
  const task = {
    task: req.body.allState,
    crossed: false,
    id: req.body.idTask,
    time: req.body.hours+":"+req.body.minutes+":"+req.body.seconds,
    prioritytask: 0,
    priorityvalue: "0disabled",
    changevalue: false,
    date: req.body.fullDate,
    doneTasksLength: 0
  }
  store ={
    ...store,
    users: store.users.map(user => {
      if (user.id === req.params.userID) {
        return {
          ...user,
          tasks: [
            ...user.tasks,
            task
          ]
        };
      } else {
        return user;
      }
    }),
    taskValue: ""
  }
  if (
    store.users.map(user => user.tasks.find(task => task.task === req.body.allState))
    ) {
    return res.send(res.status);
  }
  return res.send(res.status);
})
app.put('/api/:userId/:id',(req,res)=>{
  switch(req.body.option) {
    
    case "CHANGE_TASK":
    console.log(req.body.text)
      store = {
    ...store,
    users: store.users.map(user => {
      user.tasks = user.tasks.map(task => {
        if (req.params.id === task.id) {
          return {
            ...task,
            task: req.body.text,
            changevalue: !task.changevalue
          };
        } else {
          return task;
        }
      });
      return user;
    })
  };
  if (
    store.users.map(user => user.tasks.find(task => task.task === req.body.text))
  ) {
    return res.send(res.status);
  }
  return res.send(res.status);
  case "CROSSE_TASK":

    store = {
      ...store,
      users: store.users.map(user => {
       if(user.id === req.params.userId){
        user.tasks = user.tasks.map(task => {
          if (task.id === req.params.id) {
            return {
              ...task,
              crossed: !task.crossed
            };
          } else {
            return task;
          }
        });
        return user;

      }
      return user
    }
      )
    }
    if (
      store.users.map(user =>
        user.tasks.find(task => req.params.id  === task.id && task.crossed === true)
      )
    ) {

      return res.send(res.status);
    }
    return res.send(res.status);
    default:
      return store
  }

})
  case "PRIORITY_TASK":
  store = {
    ...store,
    users: store.users.map(user => {
      if (req.params.userId  === user.id) {
        user.tasks = user.tasks.map(task => {
          if (req.params.id  === task.id) {
            const valueNumber = req.body.text.match(/.{0,1}/g);
            return {
              ...task,
              prioritytask: +valueNumber[0],
              priorityvalue: req.body.text
            };
          } else {
            return task;
          }
        });
      }
      return user;
    })
  };
  if (
    store.users.map(user =>
      user.tasks.find(task => task.priorityvalue === req.body.text)
    )
  ) {
    return res.send(res.status);
  }
  return res.send(res.status);

const port = 6000;
app.listen(port,()=> console.log("started"));
