import React from 'react'
import '@fluentui/react/dist/css/fabric.min.css'
import StartSlides from './modules/control/StartSlides'
import {Route, Switch} from 'react-router-dom'
import {Stack, StackItem} from '@fluentui/react'
import ControlMain from './modules/control/ControlMain'
import {AuthControlContext, useAuthContext} from './contexts/control'

function App() {
  const authControl = useAuthContext()

  return (
    <AuthControlContext.Provider value={authControl} >
      <AppRouter />
    </AuthControlContext.Provider>
  )
}

function AppRouter() {
  return (
    <Switch>
      <Route path="/start">
        <StartSlides />
      </Route>
      <Route path="/control" component={ControlMain}/>

      <Route>
        <Stack style={{margin: '10%'}}>
          <StackItem align="center">
            <h2>Not found</h2>
          </StackItem>
        </Stack>
      </Route>
    </Switch>
  );
}

export default App;
