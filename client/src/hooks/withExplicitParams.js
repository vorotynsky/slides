import React from 'react'

export default function withExplicitParams(Component) {
  function Internal(props) {
    return <Component {...props.match.params}/>
  }
  return Internal
}
