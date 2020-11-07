import React from 'react'

export default function useList(initialList) {

  const [list, setList] = React.useState(initialList);

  const push = (item) => {
    setList([...list, item])
  }

  const setItem = (index, item) => {
    let newList = list;
    newList[index] = item;
    setList([...newList])
  }

  const updateItem = (index, changes) => {
    let newList = list;
    newList[index] = {
      ...list[index],
      ...changes
    }
    setList([...newList])
  }

  const get = (index) => {
    return [
      list[index],
      (changes) => {
        updateItem(index, changes)
      },
      (item) => {
        setItem(index, item)
      }
    ];
  }

  const remove = (index) => {
    if(index < 0 || index >= list.length) return false;
    const newList = list.slice(0,index).concat(list.slice(index+1, list.length));
    setList(newList);
    return true;
  }

  return {
    list,
    get,
    push,
    remove,
  }

}